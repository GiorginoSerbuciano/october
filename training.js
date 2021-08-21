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


function buttonsConfig() {
  buttons = {
    "train": createButton('Train!'),
    "classify": createButton('Classify!'),
    "clear": createButton('Clear!'),
  }
  buttons.train.position(0, canvas.height + 10);
  buttons.classify.position(50, canvas.height + 10);
  buttons.clear.position(100,canvas.height + 10)
  buttons.train.mousePressed(startTraining);
  buttons.classify.mousePressed(classify);
  buttons.clear.mousePressed(clearCanvas);
}


function handleResult(error,result){
  if (error){
    console.error(error);
    return;
  } else {
    console.log(result);
  }
}

function classify(){
  shapeClassifier.classify( {image: canvas.get(0,0,64,64)} , handleResult);
  
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


