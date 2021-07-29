let shapeClassifier;  // ml5.neuralnetwork()
let canvas;  // createCanvas()
let canvasSize = {
  height:255, 
  width:255, 
  color:255,
}

function setup(){
  
  canvas = createCanvas(canvasSize.width, canvasSize.height);

  background(canvasSize.color);
  console.log("RUNNING..."); 


  let options = {
    inputs: [canvasSize.width, canvasSize.height,  4],
    task: "imageClassification",
    debug: "true"
  };

  shapeClassifier = ml5.neuralNetwork(options);

  buttonsConfig();
}

let userLabel = labelChange();
function buttonsConfig(){

  buttons = {
    "train": createButton('Train!'),
    "generate": createButton('Generate!'),
    "clear": createButton('Clear!'),
    // Added Button to start automatic training 
  }
  
  let y = canvasSize.height + 25;
  buttons.train.position(150, y);
  buttons.generate.position(200, y);
  buttons.clear.position(300, y);
  //Moved all the buttons below the canvas
  
  buttons.train.mousePressed(startTraining);
  buttons.generate.mousePressed(createDataSet);
  buttons.clear.mousePressed(clearCanvas);

}


let trainingLabels = ["square","circle","triangle"];  
//function to create the training data for the NN
function createDataSet() {
    //create data to recognize shapes 
    //make a "set" varibale for how many of each shape are created
    for (shape = 0; shape < 3; shape++){
      r = random (10, canvasSize.height/3);
      x = random(r, canvasSize.width - r);
      y = random(r, canvasSize.height - r);
      translate(x, y);
      if (shape == 0) {    //create data to recognize squares
        for (i = 0; i < 100; i++) {
          clearCanvas();
          rectMode(CENTER);
          rotate(random(-0.1, 0.1));
          square(0, 0, r*2);
          addShape(trainingLabels[0]);
      }
    } else if (shape == 1) {       //create data to recognize circles
        for (i = 0; i < 100; i++) {
          clearCanvas();
          circle(x, y, r*2);
          addShape(trainingLabels[1]);
        }
      } else if (shape == 2) {     //create data to recognize triangles
          for (i = 0; i < 100; i++) {
           clearCanvas();
           rotate(random(-0.1, 0.1));
           triangle(0, -r, r, r, -r, r);
           addShape(trainingLabels[2]);
      }
    }
  //run the training?
  //startTraining();
  }
}


function addShape(label){
  img = canvas.get();
  shapeClassifier.addData({image: img}, {label: label});
  console.log(">>> SHAPE",label,"ADDED! <<<") 
}

function startTraining() {
  console.log(">>> INITIATING TRAINING! <<<")
  shapeClassifier.train({ epochs: 50 }, finishedTraining);
}

function clearCanvas() {
  DRAW = {
    FREE:[],
    LINE:{
      x1:undefined,
      y1:undefined,
      x2:undefined,
      y2:undefined,
    },
    freeStore:[],
    lineStore:[]
  }
  clear();
  background(canvasSize.color);
  console.log(">>> CLEARED! <<<")
}

function finishedTraining(){  // callback for shapeClassifier.train()
  console.log(">>> TRAINING FINISHED! <<<")
}


let DRAW = {
  FREE:[],  // vertices of current drawing
  LINE:{  // coords of current line
    x1:undefined,
    y1:undefined,
    x2:undefined,
    y2:undefined,
  },
  freeStore:[],
  lineStore:[],
}
// DRAWING CONTROLS START HERE 
function mousePressed() {

  if (keyIsDown(SHIFT) === false){  // allows freehand drawing
    DRAW.FREE = [];  // if SHIFT is not being held, start a new drawing
  } else if (keyIsDown(SHIFT) === true) {  // allows the drawing of a straight line
    DRAW.LINE = {x1:mouseX, y1:mouseY, x2:undefined, y2:undefined};  // CLEARS X2 AND Y2; ELSE WOULD CONNECT TO PREVIOUSLY DRAWN LINE
  }

}

function mouseDragged(){

  if (keyIsDown(SHIFT) === false){  // FREEHAND DRAWING CONTROLS
    DRAW.FREE.push([mouseX,mouseY]); // pushing every x/y coordinate of the pressed mouse
    noFill();
    drawSketches(DRAW.FREE);

  } else if (keyIsDown(SHIFT) === true){  // LINE DRAWING CONTROLS
    let l = DRAW.LINE;
    DRAW.LINE = {x1:l.x1, y1:l.y1, x2:mouseX, y2:mouseY};
    let x1 = DRAW.LINE.x1;
    let y1 = DRAW.LINE.y1;
    let x2 = DRAW.LINE.x2;
    let y2 = DRAW.LINE.y2;
    background(canvasSize.color);  // ALLOWS A SINGLE 'PREVIEW' LINE
    line(x1,y1,x2,y2);  
  }

}

function mouseReleased() {

  DRAW.freeStore.push(DRAW.FREE);
  DRAW.lineStore.push(DRAW.LINE);

}


// FRAME UPDATES
function drawLines(){  // RE-DRAWS ALL STORED LINES

  let l = DRAW.lineStore;
  for (i = 0; i < l.length; i++){  
    line(l[i].x1,l[i].y1,l[i].x2,l[i].y2);
  }

}

function drawSketches(array){  // RE-DRAWS ALL STORED FREEHAND DRAWINGS

  beginShape();
  for (i = 0; i < array.length; i++){ 
    let x = array[i][0];
    let y = array[i][1];
    vertex(x,y);
  }
  endShape(); 

}

function draw() {
  
  drawLines();
  for (i = 0; i < DRAW.freeStore.length; i++){
    drawSketches(DRAW.freeStore[i]);
  }
  
}




