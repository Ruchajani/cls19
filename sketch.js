var plane,planeImage,planeShootingImage,obstaclesGroup,bulletGroup,bgImage
var PLAY=0,END=1;
var obstacleImage
var gameState=PLAY;
var temp_bullet;
var score=0;
function preload()
{
   planeImage=loadAnimation("Fly (1).png","Fly (2).png")
   planeShootingImage=loadAnimation("Shoot (1).png","Shoot (2).png","Shoot (3).png","Shoot (4).png","Shoot (5).png")
   bgImage=loadImage("BG.png")
   obstacleImage=loadAnimation("BirdS_0003_Capa-0.png","BirdS_0002_Capa-3.png","BirdS_0001_Capa-2.png","BirdS_0000_Capa-1.png")
   bulletImage=loadAnimation("Bullet (1).png","Bullet (2).png","Bullet (3).png","Bullet (4).png","Bullet (5).png")
}
function setup() 
{
  createCanvas(windowWidth, windowHeight);
  background=createSprite(windowWidth/2,windowHeight/2)
  background.scale=2
  background.addImage(bgImage);
  background.velocityX=-3
  plane=createSprite(120,300)
  plane.addAnimation("flying",planeImage)
  plane.scale=0.5
  obstaclesGroup=createGroup()
  bulletGroup=createGroup()
}

function draw() {
  
  if(gameState===PLAY)
  {    
      
          drawSprites()
          background.velocityX=-3
          stroke("pink");
          strokeWeight(4)
          fill("red");
          textSize(15);
      text("score :"+score,500,50)
      if(background.x<0)
      {
        background.x=background.width/2
      }
      if(keyDown("space"))
      {
        plane.velocityY=-10
      }
      plane.velocityY=plane.velocityY+1
      if(plane.y>windowHeight||plane.y<0) 
      {
        gameState=END
      }
      if(bulletGroup.isTouching(obstaclesGroup))
      {
        score=score+Math.round(getFrameRate()/60)
        bulletGroup.destroyEach()
        obstaclesGroup.destroyEach()
      }
    if(keyWentDown("right"))
    {
         temp_bullet=createBullet()
         temp_bullet.velocityX=10
         temp_bullet.addAnimation("shooting",bulletImage)
         bulletGroup.add(temp_bullet)
    }
    createObstacle()
  }
else if(gameState===END)
  { 
    background.velocityX=0
    stroke("Pink");
    strokeWeight(25);
    textSize(100);
    fill("red")
    text("GAME OVER",displayWidth/2-300,displayHeight/2-100);
    text("press R to restart",displayWidth/2-300,displayHeight/2+100);
    
  }
  if(keyDown("r"))
  {
    gameState=PLAY
    plane.changeAnimation("flying",planeImage)
    obstaclesGroup.destroyEach()
    plane.x=100
      plane.y=300
   
    
  }
}
function createBullet()
{
  var bullet =createSprite(plane.x+10,plane.y+10)
  bullet.scale=0.7
  return bullet
  
}

function createObstacle()
{
  if(frameCount%150===0)
  {
        var obstacle=createSprite(600,random(100,displayHeight))
        obstacle.velocityX=-(3+score*3/100);
        obstacle.lifetime=200;
        obstacle.scale=0.8
        obstacle.depth=plane.depth
        plane.depth=plane.depth+1
        obstacle.addAnimation("bird",obstacleImage)
        obstaclesGroup.add(obstacle)
  }

  
  
  
  
}