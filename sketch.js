let shapeCollection = {
  TRAININGLABELS:["square", "circle", "triangle"],
  imageFilenames:{},
  imageObjects:{
    square:[],
    circle:[],
    triangle:[],
  }
};


function preload(){
  shapeCollection.imageFilenames = loadJSON('imageList.json');  
}

let shapeClassifier;  // ml5.neuralnetwork()
let canvas;  // createCanvas()
const CANVASPROPERTIES = {
  height:255, 
  width:255, 
  color:255,
};


function setup(){
  canvas = createCanvas(CANVASPROPERTIES.width, CANVASPROPERTIES.height);

  background(CANVASPROPERTIES.color);
  console.log("RUNNING..."); 

  let options = {
    inputs: [128, 128, 4],
    task: "imageClassification",
    debug: "true"
  };

  shapeClassifier = ml5.neuralNetwork(options);
  buttonsConfig();
  
  const LABELS = shapeCollection.TRAININGLABELS;
  for (i = 0; i < LABELS.length; i++){
    let label = LABELS[i];
    let imageFiles = shapeCollection.imageFilenames[label];
    for (j = 0; j < imageFiles.length; j++){
      shapeCollection.imageObjects[label].push(loadImage(`data/${imageFiles[j]}`));
      
    }
  }
  
}

function buttonsConfig() {
  buttons = {
    "train": createButton('Train!'),
    "load": createButton('Load!')
  }
  
  buttons.train.position(0, CANVASPROPERTIES.height + 10);
  buttons.load.position(50, CANVASPROPERTIES.height + 10);
  
  buttons.train.mousePressed(startTraining);
  buttons.load.mousePressed(loadDataSet);

}


function loadDataSet() {

  const LABELS = shapeCollection.TRAININGLABELS;
  for (i = 0; i < LABELS.length; i++){
    let label = LABELS[i];
    let imageObjects = shapeCollection.imageObjects[label];
    for (j = 0; j < imageObjects.length; j++){
      let img = imageObjects[j];
      console.log(img);
      addShape(img, label);
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
  shapeClassifier.train({ epochs: 20 }, finishedTraining);
}


let drawCollection = {
  freeDrawing:[],
  lineDrawing: {
    x1:undefined,
    y1:undefined,
    x2:undefined,
    y2:undefined,
  },
  freeStore:[],
  lineStore:[],
}

function clearCanvas() {
  drawCollection = {
    freeDrawing:[],
    lineDrawing: {
      x1:undefined,
      y1:undefined,
      x2:undefined,
      y2:undefined,
    },
    freeStore:[],
    lineStore:[],
  }
  clear();
  background(CANVASPROPERTIES.color);
}

function mousePressed() {
  if (keyIsDown(SHIFT) === false) {  // allows freehand drawing
    drawCollection.freeDrawing = [];  // if SHIFT is not being held, start a new drawing

  } else if (keyIsDown(SHIFT) === true) {  // allows the drawing of a straight line
    drawCollection.lineDrawing = {x1:mouseX, y1:mouseY, x2:undefined, y2:undefined};  // CLEARS X2 AND Y2; ELSE WOULD CONNECT TO PREVIOUSLY DRAWN LINE
  }
}

function mouseDragged() {
  if (keyIsDown(SHIFT) === false) {  // FREEHAND DRAWING CONTROLS
    drawCollection.freeDrawing.push( [mouseX,mouseY] ); // pushing every x/y coordinate of the pressed mouse
    noFill();
    drawSketches(drawCollection.freeDrawing);
  } else if (keyIsDown(SHIFT) === true) {  // LINE DRAWING CONTROLS
    let l = drawCollection.lineDrawing;
    drawCollection.lineDrawing = {x1:l.x1, y1:l.y1, x2:mouseX, y2:mouseY};
    let x1 = drawCollection.lineDrawing.x1;
    let y1 = drawCollection.lineDrawing.y1;
    let x2 = drawCollection.lineDrawing.x2;
    let y2 = drawCollection.lineDrawing.y2;
    background(CANVASPROPERTIES.color);  // ALLOWS A SINGLE 'PREVIEW' LINE
    line(x1, y1, x2, y2);  
  }
}

function mouseReleased() {
  drawCollection.freeStore.push(drawCollection.freeDrawing);
  drawCollection.lineStore.push(drawCollection.lineDrawing);
}


function drawLines() {  // RE-DRAWS ALL STORED LINES
  let l = drawCollection.lineStore;

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

  for (let i = 0; i < drawCollection.freeStore.length; i++) {
    drawSketches(drawCollection.freeStore[i]);
  }
}
