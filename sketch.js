var path, boy, cash, diamond, jewelry, sword;
var pathImg, boyImg, cashImg, diamondImg, jewelryImg, swordImg;
var treasureCollection = 0;
var cashGroup, diamondGroup, jewelryGroup, swordGroup;
var gameOver;

//introducing gameStates
var play = 1;
var end = 0;
var gameState = 1;

//load images
function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondImg = loadImage("diamonds.png");
  jewelryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup(){
  createCanvas(400,600);
  
  //moving background
  path = createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;

  //create boy running
  boy = createSprite(70,580,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale = 0.08;
  
  //introduce groups
  cashGroup = new Group();
  diamondGroup = new Group();
  jewelryGroup = new Group();
  swordGroup = new Group();
  
  //make game over message
  gameOver = createSprite(200,300,10,10);
  gameOver.addAnimation("gameOverMsg", endImg);
  gameOver.scale = 0.75
  gameOver.visible = false;
}

function draw() {

  if(gameState == play){
    background(0);
    boy.x = World.mouseX;

    edges = createEdgeSprites();
    boy.collide(edges);
  
    //code to reset the background
    if(path.y > 400 ){
      path.y = height/2;
  }
  
    createCash();
    createDiamond();
    createJewelry();
    createSword();

    if (cashGroup.isTouching(boy)) {
      cashGroup.destroyEach();
      treasureCollection = treasureCollection + 50;
      
    } else if (diamondGroup.isTouching(boy)) {
      diamondGroup.destroyEach();
      treasureCollection = treasureCollection + 100;

      
    } else if(jewelryGroup.isTouching(boy)) {
      jewelryGroup.destroyEach();
      treasureCollection = treasureCollection + 150;
      
    } else{
      if(swordGroup.isTouching(boy)) {
      gameState = end;
        
    }
  }
    
  if(gameState == end){
    boy.visible = false;
    gameOver.visible = true;
    
    cashGroup.destroyEach();
    cashGroup.setVelocityYEach(0);
    diamondGroup.destroyEach();
    diamondGroup.setVelocityYEach(0);
    jewelryGroup.destroyEach();
    jewelryGroup.setVelocityYEach(0);
    swordGroup.destroyEach();
    swordGroup.setVelocityYEach(0);

  }
  
  drawSprites();
    
  //scoring system
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
    
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashGroup.add(cash);
  }
}

function createDiamond() {
  if (World.frameCount % 320 == 0) {
    var diamond = createSprite(Math.round(random(50, 350),40, 10, 10));
    diamond.addImage(diamondImg);
    diamond.scale = 0.03;
    diamond.velocityY = 3;
    diamond.lifetime = 150;
    diamondGroup.add(diamond);
  }
}

function createJewelry() {
  if (World.frameCount % 410 == 0) {
    var jewelry = createSprite(Math.round(random(50, 350),40, 10, 10));
    jewelry.addImage(jewelryImg);
    jewelry.scale=0.13;
    jewelry.velocityY = 3;
    jewelry.lifetime = 150;
    jewelryGroup.add(jewelry);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}