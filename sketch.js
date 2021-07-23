// GLOBALS
let shapeClassifier;  // ml5.neuralnetwork()
let canvas;  // createCanvas()
let labels = ["square","circle","triangle"];  
let i = 0;
let current_label = labels[0]; // defaults drawing label to square
let drawing = [];  // stores the current drawing i.e. shape being drawn
let drawing_line = [];
let line_drawings = [];
let drawings = [];
let l1 = {};
let l2 = {};
let line_start = true;

function setup(){
  // canvas = createCanvas(windowWidth, windowHeight);
  const canvas_size = {height:255, width:255};
  canvas = createCanvas(canvas_size.width, canvas_size.height);

  background(255);
  console.log("RUNNING..."); 

  let options = {
    inputs: [canvas_size.width, canvas_size.height,4],
    task: "imageClassification",
    debug: "true"
  };

  shapeClassifier = ml5.neuralNetwork(options);
}


function finishedTraining(){  // callback for shapeClassifier.train()
  console.log(">>> TRAINING FINISHED! <<<")
}

function mousePressed() {

  if (keyIsDown(SHIFT) === false){  // allows the drawing of a straight line
    drawing = [];  // if SHIFT is not being held, start a new drawing
  } else if (keyIsDown(SHIFT) === true) {
    // if (line_start === true){
    l2 = {};
    l1 = {x1:mouseX, y1:mouseY};
      // line_start = false;
      // console.log(line_start);
    // } else if (line_start === false){
      // l2 = {x2:mouseX, y2:mouseY};
      // line_start = true;
      // console.log(line_start);
    // }
    
    console.log(l1);
  }
}

function changeLabel(){  // cycles through labels (see global labels)
  // let i = 0;
  if (i < labels.length - 1){
    i++;
    current_label = labels[i];
  } else {
    i = 0;
    current_label = labels[i];
  };
}

function keyPressed() {

  if (key === "c"){  // clears the canvas
    drawing = [];
    line_drawings = [];
    drawing_line = [];
    drawings = [];
    l1 = [];
    l2 = [];
    clear();
    background(255);
    console.log(drawing, drawings, line_drawings, drawing_line, l1, l2);
    // bug: Drawing straight lines only works when holding shift and dragging

  } else if (key === "a"){  // adds the canvas i.e. the drawn shape to the NN's data
    img = canvas.get();
    shapeClassifier.addData({image: img}, {label: current_label});

  } else if (key === "l"){  // goes to the next label
    changeLabel();  // does not work
    console.log(">>> LABEL:", current_label, "<<<");

  } else if (key === "t"){  // begins training
    shapeClassifier.train({ epochs: 50 }, finishedTraining);
  }
}


function mouseDragged(){  // responsible for interaction with the canvas

    // pushing every x/y coordinate of the pressed mouse

  if (keyIsDown(SHIFT) === false){  // drawing controls
    drawing.push([mouseX,mouseY]);
    noFill();
    beginShape();
    for (let i = 0; i < drawing.length; i++){  // for every x/y coordinate recorded...
      let x = drawing[i][0];  // ...define x...
      let y = drawing[i][1];  // ...define y...
      vertex(x,y);  // ...and draw a vertex at that position.
    endShape(); 
    }
  
  } else if (keyIsDown(SHIFT) === true){
    l2 = {x2:mouseX, y2:mouseY};
    background(255);
    line(l1.x1, l1.y1, l2.x2, l2.y2);
  }

   // closes the shape once the mouse is released.
}


function draw() {
  

  for (let i = 0; i < line_drawings.length; i++){
    line(line_drawings[i].x1,line_drawings[i].y1,line_drawings[i].x2,line_drawings[i].y2);
  }
  
  for (let i = 0; i < drawings.length; i++){
    beginShape();
    for (let j = 0; j < drawings[i].length; j++){  // for every x/y coordinate recorded...
      let x = drawings[i][j][0];  // ...define x...
      let y = drawings[i][j][1];  // ...define y...
      vertex(x,y);  // ...and draw a vertex at that position.
      }
    endShape(); 
  }
}

function mouseReleased() {
  drawing_line = {x1:l1.x1, y1:l1.y1, x2:l2.x2, y2:l2.y2};
  drawings.push(drawing);
  line_drawings.push(drawing_line);
}


