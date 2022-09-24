// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/// Need a better name ;)
contract Parent {
  
  address[] public deployedProjects;

  function createFunding(uint256 _amount)  public {
    address deployedAddress = new CrowdFunding(_amount, msg.sender);
    deployedProjects.push(deployedAddress);
  }

  function getDeployedProjects() public view returns (address[]) {
    return deployedProjects;
  }

  function getDeployedProjectsCount() public view returns (uint256) {
    return deployedProjects.length;
  }

}

contract CrowdFunding {

  struct Requests {
    string requestDescription;
    uint256 amount;
    address receipent;
    bool complete;
    uint256 approvalCount;
    mapping (address => bool) approvals;
  }

  address public admin;
  uint256 public contribution;  
  uint256 public contributorsCount;

  // address[] public contributors;

  mapping (address => bool) public contibutors;

  Requests[] public requests;

  constructor(uint256 _contribution, address _admin) public {
    //msg.sender => basically the address of the creator of the contract
    admin = _admin;
    contribution = _contribution;
    contributorsCount = 0;
  }

  function contribute() public payable {
    //msg.value => amount in wei sent by a address
    require(msg.value >= contribution, "Please send minimum amount of ethers");
    contributors[msg.sender] = true;
    contributorsCount++;
  }


  function createRequest(string _requestDescription, uint256 _amount, address _receipent ) public {
    //Since this is an owner only function no other person should be able to access it
    require(msg.sender == admin, "This is an owner only function");
    Requests memory _request = Requests({
      requestDescription: _requestDescription,
      amount: _amount,
      receipent: _receipent,
      complete: false,
      approvalCount: 0
    });

    requests.push(_request);
  }

    //************************************************** */
    ///@title: approveRequest
    ///@desc: Function to approve the request created by the admin;
  function approveRequest(uint index) public {

    Requests storage _request = requests[index];
    require(contributors[msg.sender], "You are not a contributor");
    require(!_request.aprovals[msg.sender], "You've already voted on this request");

    _request.approvalCount++;
    _request.approvals[msg.sender] = true;
  }

  //************************************************** */
  /// Function to finalize the transaction and send the money to Vendors;
  function sendTransaction(uint index)  public  () {
    Requests _request = requests[index];

    require(msg.sender == admin, "This is an owner only function");
    require(!_request.complete, "The request has been finalized already");
    require(approvalCount > (contributorsCount/2), "You need more votes buddy!!");

    //Sending the amount to the receipent
    _request.receipent.transfer(_request.amount)

    _request.complete = true;
  }
 
}