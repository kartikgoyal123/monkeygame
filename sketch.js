
var monkey , monkey_running; 
var ground, invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
   
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
    
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(400,355,900,10);
  invisibleGround.visible = false;
  
  FoodGroup = createGroup();
  obstaclesGroup = createGroup();

}


function draw() {
  background("lightblue");

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime: "+ survivalTime, 100,50);  
  
  if (ground.x < 0){
    ground.x = ground.width/2;
}
  
  if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -12;
}
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(invisibleGround);
  
  spawnbanana();
  
  spawnObstacles();
  
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0); 
} 
  
  drawSprites(); 
}

function spawnbanana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.1;
    banana.lifetime = 100;
    FoodGroup.add(banana);
  }
}


function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(400,325,10,40);
   obstacle.velocityX = -6; 
   obstacle.addImage(obstaceImage);
   obstacle.scale = 0.1;
   obstacle.lifetime = 66;
   obstaclesGroup.add(obstacle);
 }
}


