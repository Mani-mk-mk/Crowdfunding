// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

///@title CrowdFunding
///@author Mani, Prithvi, Asswin
///@notice Parent Deployer which will deploy contract for each and every campaign
contract Deployer {
  
  CrowdFunding[] public deployedProjects;
  mapping (address => CrowdFunding[]) public ownersProjects;

  function createFunding(uint256 _amount, string memory _name, string memory _description, uint256 _endDate, uint256 _requiredFund)  public payable {
    CrowdFunding deployedAddress = new CrowdFunding(_amount, msg.sender, _name, _description, _endDate, _requiredFund);
    ownersProjects[msg.sender].push(deployedAddress);
    deployedProjects.push(deployedAddress);
  }

  function getDeployedProjects() public view returns (CrowdFunding[] memory) {
    return deployedProjects;
  }

  function getDeployedProjectsCount() public view returns (uint256) {
    return deployedProjects.length;
  }

}

///@title CrowdFunding
///@author Mani, Prithvi, Asswin
///@notice A contract will be deployed for each of the campaign
contract CrowdFunding {

  struct Request {
    string requestDescription;
    uint256 amount;
    address payable receipent;
    bool complete;
    uint256 approvalCount;
    mapping (address => bool) approvals;
  }

  uint public numRequests;
  mapping (uint => Request) public requests;

  //Project Descriptions
  string  public name;
  string  public description;
  uint256 public startDate;
  uint256 public endDate;
  uint256 public requiredFund;

  address public admin;
  uint256 public minimumContribution;  
  uint256 public totalContributors;

  mapping (address => bool) public contributors;

  constructor(uint256 _minimumContribution, address _admin, string memory _name, string memory _description, uint256 _duration, uint256 _requiredFund) public {
    //msg.sender => basically the address of the creator of the contract
    name = _name;
    admin = _admin;
    description = _description;
    //Using the 
    startDate = block.timestamp;
    endDate = (_duration * 1 days) + startDate;
    requiredFund = _requiredFund;
    minimumContribution = _minimumContribution;
    totalContributors = 0;
  }

  function contribute() public payable {
    require(block.timestamp < endDate, "The duration for funding this project is over");
    //msg.value => amount in wei sent by a address
    require(msg.value >= minimumContribution, "Please send minimum amount of ethers");
    if (!contributors[msg.sender]) {
      totalContributors++;
      contributors[msg.sender] = true;
    }  
  }


  // Returns the amount of money collected for the funding
  function getAmountReceived() public view returns (uint256) {
    return address(this).balance;
  }


  function createRequest(string memory _requestDescription, uint256 _amount, address _receipent ) public {
    //Since this is an owner only function no other person should be able to access it
    require(msg.sender == admin, "This is an owner only function");
    Request storage _request = requests[numRequests++];
    _request.requestDescription = _requestDescription;
    _request.amount = _amount;
    _request.receipent = payable(_receipent);
    _request.complete = false;
    _request.approvalCount = 0;
  }

  
  // Calculates the time remaining in UNIX standard
  function timeRemainig() public view returns(uint256) {
    require(block.timestamp <= endDate, "The duration for funding this project is over");
    return endDate - block.timestamp;
  }

  //************************************************** */
  //title: approveRequest
  // Function to approve the request created by the admin;
  function approveRequest(uint index) public {
    Request storage _request = requests[index];
    require(contributors[msg.sender], "You are not a contributor");
    // require(!_request.aprovals[msg.sender], "You've already voted on this request");

    _request.approvalCount++;
    _request.approvals[msg.sender] = true;
  }

  //************************************************** */
  /// Function to finalize the transaction and send the money to Vendors;
  function sendTransaction(uint index) public {
    Request storage _request = requests[index];

    require(msg.sender == admin, "This is an owner only function");
    require(!_request.complete, "The request has been finalized already");
    require(_request.approvalCount > (totalContributors/2), "You need more votes buddy!!");
    //Sending the amount to the receipent
    _request.receipent.transfer(_request.amount);
    _request.complete = true;
  }
}