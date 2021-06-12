  var PLAY = 1;
  var END = 0;
  var START=2;
  var gameState=START

 var aeroplane, aeroplaneImg;

  var obstacle1,obstacle2,obstacle3,obstacle4,obstaclesGroup;

  var oops,oopsImg;

  var star,starImg;

  var path,pathImg,scene;

  var score=0;

  var space,spaceImg;

  var boom,boomImg,boomSound;
  
  var burstImg,burst;

  var bg,wowImg;

  var wow;

  var star=0;

  var EndSound;

  var arrow, arrowImg;
      
function preload(){
  aeroplaneImg = loadImage("aeroplane.png");
  obstacle1 = loadImage("obstacle1.png");  
  obstacle2 = loadImage("obstacle2.jpg");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  oopsImg = loadImage("oops.png");
  starImg = loadImage("star.png");
  pathImg = loadImage("path.png");
  spaceImg = loadImage("space.png");
  boomImg = loadImage("boom.png");
  boomSound = loadSound("boomSound.mp3");
  burstImg = loadImage("burst.png");
  WowImg = loadImage("wow.png");
  EndSound = loadSound("startSound.mp3");
  arrowImg = loadImage("arrow.png");
  
}

function setup() {
createCanvas(windowWidth,windowHeight);
  
  bg= createSprite(windowWidth-1000,windowHeight-500);
  pathImg.resize(windowWidth+1800,windowHeight+100)
  bg.velocityX=-6;
  bg.addImage(pathImg);
  
  aeroplane = createSprite(width-1300,50);
  aeroplane.scale=0.3;
  aeroplane.velocityX=1;

  oops =  createSprite(1200,150);
  oops.addImage(oopsImg)
  oops.scale=0.3;
  
  space = createSprite(width/2,150);
  space.addImage(spaceImg);
  
  boom = createSprite(width/2,100);
  boom.addImage(boomImg);
  
  wow = createSprite(1200,150);
  wow.addImage(WowImg)
  wow.scale=0.4;
  
  arrow = createSprite(width/2,260);
  arrow.addImage(arrowImg);
  arrow.scale=0.6;
  
  obstaclesGroup = new Group();
  starsGroup = new Group();

   score=0;
   star=0;
 }

function draw(){
  background(255);
 
  //GAME STATE START
  if (gameState===START){
      
     if (bg.x<0){
      bg.x=width/2;
    }
    bg.velocityX=-7
   score=0;
   star=0;
   oops.visible=false;
   space.visible=true;
   boom.visible=false;
   wow.visible=false;
   arrow.visible=true;
   aeroplane.velocityX=0;
    
   aeroplane.addImage(aeroplaneImg);
  
   obstaclesGroup.destroyEach();
   if(mousePressedOver(space)){
     gameState=PLAY;
   }
   }
  
    //GAME STATE PLAY
   if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
     if (bg.x<0){
      bg.x=width/2;
    }
  if (keyDown(RIGHT_ARROW)) {
      aeroplane.x=aeroplane.x+2;
  }
  if (keyDown(UP_ARROW)) {
      aeroplane.y=aeroplane.y-2;
       }
  if (keyDown(DOWN_ARROW)) {
      aeroplane.y=aeroplane.y+2;
       }
     oops.visible=false;
     space.visible=false;
     boom.visible=false
     wow.visible=true;
     arrow.visible=false;
     spawnObstacles();
     stars();
    if (obstaclesGroup.isTouching(aeroplane)){
      gameState=END;
      boomSound.play();
      boom.visible=true;
      aeroplane.addImage(burstImg)
      EndSound.play();
    }
     if (starsGroup.isTouching(aeroplane)){
       starsGroup.destroyEach();
       star=star+1;
       
     }
   } 
  if (keyDown("r")){
    reset();
     if (bg.x<0){
      bg.x=width/2;
    }
  }
 
  //GAME STATE END
  else if (gameState===END){
    wow.visible=false;
    arrow.visible=false;
    oops.visible=true;
    space.visible=false;
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.destroyEach();
    starsGroup.destroyEach();
    starsGroup.setLifetimeEach(-1);
    bg.velocityX=0;
   }
   
 
  drawSprites();
  
  //SCORE TEXT
  fill("orange")
  textSize(50)
  textFont("Agency FB");
  text("Distance: "+ score,700,450);
  
  //RESTART TEXT
  if (gameState===END){
      fill("white")
      textSize(40)
      textFont("Monotype Corosiva");
      text("Oops! Game Over Press R to restart",400,250)
  }
  
  //SPACE TEXT
    if (gameState==START){ 
  fill("Magenta")
  textSize(50)
  textFont("Comic Sans");
  text("Hello! Press SPACE to start",400,350)
    }

  
  //STAR TEXT
 fill("yellow");
 textFont("Agency FB");
 textSize(50);
 text("Stars:"+star,500,450);
  
} 

function reset(){
  gameState = START;
  oops.visible = false;
  aeroplane.velocityX=2;
  score = 0;
  if (bg.x<0){
      bg.x=width/2;
    }
}

function spawnObstacles() {
  if(frameCount % 170 === 0) {
    var obstacle = createSprite(600,50,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/400);
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.3;
    obstacle.lifetime = 700;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function stars(){
  if(frameCount % 200 === 0) {
    var star = createSprite(600,50,10,40);
    //obstacle.debug = true;
    star .velocityX = -(6 + 3*score/400);
    star.addImage(starImg);
    star.lifetime = 700;
    starsGroup.add(star)
    star.scale=0.3;
}
}

































