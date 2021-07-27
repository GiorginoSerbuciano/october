let shapeClassifier;
let canvas;
let img;
let buttons;

let labels = [
  "square",
  "circle",
  "triangle",
]
let label = labels[0];
let drawing_array = [];
let drawing = [];
let i = 0;

function setup(){
  canvasWidth = 255;
  canvasHeight = 255;
  canvas = createCanvas(canvasWidth, canvasHeight);


  background(255);
  console.log("RUNNING..."); 

  let options = {
    inputs: [500,500, 4],
    task: "imageClassification",
    debug: "true"
  };

  shapeClassifier = ml5.neuralNetwork(options);

  buttonsConfig();

  console.log(label);

}

function buttonsConfig(){

  buttons = {
    "add": createButton('Add!'),
    "label": createButton('Click me to change label!'),
    "train": createButton('Train!'),
    "auto_train": createButton('Auto train!')
    // Added Button to start automatic training 
  }
  
  buttons.add.position(50, 270);
  buttons.train.position(0, 270);
  buttons.label.position(94, 270);
  buttons.auto_train.position(0, 290);
  //Moved all the buttons below the canvas
  
  buttons.train.mousePressed(startTraining);
  buttons.add.mousePressed(addShape);
  buttons.label.mousePressed(changeLabel);
  buttons.auto_train.mousePressed(createDataSet);

}

//function to create the training data for the NN
function createDataSet() {
    //create data to recognize shapes 
    for ( shape = 0; shape < 3; shape++){
      r = random (10, 100);
      x = random(r, canvasWidth - r);
      y = random(r, canvasHeight - r);
      translate(x, y);
      if (shape == 0) {    //create data to recognize squares
        for ( i = 0; i < 100; i++) {
          clearCanvas();
          rectMode(CENTER);
          rotate(random(-0.1, 0.1));
          square(0, 0, r*2);
          label = labels[0];
          addShape();
      }
      console.log(label);
    } else if (shape == 1) {       //create data to recognize circles
        for ( i = 0; i < 100; i++) {
          clearCanvas();
          circle(x, y, r*2);
          label = labels[1];
          addShape();
        }
        console.log(label);
      } else if (shape == 2) {     //create data to recognize triangles
          for ( i = 0; i < 100; i++) {
           clearCanvas();
           rotate(random(-0.1, 0.1));
           triangle(0, -r, r, r, -r, r);
           label = labels[2];
           addShape();
      }
      console.log(label);
    }
  //run the training?
  //startTraining();
  }
}

function startTraining(){
  shapeClassifier.normalizeData();
  shapeClassifier.train({ epochs: 10 }, finishedTraining);
}

function finishedTraining(){
  console.log(">>> TRAINING FINISHED! <<<")
  // setTimeout(buttons.train = createButton("Train!"), 1000 )
}

function addShape() {
  img = get();
  shapeClassifier.addData({ image: img }, { label: label });
  console.log(shapeClassifier.data);
}

function changeLabel() {
  if (i < labels.length - 1){
    // buttons.label = createButton(labels[i]);
    i++;
    label = labels[i];
    console.log(label, i);
  } else {
    i = 0;
    label = labels[i];
    console.log(label, i);
  }
  
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function mousePressed() {
  // console.log("event: mousePressed()");
  // x1 y1
  if (keyIsDown(SHIFT) === false){
    drawing = [];
  }
}

function clearCanvas() {
  drawing = [];
  clear();
  background(255);
}

function keyPressed() {

  if (key === "c"){
    clearCanvas();
    // BUG: Does not clear latest drawing!
    // FIXED: draw() -> mouseDragged() + background back to white after clear
    // BREAKS: SHIFT key line drawing!!

  } else if (key === "a"){
    shapeClassifier.addData({ image: get(0, 0, 255, 255)})

  }
}

function mouseReleased(){
  // console.log("event: mouseReleased()");
  // x2 y2
  drawing_array.push(drawing);
  // drawing = [];
  // 
}

function mouseDragged(){
  noFill();
  if (mouseIsPressed){
    drawing.push([mouseX,mouseY]);
    beginShape();
    for (let i = 0; i < drawing.length; i++){
      let x = drawing[i][0];
      let y = drawing[i][1];
      vertex(x,y);
    }
  }
  endShape();
}

function draw(){

}
