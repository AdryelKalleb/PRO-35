var balloon,balloonImage1,balloonImage2;
var database
var height

// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value",readPosition, showError);
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updatePosition(-10,0)//esquerda
    balloon.addAnimation("hotAirBalloon",balloonImage2);

  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(10,0)//direita
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.005
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale +0.005
  }
//qnd for pra cima diminui - e qnd for pra baixo +
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function readPosition(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("ERRO")
}

function updatePosition(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
  
}