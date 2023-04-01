// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract InsuranceContract is Ownable {
    address payable owner;
    address public client;
    uint public premium;
    uint public payout;
    uint startDate;
    uint duration;
    string cropLocation;
    bool contractActive;
    uint requestCount;
    uint daysWithoutRain;

    struct PaymentPremium {
        uint256 months;
        uint256 totalAmount;
        uint256 remainingAmount;
        uint256 currentMonth;
        uint256 monthDate;
        uint256 lastPaymentDate;
    };

    PaymentPremium premiumPayment;

    uint public constant DROUGHT_DAYS_THRESDHOLD = 3;

    modifier onContractActive() {
        require(contractActive == true, "Contract has ended");
        _;
    }

    event rainfallThresholdReset(uint _currrainfall);

    constructor(
        address _client,
        uint _premium,
        uint _payout,
        uint _duration,
        string memory _cropLocation
    ) {
        client = _client;
        premium = _premium;
        payout = _payout;
        startDate = block.timestamp;
        duration = _duration;
        cropLocation = _cropLocation;
        contractActive = true;
        requestCount = 0;
        premiumPayment = PaymentPremium({
            months: months,
        totalAmount: premium,
        remainingAmount: premium,
        currentMonth: 1,
        monthDate: block.timestamp + 30 days,
        lastPaymentDate: block.timestamp,
        })
    }

    function getContractStatus() public view onlyOwner returns (bool) {
        return contractActive;
    }

    function checkRainfall() public onContractActive {
        uint _rainfall;

        if (cropLocation == "Mumbai") _rainfall = 20;
        else _rainfall = 400;

        requestCount += 1;
        // set current temperature to value returned from Oracle, and store date this was retrieved (to avoid spam and gaming the contract)
        // currentRainfallList[dataRequestsSent] = _rainfall;
        // dataRequestsSent = dataRequestsSent + 1;

        // set current rainfall to average of both values
        // if (dataRequestsSent > 1) {
        // currentRainfall = (currentRainfallList[0].add(currentRainfallList[1]).div(2));
        // currentRainfallDateChecked = now;
        // requestCount +=1;

        //check if payout conditions have been met, if so call payoutcontract, which should also end/kill contract at the end
        if (_rainfall < 150) {
            //temp threshold has been  met, add a day of over threshold
            daysWithoutRain += 1;
        } else {
            //there was rain today, so reset daysWithoutRain parameter
            daysWithoutRain = 0;
            emit rainfallThresholdReset(_rainfall);
        }

        if (daysWithoutRain >= DROUGHT_DAYS_THRESDHOLD) {
            // day threshold has been met
            //need to pay client out insurance amount
            payOutContract();
        }
    }

    function fetchPremiumPayment () public view returns(PaymentPremium) {
        return premiumPayment;
    }

    function payPremium() public payable {
        payable(address(this)).transfer(msg.value);
        address(owner).transfer(msg.value);

        premiumPayment.currentMonth += 1;
        premiumPayment.lastPaymentDate = block.timestamp;
        premiumPayment.monthDate += 30 days;
        premiumPayment.remainingAmount -= msg.value;
    }
}
