// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract SafeInsure {
    address payable owner;

    struct User {
        address userAdd;
        string name;
        uint256 age;
        bool gender;
        string email;
        string mobileNo;
        string location;
        uint256 landArea;
        string cropType;

    }

    struct Company {
        address comAdd;
        string name;
        string cin;
        // InsuranceProvider provider;
    }

    uint256 userCount;
    uint256 companyRequestCount;
    uint256 companyCount;
    uint256 insuranceCount;
    uint256 itemCount;

    mapping(uint256 => User) userMapping;
    mapping(uint256 => Company) companyMapping;
    mapping(uint256 => Company) companyRequestMapping;


    mapping(address => uint256) userAddressToIdMapping;
    mapping(address => uint256) companyAddressToIdMapping;
    mapping(address => uint256) companyAddressToIdRequestMapping;

    receive() external payable {}

    constructor() {
        owner = payable(msg.sender);
    }

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    function registerUser(
        address userAdd,
        string memory name,
        string memory emailId,
        string memory mobileNo,
        string memory location,
        string memory cropType,
        bool gender,
        uint256 age,
        uint256 landArea
    ) public {
        userMapping[userCount] = User(
            userAdd,
            name,
            age,
            gender,
            emailId,
            mobileNo,
            location,
            landArea,
            cropType
        );

        userAddressToIdMapping[msg.sender] = userCount++;
    }

    function registerCompany(
        address comAdd,
        string memory name,
        string memory cin
    ) public {
        companyRequestMapping[companyRequestCount] = Company(comAdd, name, cin);
        companyAddressToIdRequestMapping[msg.sender] = companyRequestCount++;
    }

    function acceptCompany(address companyAdd) public isOwner {
        companyMapping[companyCount] = companyRequestMapping[
            companyAddressToIdRequestMapping[companyAdd]
        ];

        companyAddressToIdMapping[companyAdd] = companyCount;

        companyCount += 1;

        companyRequestMapping[
            companyAddressToIdRequestMapping[companyAdd]
        ] = companyRequestMapping[companyRequestCount - 1];
        companyAddressToIdRequestMapping[
            companyRequestMapping[companyRequestCount - 1].comAdd
        ] = companyAddressToIdRequestMapping[companyAdd];

        delete companyRequestMapping[companyRequestCount - 1];
        companyRequestCount -= 1;
    }

    function rejectCompany(address companyAdd) public isOwner {
        companyRequestMapping[
            companyAddressToIdRequestMapping[companyAdd]
        ] = companyRequestMapping[companyRequestCount - 1];
        companyAddressToIdRequestMapping[
            companyRequestMapping[companyRequestCount - 1].comAdd
        ] = companyAddressToIdRequestMapping[companyAdd];

        delete companyRequestMapping[companyRequestCount - 1];
        companyRequestCount -= 1;
    }

    function fetchUserByAddress(
        address userAdd
    ) public view returns (User memory) {
        for (uint256 i = 0; i < userCount; i++) {
            if (userMapping[i].userAdd == userAdd) {
                return userMapping[i];
            }
        }

        revert();
    }

    function fetchCompanyByAddress(
        address comAdd
    ) public view returns (Company memory) {
        for (uint256 i = 0; i < companyCount; i++) {
            if (companyMapping[i].comAdd == comAdd) {
                return companyMapping[i];
            }
        }

        revert();
    }

    function fetchActiveRequests()
        public
        view
        isOwner
        returns (Company[] memory)
    {
        Company[] memory result = new Company[](companyRequestCount);
        for (uint256 i = 0; i < companyRequestCount; i++) {
            Company storage cur = companyRequestMapping[i];
            result[i] = cur;
        }

        return result;
    }

    function fetchAllCompanies()
        public
        view
        isOwner
        returns (Company[] memory)
    {
        Company[] memory result = new Company[](companyCount);
        for (uint256 i = 0; i < companyCount; i++) {
            Company storage cur = companyMapping[i];
            result[i] = cur;
        }

        return result;
    }


    function fetchCompanyUsingCIN(
        string memory cin
    ) public view returns (Company memory) {
        for (uint256 i = 0; i < companyCount; i++) {
            if (
                keccak256(abi.encodePacked(companyMapping[i].cin)) ==
                keccak256(abi.encodePacked(cin))
            ) {
                return companyMapping[i];
            }
        }

        revert();
    }

    function OwnerIs() public view returns (bool) {
        return owner == msg.sender;
    }
}