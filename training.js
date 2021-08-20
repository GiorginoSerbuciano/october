let shapeCollection = {
  square:[],
  circle:[],
  triangle:[],
}
let setSize = 20;
function preload(){
  for (label in shapeCollection){
    for (counter = 0; counter < setSize; counter++){
      let index = nf(counter+1,3,0);
      shapeCollection[label].push(loadImage(`data/${label}_${index}.png`));
    }
  }
}


let shapeClassifier;  
const LABELS = shapeCollection;
function setup(){
  console.log("RUNNING..."); 

  let options = {
    inputs: [128, 128, 4],
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
  buttonsConfig();
}


function buttonsConfig() {
  buttons = {
    "train": createButton('Train!'),
    "load": createButton('Load!')
  }
  
  buttons.train.position(0, CANVASPROPERTIES.height + 10);
  buttons.load.position(50, CANVASPROPERTIES.height + 10);
  
  buttons.train.mousePressed(startTraining);
  buttons.load.mousePressed(loadTrainedModel);
}


function loadTrainedModel(){
  const modelDetails = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  }
  shapeClassifier.load(modelDetails, modelLoaded);
}


function modelLoaded(){
  console.log(">>> MODEL LOADED <<<")
}


function startTraining(){
  shapeClassifier.train({ epochs: 50 }, finishedTraining);
}


function finishedTraining() {  
  console.log(">>> TRAINING FINISHED <<<")
}

