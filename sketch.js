let canvas;
let bkg = 255;
function setup(){
  canvas = createCanvas(windowWidth,windowHeight);
  background(bkg);
  area();
  let options = {
    inputs: [70, 70, 4],
    task: "imageClassification",
    debug: "true",
  }
  shapeClassifier = ml5.neuralNetwork(options);
  const modelDetails = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  }
  shapeClassifier.load(modelDetails, modelLoaded);
}
function area(){
  noFill();
  strokeWeight(1);
  stroke(bkg - 255);
  square(0,0,256);
}
function modelLoaded(){
  console.log(">>> MODEL LOADED <<<")
}


function classify(){
  let img = canvas.get(0,0,256,256);
  img.resize(70,70);
  image(img, 0, 260);
  shapeClassifier.classify( {image: img} , handleResult);
}


function handleResult(error,result){
  if (error){
    console.error(error);
    return;
  } else {
    console.log(result);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(bkg);
}


let drawing = {
  current:[],
  store:[],
}
function clearCanvas() {
  drawing = {
    current:[],
    store:[],
  }
  clear();
  background(bkg);
  area();
}


function drawSketches(array) { 
  beginShape();
  strokeWeight(4); 
  stroke(bkg - 255);

  for (let i = 0; i < array.length; i++) { 
    let x = array[i][0];
    let y = array[i][1];
    vertex(x, y);
  }
  endShape(); 
}

