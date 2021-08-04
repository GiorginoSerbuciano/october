let imageFileNames;
function preload(){
  imageFileNames = loadJSON('imageList.json');  
}

let shapeClassifier;  // ml5.neuralnetwork()
let canvas;  // createCanvas()
const canvasSize = {
  height:255, 
  width:255, 
  color:255
};

let shapes = {
  "labels":[
    "square",
    "circle",
    "triangle"
  ],
  "square":[],
  "circle":[],
  "triangle":[],
};
function setup(){
  canvas = createCanvas(canvasSize.width, canvasSize.height);

  background(canvasSize.color);
  console.log("RUNNING..."); 

  let options = {
    inputs: [128, 128, 4],
    task: "imageClassification",
    debug: "true"
  };

  shapeClassifier = ml5.neuralNetwork(options);
  buttonsConfig();
  canvas = createCanvas(canvasSize.width, canvasSize.height);
  background(canvasSize.color);
  console.log("RUNNING...");
  trainingLabels = ["square", "circle", "triangle"];

  for (i = 0; i < shapes.labels.length; i++){
    let label = shapes.labels[i];
    for (j = 0; j < imageFileNames[label].length; j++){
      shapes[label].push(loadImage(`shape_gen/data/${imageFileNames[label][j]}`));
    }
  }
  
}

function buttonsConfig() {
  buttons = {
    "train": createButton('Train!'),
    "load": createButton('Load!')
  }
  
  buttons.train.position(0, canvasSize.height + 10);
  buttons.load.position(50, canvasSize.height + 10);
  
  buttons.train.mousePressed(startTraining);
  buttons.load.mousePressed(loadDataSet);

}


function loadDataSet() {

  for (i = 0; i < shapes.labels.length; i++){
    let label = shapes.labels[i];
    for (j = 0; j < imageFileNames[label].length; j++){
      image = shapes[label][j];
      addShape(image, label);
    }
  } 
}



function finishedTraining() {  // callback for shapeClassifier.train()
  console.log(">>> TRAINING FINISHED! <<<")
}



function addShape(image, label) {
  shapeClassifier.addData( {image: image}, {label: label} );
  console.log("Added a", label, "to the training dataset!")
}


function startTraining(){
  shapeClassifier.train({ epochs: 10 }, finishedTraining);
}


let DRAW = {
  FREE:[],
  LINE: {
    x1:undefined,
    y1:undefined,
    x2:undefined,
    y2:undefined,
  },
  freeStore:[],
  lineStore:[]
}

function clearCanvas() {
  DRAW = {
    FREE:[],
    LINE: {
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
}

function mousePressed() {
  if (keyIsDown(SHIFT) === false) {  // allows freehand drawing
    DRAW.FREE = [];  // if SHIFT is not being held, start a new drawing

  } else if (keyIsDown(SHIFT) === true) {  // allows the drawing of a straight line
    DRAW.LINE = {x1:mouseX, y1:mouseY, x2:undefined, y2:undefined};  // CLEARS X2 AND Y2; ELSE WOULD CONNECT TO PREVIOUSLY DRAWN LINE
  }
}

function mouseDragged() {
  if (keyIsDown(SHIFT) === false) {  // FREEHAND DRAWING CONTROLS
    DRAW.FREE.push( [mouseX,mouseY] ); // pushing every x/y coordinate of the pressed mouse
    noFill();
    drawSketches(DRAW.FREE);
  } else if (keyIsDown(SHIFT) === true) {  // LINE DRAWING CONTROLS
    let l = DRAW.LINE;
    DRAW.LINE = {x1:l.x1, y1:l.y1, x2:mouseX, y2:mouseY};
    let x1 = DRAW.LINE.x1;
    let y1 = DRAW.LINE.y1;
    let x2 = DRAW.LINE.x2;
    let y2 = DRAW.LINE.y2;
    background(canvasSize.color);  // ALLOWS A SINGLE 'PREVIEW' LINE
    line(x1, y1, x2, y2);  
  }
}

function mouseReleased() {
  DRAW.freeStore.push(DRAW.FREE);
  DRAW.lineStore.push(DRAW.LINE);
}


function drawLines() {  // RE-DRAWS ALL STORED LINES
  let l = DRAW.lineStore;

  for (let i = 0; i < l.length; i++) {  
    line(l[i].x1, l[i].y1, l[i].x2, l[i].y2);
  }
}




function drawSketches(array) {  // RE-DRAWS ALL STORED FREEHAND DRAWINGS
  beginShape();

  for (let i = 0; i < array.length; i++) { 
    let x = array[i][0];
    let y = array[i][1];
    vertex(x, y);
  }
  endShape(); 
}

function draw() {
  drawLines();

  for (let i = 0; i < DRAW.freeStore.length; i++) {
    drawSketches(DRAW.freeStore[i]);
  }
  image(shapes["circle"][2],0,0);
}
