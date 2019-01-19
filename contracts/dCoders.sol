pragma solidity >=0.4.22;


contract dCoders {
  address public organiser;
  uint public numRegistrants;
  uint public regFee;
  event Register(address indexed _from,uint indexed _amount);
  mapping (address => uint) public balance;  

  constructor() public {
    organiser = msg.sender;
    numRegistrants = 0;
    regFee = 200000000000000000 wei;
  }

  function () payable external {
//  require(msg.value == regFee);
uint256 cash = msg.value;
if(cash != regFee)  {return;}

// if(msg.value != regFee) {return;}
else{
 balance[address(this)] += regFee;     
 emit Register(msg.sender,msg.value);  
  }
}







}
