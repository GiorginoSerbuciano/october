let canvas;  // createCanvas()
let bkg = 0;
let weight = 2;

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

let drawCollection = {
  free:[],
  clone1: [],
  clone2: [],
  clone3: [],
  clone4: [],
  line: {
    x1:undefined,
    y1:undefined,
    x2:undefined,
    y2:undefined,
  },
  freeStore:[],
  cloneStore: [],
  lineStore:[],
}

function clearCanvas() {
  drawCollection = {
    free:[],
    line: {
      x1:undefined,
      y1:undefined,
      x2:undefined,
      y2:undefined,
    },
    freeStore:[],
    lineStore:[],
  }
  clear();
  background(bkg);
}




function drawLines() {  // RE-DRAWS ALL STORED LINES
  let l = drawCollection.lineStore;
  strokeWeight(weight);

  for (let i = 0; i < l.length; i++) {  
    line(l[i].x1, l[i].y1, l[i].x2, l[i].y2);
  }
}


function drawSketches(array) {  // RE-DRAWS ALL STORED FREEHAND DRAWINGS
  beginShape();
  strokeWeight(weight);

  for (let i = 0; i < array.length; i++) { 
    let x = array[i][0];
    let y = array[i][1];
    vertex(x, y);
  }
  endShape(); 
}


function draw() {
  strokeWeight(weight);
  stroke(255);
  drawLines();
  // for (let i = 0; i < drawCollection.freeStore.length; i++) {
  //   drawSketches(drawCollection.freeStore[i]);
  // }
}
