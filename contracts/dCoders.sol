pragma solidity >=0.4.22;

contract dCoders{
    
    address owner;
    uint256 regFee = 2 ether;
    address[] private registered;
    uint a = 0;
    
    mapping(address => uint256) public balances;
    address payable winner;
    
    event prizeDistribution( address indexed _buyer, uint256 _amount);
    
    constructor() public{
        owner = msg.sender;
        regFee = 2 ether;
    }
    
    function () payable external{
        balances[(msg.sender)] -= msg.value;
        balances[address(this)] += msg.value;
        registered.push(msg.sender);
        a++;
        // emit registeration(msg.sender);
    }
    
    function distri(address payable _winner) public{
        winner = _winner;
        winner.transfer(address(this).balance);
    }
}