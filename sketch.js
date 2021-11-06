let canvas;  // createCanvas()
let bkg = 0;
function setup(){
  canvas = createCanvas(windowWidth,windowHeight);
  background(bkg);
  let options = {
    inputs: [64, 64, 4],
    task: "imageClassification",
    debug: "true",
  }
  shapeClassifier = ml5.neuralNetwork(options);
  for (label in shapeCollection){
    for (item in shapeCollection[label]){
    let image = shapeCollection[label][item];
    shapeClassifier.addData( {image: image}, {label: label} );
    }
  }
  shapeClassifier.normalizeData(); 
  const modelDetails = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  }
  shapeClassifier.load(modelDetails, modelLoaded);
  // buttonsConfig();
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
}


let weight = 2;
function drawSketches(array) { 
  beginShape();
  strokeWeight(weight); 
  stroke(255);

  for (let i = 0; i < array.length; i++) { 
    let x = array[i][0];
    let y = array[i][1];
    vertex(x, y);
  }
  endShape(); 
}

