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
  // canvas = createCanvas(windowWidth, windowHeight);
  canvas = createCanvas(500,500);

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
    "train": createButton('Train!')
  }
  
  buttons.add.position(50, 0);
  buttons.train.position(0, 0);
  buttons.label.position(94, 0);
  
  buttons.train.mousePressed(startTraining);
  buttons.add.mousePressed(addShape);
  buttons.label.mousePressed(changeLabel);

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

function keyPressed() {

  if (key === "c"){
    drawing = [];
    clear();
    // BUG: Does not clear latest drawing!
    // FIXED: draw() -> mouseDragged()
    // BREAKS: SHIFT key line drawing!!

  } else if (key === "a"){
    shapeClassifier.addData({ image: get(0, 0, 200, 200)})

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
