var boy,boyImg;
var ghost,ghostImg;
var enemy,enemyImg;
var gameState="Play";
var score=0;

function preload() {
  boyImg=loadImage("Images/player.jpg");
  ghostImg=loadImage("Images/ghost1.jpg");
  enemyImg=loadImage("Images/MyMonster.jpg");
}

function setup() {
createCanvas(900,700);

boy= createSprite(400, 300, 50, 50);
 boy.addImage("boyImg",boyImg);
 boy.scale=0.2;

 //boy.debug="true"
 boy.setCollider("rectangle",0,0,30,30);

 ghost=createSprite(100,200,50,50);
 ghost.addImage("ghostImg",ghostImg);
 ghost.scale=0.7;
 
 enemyGrp=new Group();
}

function draw() {
  background(0);
  if (gameState==="Play"){
  score = score + Math.round(frameCount/ 60);
  
  if (keyDown("space")){
  boy.velocityY=-10;
  }
  boy.velocityY=boy.velocityY+1;

  if( enemyGrp.isTouching(boy)|| boy.y>900 || boy.y<0){
  gameState="End";
 }  

  spawnObstacles();
  }

  drawSprites();
textSize(20);
fill(255,255,255);
text("Your Score:"+score,750,50)

if(gameState==="End"){
  textSize(30);
  fill(255,255,255);
  text("Game Over",300,300);
  text("Thanks For Playing :)",250,350);
  textSize(20);
  text("Press UpArrow to start the game again!!",210,400);
  textSize(20);
  text("By :- Vidhi Harde :)",700,650);
  
 // ghost.destroy();
  enemyGrp.destroyEach();
  //boy.destroy();
  enemyGrp.setLifetimeEach(-1);
  enemyGrp.velocityY=0;
}
if(keyDown(UP_ARROW)){
  reset();
 }
}

function spawnObstacles() {
  if(World.frameCount%150===0){
   enemy=createSprite(800,600,10,10);
   enemy.addImage("enemyImg",enemyImg);
   enemy.y=Math.round(random(500,300));
   enemy.velocityX=-5;
   enemy.scale=0.1;
   enemyGrp.add(enemy);
   enemyGrp.lifeTime=1000;

 enemy.depth=ghost.depth;
ghost.depth=ghost.depth+1;
  }
}

function reset(){
gameState="Play";
//boy.visible="true";
boy.x=400;
boy.y=300;
boy.velocityY=-10;
score=0;
}