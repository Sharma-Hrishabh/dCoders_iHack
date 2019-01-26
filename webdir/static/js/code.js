var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.height = window.innerHeight-100;
canvas.width  = window.innerWidth+10;
var cheight = canvas.height;
var cwidth = canvas.width;

var dcode = "dCode";

var particle = function(x,y,vx,vy,rad){
    this.x = x ;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.rad = rad;
}

var maxDistance = 50;
var mousex = 0, mousey = 0;
var particleRadius = 5;
var maxParticles = 500;
var Particles = new Array();

for( i=0; i < maxParticles ; i++ ){
    var x = Math.random()*cwidth;
    var y = Math.random()*cheight;
    var velx = (Math.random()*2-1)/2;
    var vely = (Math.random()*2-1)/2;
    var temp = new particle( x,y,velx,vely,particleRadius);  //Math.random()*cwidth, Math.random()*cheight
    Particles.push(temp);
 }
    var opac = 0.5;
    var toggle=1;
 requestAnimationFrame(draw);
 function draw(){
    c.clearRect(0,0,cwidth,cheight);
    if(opac > 1 || opac <= 0.3)
        toggle*=-1;
    
    if(toggle==-1)
        opac+=0.01;
    else   
        opac-=0.01;

    c.fillStyle = 'rgba(0,0,0,'+opac+')';
    c.font = "100px 'ZCOOL KuaiLe'";
    c.fillText("dCoder.",window.innerWidth/2-160,window.innerHeight/2-50);
    
    c.fillStyle = 'rgba(0,0,0,0.5)';


    for( i=0; i < maxParticles ; i++ ){
        c.beginPath();
        c.fillStyle = 'rgba(0,0, 0,0.1)';
        c.arc(Particles[i].x,Particles[i].y,Particles[i].rad,0,Math.PI*2,false);
        // c.font = Particles[i].rad + "px Arial";
        // c.fillStyle = 'rgba(0,0, 0,0.0)';
        // c.fillText(dcode,Particles[i].x-Particles[i].rad/2,Particles[i].y+Particles[i].rad/5);
        // c.fillStyle = 'rgba(0,0, 0,0.1)';
        Particles[i].x += Particles[i].vx;
        Particles[i].y += Particles[i].vy;

        if(Particles[i].x >= cwidth){
            Particles[i].vx *= -1;
            Particles[i].x = cwidth-1;
        }
        if(Particles[i].x <= 0){
            Particles[i].vx *= -1;
            Particles[i].x = 1;
        }
        if(Particles[i].y >= cheight ){
            Particles[i].vy *= -1;
            Particles[i].y = cheight-1;
        }
        if(Particles[i].y <=0 ){
            Particles[i].vy *= -1;
            Particles[i].y = 1;
        }
        c.fill();
        c.closePath();
        
    }

    var j;
    for(i=0;i<maxParticles;i++)
    {

        var distance = dist(Particles[i].x,Particles[i].y,mousex,mousey);
        if(distance<=maxDistance && Particles[i].rad <=50)
        {
            Particles[i].rad+=0.5;
            c.font = Particles[i].rad + "px Arial";
            c.fillStyle = 'rgba(0,0, 0,0.3)';
            c.fillText(dcode,Particles[i].x-Particles[i].rad/2,Particles[i].y+Particles[i].rad/5);
            c.fillStyle = 'rgba(0,0, 0,0.1)';
        }
        else if(Particles[i].rad > particleRadius )
        {
            Particles[i].rad-=0.5;
        }
        else{
            Particles[i].rad = particleRadius;
        }
        
    }

    requestAnimationFrame(draw);
}

function dist(x1,y1,x2,y2){
    var res = Math.sqrt((x1-x2)**2 + (y1-y2)**2);
    return res;
}
window.onmousemove = function(e){
    mousex = e.x;
    mousey = e.y;
}