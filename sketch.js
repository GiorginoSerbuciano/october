let shapeClassifier;
let canvas;
let buttons;

let labels = [
  "square",
  "circle",
  "triangle",
]
let label_pos = 0
let current_label = labels[label_pos];
let drawing_array = [];
let drawing = [];
let i = 0;

function setup(){
  // canvas = createCanvas(windowWidth, windowHeight);
  canvas = createCanvas(128,128);

  background(255);
  console.log("RUNNING..."); 

  let options = {
    inputs: [128,128,4],
    task: "imageClassification",
    debug: "true"
  };

  shapeClassifier = ml5.neuralNetwork(options);

}


function finishedTraining(){
  console.log(">>> TRAINING FINISHED! <<<")
  // setTimeout(buttons.train = createButton("Train!"), 1000 )
}

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
    background(255);
    // fix: SHIFT key line drawing!!
  } else if (key === "a"){
    img = canvas.get();
    shapeClassifier.addData({image: img}, {label: current_label});
    console.log(shapeClassifier.data);

  } else if (key === "l"){
    label_pos = label_pos++;
    console.log(">>> LABEL:", current_label, "<<<");

  } else if (key === "t"){
    shapeClassifier.train({ epochs: 10 }, finishedTraining);
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
