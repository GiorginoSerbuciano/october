let shapes = {
  square:[],
  circle:[],
  triangle:[],
}
let size = 20;
function preload(){
  for (label in shapes){
    for (counter = 0; counter < size; counter++){
      let index = nf(counter+1,3,0);
      shapes[label].push(loadImage(`data/${label}_${index}.png`));
    }
  }
}


function setup(){
  let options = {
    inputs: [64, 64, 4],
    task: "imageClassification",
    debug: "true",
  }
  shapeClassifier = ml5.neuralNetwork(options);
  for (label in shapes){
    for (item in shapes[label]){
    let image = shapes[label][item];
    shapeClassifier.addData( {image: image}, {label: label} );
    }
  }
  shapeClassifier.normalizeData(); 
}

function keyPressed() {
  if (keyCode === 84) {  // "t"
    startTraining();
  }
}


function startTraining(){
  shapeClassifier.train({ epochs: 50 }, finishedTraining);
}


function finishedTraining() {  
  console.log(">>> TRAINING FINISHED <<<")
  shapeClassifier.save();
}



