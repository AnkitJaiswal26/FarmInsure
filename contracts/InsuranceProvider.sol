// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./InsuranceContract.sol";

// import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
// import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
// import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorInterface.sol";
// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract InsuranceProvider {
    address insurer;
    uint contractCount;
    mapping(address => InsuranceContract) contracts;
    mapping(uint => address) contractAddresses;

    event contractCreated(
        address _insuranceContract,
        uint _premium,
        uint _payout
    );

    struct InsuranceType {
        uint256 id;
        uint256 premium;
        uint256 payout;
        uint256 duration;
    }

    uint256 insCount;

    mapping(uint256 => InsuranceType) insuranceTypes;

    event claimStatus(bool _claimStatus);

    modifier onlyOwner() {
        require(msg.sender == insurer, "Only Insurance Provider can do this");
        _;
    }

    constructor(address owner) {
        insurer = owner;
    }

    function addInsType(uint _premium, uint _payout, uint _duration) public {
        insuranceTypes[insCount] = InsuranceType({
            id: insCount,
            premium: _premium,
            payout: _payout,
            duration: _duration
        });
        insCount++;
    }

    function fetchInsTypes() public view returns (InsuranceType[] memory) {
        InsuranceType[] memory result = new InsuranceType[](insCount);
        for (uint256 i = 0; i < insCount; i++) {
            result[i] = insuranceTypes[i];
        }

        return result;
    }

    function newContract(
        address payable _client,
        uint _premium,
        uint _payout,
        uint _duration,
        string memory _cropLocation,
        string memory _cropType
    ) public payable onlyOwner {
        contractCount++;

        InsuranceContract i = new InsuranceContract(
            insurer,
            _client,
            _premium,
            _payout,
            _duration,
            _cropLocation,
            _cropType
        );
        contracts[address(i)] = i;
        contractAddresses[contractCount] = address(i);

        emit contractCreated(address(i), _premium, _payout);
    }

    // GETTERS

    function getContract(
        address _contract
    ) external view returns (InsuranceContract) {
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

    function getClaimStatus(address _address) external view returns (bool) {
        InsuranceContract i = InsuranceContract(_address);
        return i.toClaimStatus();
    }

    function getRainfall(address _address) external view returns (uint256) {
        InsuranceContract i = InsuranceContract(_address);
        return i.volume();
    }

    function checkClaimable(address _address) external view returns (bool) {
        InsuranceContract i = InsuranceContract(_address);
        return i.getClaimable();
    }

    // function notify() public view onlyOwner returns (InsuranceContract[] memory){

    //     uint count = 0;
    //     for(uint i = 1; i <= contractCount; i++)
    //     {
    //         if(contracts[contractAddresses[i]].toClaimStatus() == true)
    //             count++;
    //     }

    //     InsuranceContract[] memory result = new InsuranceContract[](count);
    //     for (uint i = 1; i <= count; i++)
    //     {
    //         if(contracts[contractAddresses[i]].toClaimStatus() == true)
    //         {
    //             InsuranceContract cur = contracts[contractAddresses[i]];
    //             result[i] = cur;
    //         }
    //     }
    //     return result;
    // }

    function checkWeather(address _address) external {
        InsuranceContract i = InsuranceContract(_address);
        i.checkWeather();
    }

    function fetchAllInsuranceContracts()
        public
        view
        onlyOwner
        returns (address[] memory)
    {
        address[] memory result = new address[](contractCount);
        for (uint256 i = 1; i <= contractCount; i++) {
            result[i - 1] = contractAddresses[i];
        }

        return result;
    }

    function fetchInsurance(
        uint256 id
    ) public view returns (InsuranceType memory) {
        return insuranceTypes[id];
    }

    receive() external payable {}
}
