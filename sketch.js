var ast, astImg;
var bg, bgImg;
var alien, alien1Img, alien2Img, alien3Img, alien4Img;
var alienGrp, foodGrp;
var food,food1Img, food2Img, food3Img;
var edges;
var distanceTr;
var deathCount;
var gameState=1;
var score=0;
var gameOver, gOImg;
var restart, rImg;
var life1,life2,life3, lifeImg;

function preload(){
    astImg=loadImage("ast.png");
    bgImg=loadImage("bg.jpg");

    alien1Img=loadImage("alien.png");
    alien2Img=loadImage("alien2.png");
    alien3Img=loadImage("alien3.png");
    alien4Img=loadImage("alien4.png");

    food1Img=loadImage("food.png");
    food2Img=loadImage("food2.png");
    food3Img=loadImage("food3.png");

    gOImg=loadImage("gameOver.png");
    rImg=loadImage("restart.png");

    lifeImg=loadImage("life.png");
}
function setup(){
    createCanvas(800,400);
    deathCount=0;
    distanceTr=0;
    bg=createSprite(400,200,800,400);
    bg.addImage(bgImg);
    bg.scale=0.25;
    
    ast= createSprite(40,100,20,20);
    ast.addImage(astImg);
    ast.scale=0.2;

    gameOver= createSprite(400,150,20,20);
    gameOver.addImage(gOImg);
    //ast.scale=0.2;
   
    restart= createSprite(400,220,20,20);
    restart.addImage(rImg);
    restart.scale=0.2;

    life1= createSprite(20,20,20,20);
    life1.addImage(lifeImg);
    life1.scale=0.05;

    life2= createSprite(45,20,20,20);
    life2.addImage(lifeImg);
    life2.scale=0.05;

    life3= createSprite(70,20,20,20);
    life3.addImage(lifeImg);
    life3.scale=0.05;

    alienGrp=new Group();
    foodGrp=new Group();

}
function draw(){
    gameOver.visible=false;
    restart.visible=false;
    score=score+1;
   
    ast.velocityY=0;
    if(gameState===1){
    edges=createEdgeSprites();
    ast.collide(edges);
    bg.velocityX=-3;

    if(keyDown("UP_ARROW")){
        ast.y=ast.y-4;
    }
    if(keyDown("DOWN_ARROW")){
        ast.y=ast.y+4;
    }
    if(bg.x<350){
        bg.x=450; 
     }
    //console.log(bg.x);
    if(score>0 && score%500===0){
        deathCount=deathCount+1;
        console.log(deathCount); 
    }
    if(deathCount===3){
        gameState=2;
        deathCount=0;
        life3.visible=false;
        life2.visible=false;
        life1.visible=false;
    }
     if(ast.isTouching(alienGrp)){
         deathCount=deathCount+1;
        alienGrp.destroyEach();
     }
     if(ast.isTouching(foodGrp)){
        score=score-200;
        foodGrp.destroyEach();
    }
    spawnAliens();
    spawnFood();

    if(deathCount===1){
        life3.visible=false;
    }
    if(deathCount===2){
        life3.visible=false;
        life2.visible=false;
    }
     
    }
    else if(gameState===2){
        bg.velocityX=0;
        alienGrp.visible=false;
        foodGrp.destroyEach();
        gameOver.visible=true;
        restart.visible=true;

        if(mousePressedOver(restart)){
            reset();
        }

    }
    drawSprites();
    fill("YELLOW");
    //text("Score" + score, 200,200);

}

function spawnAliens(){
    if(frameCount%240===0){
    var rand1=random(50,350)
    alien=createSprite(800,rand1,20,20);
    
    var rand=Math.round(random(1,4));
    switch(rand){
        case 1: alien.addImage(alien1Img);
        break;
        case 2: alien.addImage(alien2Img);
        break;
        case 3: alien.addImage(alien3Img);
        break;
        case 4: alien.addImage(alien4Img);
        default: break;
    }
    alien.velocityX=-3;
    alien.scale=0.2;
    alienGrp.add(alien);
    }
}
function spawnFood(){
    if(frameCount%265===0){
    var rand2=random(50,350)
    food=createSprite(800,rand2,20,20);
    
    var rand3=Math.round(random(1,3));
    switch(rand3){
        case 1: food.addImage(food1Img);
        food.scale=0.3;
        break;
        case 2: food.addImage(food2Img);
        food.scale=0.2;
        break;
        case 3: food.addImage(food3Img);
        food.scale=0.15;
        default: break;
    }
    food.velocityX=-3;
    foodGrp.add(food);
    }
}

function reset(){
    gameState=1;
    deathCount=0;
    score=0;
    life1.visible=true;
    life2.visible=true;
    life3.visible=true;
}