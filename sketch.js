var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particle;
var plinkos = [];
var divisions = [];

var turn =0;
var gameState = "play"
var divisionHeight=300;
var score =0;
var count = 1;
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = random(1,5)*10 +20; j <=width-20; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = random(1,3)*15 +10; j <=width-30; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = random(2,4)*10 +15; j <=width-20; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = random(2,5)*5 +15; j <=width-30; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    //
    for (var j = 75; j <=height/1.5; j+=7) 
    {
    
       plinkos.push(new Plinko(-5,j));
    }
    for (var j = 75; j <=height/1.5; j+=7) 
    {
    
       plinkos.push(new Plinko(width+5,j));
    }

    

    
}
 


function draw() {
  background("black");
  textSize(20)
 text("Score : "+score,20,30);
 gameState = "end"
 if(count<=5){text("ChanceNo. "+count,width -120,30);
gameState = "play"}
 //else{text("ChanceNo. "+5,width -120,30);}
 
  Engine.update(engine);
   if(gameState == "end"){
     push()
     textSize(100)
     text("Game Over",100,350)
     textSize(50)
     text("Your Score :"+score,100,450)
     textSize(20)
     text("Press R to restart",450,480)
     pop()
   }
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   if(particle){
   particle.display();
   if(particle.body.position.y >760){
       score+= scoreList[index(particle.body.position.x)]
       particle = null;
       
       count++
       if(count> 5){gameState = "end"}
   }
   }
   for (let i = 0; i < scoreList.length; i++) {
     text(scoreList[i],(i*80) +30,550)
     
   }
  
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
}

var scoreList =[100,200,300,700,400,100,300,200,300,1000]
function index(x){

    return ((x -(x%80))/80)
}
function mousePressed(){
  if(particle == null && gameState != "end")
  {
    if(mouseX>40&&mouseX<760){
    particle =new Particle(mouseX,10,10)
    }
    else if (mouseX<40) {
      particle =new Particle(50,10,10)
    } 
    else if (mouseX>760) {
      particle =new Particle(750,10,10)
    } 
    gameState = "falling";
  }
  
}
function keyPressed(){
  if(keyCode == 82){
    restart()
  }
} 
function restart(){
  score =0
  count = 0
}
