// GLOBALS
let shapeClassifier;  // ml5.neuralnetwork()
let canvas;  // createCanvas()

// LABELS AND CYCLING
let labels = ["square","circle","triangle"];  
let i = 0;  // MOVE INTO LOCAL
let current_label = labels[0];  // defaults drawing label to square

// DRAWINGS
let drawing = [];  // stores the current drawing i.e. shape being drawn
let drawing_line = [];  // SAME AS 'DRAWING' BUT FOR LINES
let line_drawings = [];  // STORES ALL LINE DRAWINGS
let drawings = [];  // STORES ALL FREE-HAND DRAWINGS
let l1 = {};  // X1, Y1
let l2 = {};  // X2, Y2

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

function changeLabel(){  // cycles through labels (see global labels)
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
    drawing = [];
    line_drawings = [];
    drawing_line = [];
    drawings = [];
    l1 = [];
    l2 = [];
    // SHOULD TURN ALL OF THIS INTO A SINGLE JSON
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
    drawing = [];  // if SHIFT is not being held, start a new drawing
  } else if (keyIsDown(SHIFT) === true) {  // allows the drawing of a straight line
    l2 = {};  // CLEARS X2 AND Y2; ELSE WOULD CONNECT TO PREVIOUSLY DRAWN LINE
    l1 = {x1:mouseX, y1:mouseY};
  }

}

function mouseDragged(){

  if (keyIsDown(SHIFT) === false){  // FREEHAND DRAWING CONTROLS
    drawing.push([mouseX,mouseY]); // pushing every x/y coordinate of the pressed mouse
    noFill();
    beginShape();
    for (let i = 0; i < drawing.length; i++){  // for every x/y coordinate recorded...
      let x = drawing[i][0];  // ...define x...
      let y = drawing[i][1];  // ...define y...
      vertex(x,y);  // ...and draw a vertex at that position.
    endShape(); 
    }
  } else if (keyIsDown(SHIFT) === true){  // LINE DRAWING CONTROLS
    l2 = {x2:mouseX, y2:mouseY};
    background(255);  // ALLOWS A SINGLE 'PREVIEW' LINE
    line(l1.x1, l1.y1, l2.x2, l2.y2);  
  }

}

function mouseReleased() {

  drawing_line = {x1:l1.x1, y1:l1.y1, x2:l2.x2, y2:l2.y2};
  drawings.push(drawing);
  line_drawings.push(drawing_line);

}

function redrawLines(){  // RE-DRAWS ALL STORED LINES

  for (let i = 0; i < line_drawings.length; i++){  
    line(line_drawings[i].x1,line_drawings[i].y1,line_drawings[i].x2,line_drawings[i].y2);
  }

}

function redrawSketches(array){  // RE-DRAWS ALL STORED FREEHAND DRAWINGS

  for (let i = 0; i < drawings.length; i++){  
    beginShape();
    for (let j = 0; j < drawings[i].length; j++){
      let x = drawings[i][j][0];
      let y = drawings[i][j][1];
      vertex(x,y);
      }
    endShape(); 
  }

}

function draw() {
  
  redrawLines()
  redrawSketches()
  
}




