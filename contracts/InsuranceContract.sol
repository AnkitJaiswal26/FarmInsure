// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract InsuranceContract is Ownable {
    address payable owner;
    address payable public client;
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
    uint hotDays;
    string cropType;

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
    uint public constant DROUGHT_DAYS_THRESHOLD = 3;
    uint public constant HOT_DAYS_THRESHOLD = 3;
    uint public constant CLAIM_FILING_PERIOD = 15;
    uint public constant DAY_IN_SECONDS = 60;

    modifier onContractActive() {
        require(contractActive == true, "Contract has ended");
        _;
    }

    modifier validClaimer{
        require((block.timestamp - claimStartDate)/(DAY_IN_SECONDS) <= CLAIM_FILING_PERIOD );
        _;
    }

    event rainfallThresholdReset(uint _curRainfall);
    event hotDaysThresholdReset(uint _curTemp);
    event contractPaidOut(uint time,uint payoutValue);

    constructor(
        address payable _client,
        uint _premium,
        uint _payout,
        uint _duration,
        string memory _cropLocation,
        string memory _cropType
    ) {
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
        remainingAmount: premium, // ? do no 
        currentMonth: 1,
        monthDate: block.timestamp + 30 days,
        lastPaymentDate: block.timestamp
        });
    }

    function getContractStatus() public view onlyOwner returns(bool)
    {
        return contractActive;
    }

    function checkWeather() public onContractActive {

        uint normal_rainfall = 150;
        uint current_rainfall;
        uint normal_temperature = 30;
        uint current_temperature;

        /* Checking rainfall conditions */
        if(keccak256(abi.encodePacked(cropType)) == keccak256(abi.encodePacked("Rabi"))){
            current_temperature = 40;
            current_rainfall = 400;
        }
        else if(keccak256(abi.encodePacked(cropType)) == keccak256(abi.encodePacked("Kharif"))){
            current_rainfall = 100;
        }

        requestCount += 1;

          //check if payout conditions have been met, if so call payoutcontract, which should also end/kill contract at the end

        if(keccak256(abi.encodePacked(cropType)) == keccak256(abi.encodePacked("Kharif"))){
            if (current_rainfall < normal_rainfall) { //temp threshold has been  met, add a day of over threshold
                daysWithoutRain += 1;
            } else {
                //there was rain today, so reset daysWithoutRain parameter
                daysWithoutRain = 0;
                emit rainfallThresholdReset(current_rainfall);
            }
            if (daysWithoutRain >= DROUGHT_DAYS_THRESHOLD) {  // day threshold has been met
                /* need to pay client out insurance amount*/
                toClaimStatus = true;
                claimStartDate = block.timestamp;
                // notify();
            }
        }else if(keccak256(abi.encodePacked(cropType)) == keccak256(abi.encodePacked("Rabi"))){
            if(current_temperature > normal_temperature || current_rainfall > normal_rainfall){
                hotDays += 1;
            }
            else {
                hotDays = 0;
                emit hotDaysThresholdReset(current_temperature);
            }

            if (hotDays >= HOT_DAYS_THRESHOLD)
            {
                /* need to pay client out insurance amount */
                toClaimStatus = true;
                claimStartDate = block.timestamp;
                // notify();
            }
        }
    }

    function payout() private validClaimer{
        client.transfer(payoutValue);
        emit contractPaidOut(block.timestamp, payoutValue);
        toClaimStatus = false;
    }


}