// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./InsuranceContract.sol";

import "hardhat/console.sol";

// import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
// import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
// import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorInterface.sol";
// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


contract InsuranceProvider{

    address insurer;
    mapping (address => InsuranceContract) public contracts; 

    event contractCreated(address _insuranceContract, uint _premium, uint _payout);    


    modifier onlyOwner{
        require(msg.sender == insurer, "Only Insurance Provider can do this");
        _;
    }

    constructor() public
    {
        insurer = msg.sender;
    }

    function newContract(address _client, uint _premium, uint _payout, uint _duration, string memory _cropLocation ) 
    public
    onlyOwner
    {
        InsuranceContract i = new InsuranceContract(_client, _premium, _payout, _duration, _cropLocation);
        
        contracts[address(i)] = i;
        
        emit contractCreated(address(i),_premium,_payout);
        
        

    }

    // GETTERS

    function getContract(address _contract) external view returns (InsuranceContract) {
        return contracts[_contract];
    }

    function getInsurer() external view returns (address) {
        return insurer;
    }

    function getContractBalance() external view returns (uint) {
        // Returns total premium collected
        return address(this).balance;
    }

    function getContractStatus(address _address) external view returns (bool) {
        InsuranceContract i = InsuranceContract(_address);
        return i.getContractStatus();
    }

    receive() external payable {  }

}