var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.height = window.innerHeight-60;
canvas.width = window.innerWidth-20;

requestAnimationFrame(draw);
var backg = new Image();
backg.src = "developer.png";

function draw(){

    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    c.globalAlpha = 0.8;
    c.drawImage(backg,370,130,600,400);
    c.globalAlpha = 1;
    var d1 = new Date();
    d1.getUTCDate();
    var d2 = new Date(2019,01,20,11,30,00);         //begin time
    var date = new Date(d2-d1);
    var hour = date.getUTCHours();
    var min = date.getUTCMinutes();
    var sec = date.getUTCSeconds();
    var day = date.getUTCDate() - 1;
    if(hour<=0 && min<=0 && sec<=0){
        window.location.href = "../IDE/index.html";  
    }

    c.font = "20px Calibri";
    c.fillText("You can begin to code in ...",window.innerWidth/2-100,40);
    c.font = "50px Calibri";
    c.globalAlpha = 0.8;
    c.fillText(hour + ":" + min + ":" + sec, window.innerWidth/2-72.5,90);
    c.globalAlpha = 1;
    requestAnimationFrame(draw);
}
