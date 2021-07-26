// GLOBALS
let shapeClassifier;  // ml5.neuralnetwork()
let canvas;  // createCanvas()

// LABELS AND CYCLING
let labels = ["square","circle","triangle"];  
let i = 0;  // MOVE INTO LOCAL
let current_label = labels[0];  // defaults drawing label to square

// CONTAINER FOR DRAWINGS
let DRAW = {
  FREE:[],  // vertices of current drawing
  LINE:{  // coords of current line
    x1:undefined,
    y1:undefined,
    x2:undefined,
    y2:undefined,
  },
  free_store:[],
  line_store:[]
}


function setup(){
  const canvas_size = {height:255, width:255};
  canvas = createCanvas(canvas_size.width, canvas_size.height);

  background(255);
  console.log("RUNNING..."); 
  console.log(">>> LABEL:", current_label, "<<<");

  let options = {
    inputs: [canvas_size.width, canvas_size.height,4],
    task: "imageClassification",
    debug: "true"
  }

  shapeClassifier = ml5.neuralNetwork(options);
}


function finishedTraining(){  // callback for shapeClassifier.train()
  console.log(">>> TRAINING FINISHED! <<<")
}

function changeLabel(){ 
  // let i = 0;
  if (i < labels.length - 1){
    i++;
    current_label = labels[i];
  } else {
    i = 0;
    current_label = labels[i];
  }

}

function keyPressed() {

  if (key === "c"){  // clears the canvas
    DRAW = {
      FREE:[],
      LINE:{
        x1:undefined,
        y1:undefined,
        x2:undefined,
        y2:undefined,
      },
      free_store:[],
      line_store:[]
    }
    clear();
    background(255);

  } else if (key === "a"){  // adds the canvas i.e. the drawn shape to the NN's data
    img = canvas.get();
    shapeClassifier.addData({image: img}, {label: current_label});

  } else if (key === "l"){  // goes to the next label
    changeLabel(); 
    console.log(">>> LABEL:", current_label, "<<<");

  } else if (key === "t"){  // begins training
    shapeClassifier.train({ epochs: 50 }, finishedTraining);
  }

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
    background(255);  // ALLOWS A SINGLE 'PREVIEW' LINE
    line(x1,y1,x2,y2);  
  }

}

function mouseReleased() {

  DRAW.free_store.push(DRAW.FREE);
  DRAW.line_store.push(DRAW.LINE);

}


// FRAME UPDATES
function drawLines(){  // RE-DRAWS ALL STORED LINES

  let l = DRAW.line_store;
  for (let i = 0; i < l.length; i++){  
    line(l[i].x1,l[i].y1,l[i].x2,l[i].y2);
  }

}

function drawSketches(array){  // RE-DRAWS ALL STORED FREEHAND DRAWINGS

  beginShape();
  for (let i = 0; i < array.length; i++){ 
    let x = array[i][0];
    let y = array[i][1];
    vertex(x,y);
  }
  endShape(); 

}

function draw() {
  
  drawLines();
  for (let i = 0; i < DRAW.free_store.length; i++){
    drawSketches(DRAW.free_store[i]);
  }
  
}




