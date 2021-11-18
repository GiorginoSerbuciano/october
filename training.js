let leaves = {
  three:[],
  four:[],
  five:[],
  six:[],
}
let size = 100;
function preload(){
  for (label in leaves){
    for (counter = 0; counter < size; counter++){
      let index = nf(counter+1,3,0);
      leaves[label].push(loadImage(`data/leaf_${label}_${index}.png`));
    }
  }
}


function setup(){
  let options = {
    inputs: [70, 70, 4],
    task: "imageClassification",
    debug: "true",
  }
  shapeClassifier = ml5.neuralNetwork(options);
  for (label in leaves){
    for (item in leaves[label]){
    let image = leaves[label][item];
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
  shapeClassifier.train({ epochs: 10 }, finishedTraining);
}


function finishedTraining() {  
  console.log(">>> TRAINING FINISHED <<<")
  shapeClassifier.save();
}



