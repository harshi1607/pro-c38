var horse, horse_running, horse_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup,obstacleImg
var score;
var play=1
var end=0
var gameState=play
var endFlag=false

function preload(){
  horse_running = loadAnimation("horse1.png","horse2.png","horse3.png");
  horse_collided = loadAnimation("horse_collided.png");
  horse_jump = loadAnimation("horse_jump.png")
  groundImage = loadImage("ground2.png");
  backgroundImg = loadImage("bg.jpg")
  
  cloudImage = loadImage("cloud.png");
  
  obstacleImg = loadImage("obstacles.png");
 // obstacle2 = loadImage("obstacle2.png");
//obstacle3 = loadImage("obstacle3.png");
  //obstacle4 = loadImage("obstacle4.png");
 // obstacle5 = loadImage("obstacle5.png");
  //obstacle6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);

  ground = createSprite(200,180,400,20);
  ground.addImage("ground", backgroundImg);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  ground.scale=2
  
  
  horse = createSprite(50,180,20,50);
  horse.addAnimation("running", horse_running);
  horse.addAnimation("jump", horse_jump);
  horse.addAnimation("collided", horse_collided);
  horse.scale = 0.5;
  
  

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background("white")
  if(gameState===play){
    if(horse.collide(invisibleGround)){
      horse.changeAnimation("running", horse_running)
      }
      
      score = score + Math.round(getFrameRate()/60);
      if(keyDown("space")&&horse.y>164) {
        horse.velocityY = -15;
        horse.changeAnimation("jump",horse_jump)
      }
      spawnClouds();
        spawnObstacles();
      
      horse.velocityY = horse.velocityY + 0.8
      
      if (ground.x < 0){
        ground.x = ground.width/2;
        
      }
      if(obstaclesGroup.isTouching(horse)){
        gameState=end
      }
  }
  else if(gameState===end){
    ground.velocityX=0
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    horse.velocityY=0
  obstaclesGroup.setLifetimeEach(-1)
    horse.changeAnimation("collided",horse_collided)
    endFlag=true
  
  }
  horse.collide(invisibleGround);
  drawSprites();
  text("Score: "+ score, 500,50);
  if(endFlag){
    text("GAME OVER",300,150,30)
}

}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = horse.depth;
    horse.depth = horse.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(600,170,10,40);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImg)
    //generate random obstacles
    //var rand = Math.round(random(1,6));
 //   switch(rand) {
   //   case 1: obstacle.addImage(obstacle1);
     //         break;
      //case 2: obstacle.addImage(obstacle2);
       //       break;
 //     case 3: obstacle.addImage(obstacle3);
   //           break;
     // case 4: obstacle.addImage(obstacle4);
       //       break;
//      case 5: obstacle.addImage(obstacle5);
  //            break;
    //  case 6: obstacle.addImage(obstacle6);
      //        break;
      //default: break;
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}