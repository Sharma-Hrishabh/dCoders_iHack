pragma solidity >=0.4.22;


contract dCoders {
  address public organiser;
  uint public numRegistrants;
  uint private regFee;
  event Register(address _from);

  constructor() public {
    organiser = msg.sender;
    numRegistrants = 0;
    regFee = 2 wei;
  }






}
