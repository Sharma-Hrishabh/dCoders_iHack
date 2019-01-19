pragma solidity >=0.4.22;


contract dCoders {
  address public organiser;
  uint public numRegistrants;
  uint public regFee;
  event Register(address indexed _from);
  mapping (address => uint) public balance;  

  constructor() public {
    organiser = msg.sender;
    numRegistrants = 0;
    regFee = 2 wei;
  }

  function () payable external {
 require(msg.value == 2 wei);
 balance[address(this)] += regFee;     
 emit Register(msg.sender);  
}

}
