let shapeClassifier;
let canvas;
let img;
let buttons;
let label;
let drawing_array = [];
let drawing = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);
  console.log("RUNNING...");

  let options = {
    inputs: [windowWidth, windowHeight, 4],
    task: "imageClassification",
    debug: "true"
  };

  shapeClassifier = ml5.neuralNetwork(options);

  buttonsConfig();
  
}

function buttonsConfig(){

  buttons = {
    "add": createButton('Add!'),
    "label": createButton(label),
    "train": createButton('Train!')
  }
  
  buttons.add.position(50, 0);
  buttons.train.position(0, 0);
  buttons.label.position(94, 0);
  
  buttons.train.mousePressed();
  buttons.add.mousePressed();
  buttons.label.mousePressed();

}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function mousePressed() {
  // console.log("event: mousePressed()");

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
  drawing_array.push(drawing);

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
