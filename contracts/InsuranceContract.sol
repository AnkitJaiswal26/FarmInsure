// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract InsuranceContract is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    address payable owner;
    address payable client;
    uint public premium;
    uint public payoutValue;
    uint startDate;
    uint duration;
    string cropLocation;
    bool contractActive;
    uint claimStartDate;
    bool public toClaimStatus;
    bool isClaimed;
    uint requestCount;
    uint daysWithoutRain;
    uint warmDays;
    string cropType;
    bytes32 jobId;
    uint256 public volume;
    bool cropIndx;

    struct PaymentPremium {
        uint256 months;
        uint256 totalAmount;
        uint256 remainingAmount;
        uint256 currentMonth;
        uint256 monthDate;
        uint256 lastPaymentDate;
    }

    PaymentPremium premiumPayment;

    // To DO
    uint public constant DROUGHT_DAYS_THRESHOLD = 1;
    uint private constant WARM_DAYS_THRESHOLD = 1;
    uint public constant CLAIM_FILING_PERIOD = 15;
    uint public constant DAY_IN_SECONDS = 60;

    string private constant WEATHER_API_URL =
        "https://api.weatherapi.com/v1/current.json?";
    string private constant WEATHER_API_KEY = "442a3abebf154466ae4175918233103";

    modifier onContractActive() {
        require(contractActive == true, "Contract has ended");
        _;
    }

    modifier validClaimer() {
        require(
            (block.timestamp - claimStartDate) / (DAY_IN_SECONDS) <=
                CLAIM_FILING_PERIOD
        );
        _;
    }

    event rainfallThresholdReset(uint _curRainfall);
    event hotDaysThresholdReset(uint _curTemp);
    event contractPaidOut(uint time, uint payoutValue);
    event premiumPaid(uint time, uint premium);

    constructor(
        address _owner,
        address payable _client,
        uint _premium,
        uint _payout,
        uint _duration,
        string memory _cropLocation,
        string memory _cropType
    ) payable {
        owner = payable(_owner);
        client = _client;
        premium = _premium;
        payoutValue = _payout;
        startDate = block.timestamp;
        duration = _duration;
        cropLocation = _cropLocation;
        cropType = _cropType;
        contractActive = true;
        isClaimed = false;
        toClaimStatus = false;
        requestCount = 0;
        premiumPayment = PaymentPremium({
            months: duration,
            totalAmount: premium,
            remainingAmount: premium - msg.value, // ? do no
            currentMonth: 1,
            monthDate: block.timestamp + 30 days,
            lastPaymentDate: block.timestamp
        });

        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0x40193c8518BB267228Fc409a613bDbD8eC5a97b3);
        jobId = "ca98366cc7314957b8c012c72f05aeeb";
    }

    function fetchPremium() public view returns (PaymentPremium memory) {
        return premiumPayment;
    }

    function fetchDetails() public view returns (string memory, string memory) {
        return (cropLocation, cropType);
    }

    function getContractStatus() public view returns (bool) {
        return contractActive;
    }

    // function checkWeather() public onContractActive {
    //     uint normal_rainfall = 150;
    //     uint current_rainfall;
    //     uint normal_temperature = 30;
    //     uint current_temperature;

    //     /* Checking rainfall conditions */
    //     if (
    //         keccak256(abi.encodePacked(cropType)) ==
    //         keccak256(abi.encodePacked("Rabi"))
    //     ) {
    //         current_temperature = 40;
    //         current_rainfall = 400;
    //     } else if (
    //         keccak256(abi.encodePacked(cropType)) ==
    //         keccak256(abi.encodePacked("Kharif"))
    //     ) {
    //         current_rainfall = 100;
    //     }

    //     requestCount += 1;

    //     //check if payout conditions have been met, if so call payoutcontract, which should also end/kill contract at the end

    //     if (
    //         keccak256(abi.encodePacked(cropType)) ==
    //         keccak256(abi.encodePacked("Kharif"))
    //     ) {
    //         if (current_rainfall < normal_rainfall) {
    //             //temp threshold has been  met, add a day of over threshold
    //             daysWithoutRain += 1;
    //         } else {
    //             //there was rain today, so reset daysWithoutRain parameter
    //             daysWithoutRain = 0;
    //             emit rainfallThresholdReset(current_rainfall);
    //         }
    //         if (daysWithoutRain >= DROUGHT_DAYS_THRESHOLD) {
    //             // day threshold has been met
    //             /* need to pay client out insurance amount*/
    //             toClaimStatus = true;
    //             claimStartDate = block.timestamp;
    //             // notify();
    //         }
    //     } else if (
    //         keccak256(abi.encodePacked(cropType)) ==
    //         keccak256(abi.encodePacked("Rabi"))
    //     ) {
    //         if (
    //             current_temperature > normal_temperature ||
    //             current_rainfall > normal_rainfall
    //         ) {
    //             hotDays += 1;
    //         } else {
    //             hotDays = 0;
    //             emit hotDaysThresholdReset(current_temperature);
    //         }

    //         if (hotDays >= HOT_DAYS_THRESHOLD) {
    //             /* need to pay client out insurance amount */
    //             toClaimStatus = true;
    //             claimStartDate = block.timestamp;
    //             // notify();
    //         }
    //     }
    // }
    function checkWeather() public onContractActive {
        //First build up a request to Weather API to get the current rainfall
        // https://api.weatherapi.com/v1/current.json?key=442a3abebf154466ae4175918233103&q=Pune&aqi=no

        if (
            keccak256(abi.encodePacked(cropType)) ==
            keccak256(abi.encodePacked("Kharif"))
        ) cropIndx = true;
        else cropIndx = false;

        string memory url = string(
            abi.encodePacked(
                WEATHER_API_URL,
                "key=",
                WEATHER_API_KEY,
                "&q=",
                cropLocation
            )
        );
        getRainfallTemp(jobId, url);

        // Now build up the second request to WeatherBit
        // url = string(abi.encodePacked(WEATHERBIT_URL, "city=",cropLocation,"&key=",WEATHERBIT_KEY));
        // checkRainfall(oracles[1], jobIds[1], url, WEATHERBIT_PATH);
    }

    function getClaimable() public view returns (bool) {
        return isClaimed;
    }

    function getRainfallTemp(
        bytes32 currJobId,
        string memory url
    ) public onContractActive {
        Chainlink.Request memory req = buildChainlinkRequest(
            "ca98366cc7314957b8c012c72f05aeeb",
            address(this),
            this.fulfill.selector
        );
        req.add("get", url);
        if (cropIndx) req.add("path", "current,precip_mm");
        else req.add("path", "current,temp_c");

        req.addInt("times", 100); // Multiply by times value to remove decimals. Parameter required so pass '1' if the number returned doesn't have decimals
        sendChainlinkRequest(req, (1 * LINK_DIVISIBILITY) / 10); // 0,1*10**18 LINK
    }

    function fulfill(
        bytes32 _requestId,
        uint256 _volume
    ) public recordChainlinkFulfillment(_requestId) {
        volume = _volume;
        if (volume > 2500) warmDays += 1;
        else if (volume < 200) daysWithoutRain += 1;
        else {
            daysWithoutRain = 0;
            warmDays = 0;
        }

        if (cropIndx && daysWithoutRain >= DROUGHT_DAYS_THRESHOLD) {
            toClaimStatus = true;
        } else if (!cropIndx && warmDays >= WARM_DAYS_THRESHOLD) {
            toClaimStatus = true;
        }
    }

    function payout() private validClaimer {
        payable(address(this)).transfer(msg.value);
        client.transfer(payoutValue);
        emit contractPaidOut(block.timestamp, payoutValue);
        isClaimed = true;
        toClaimStatus = false;
    }

    function payPremium(uint256 premiumVal) public payable {
        payable(address(this)).transfer(msg.value);
        payable(owner).transfer(premiumVal);

        premiumPayment.remainingAmount = premium - msg.value;
        premiumPayment.currentMonth++;
        premiumPayment.monthDate = block.timestamp + 30 days;
        premiumPayment.lastPaymentDate = block.timestamp;
        // payable (this).transfer();

        emit premiumPaid(block.timestamp, premium);
    }
}
