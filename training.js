let leaves = {
  lobed:[],
  entire:[],
}

let size = 200;
let index;
function preload(){
  for (counter = 0; counter < size; counter++){
    index = nf(counter + 1, 3, 0);
    leaves.lobed.push(loadImage(`dataset/data/lobed_${index}.png`));
    // console.log(`data/lobed_${index}.png`);
    index = nf(counter + size + 1, 3, 0);
    leaves.entire.push(loadImage(`dataset/data/entire_${index}.png`));
    // console.log(`data/entire_${index}.png`);
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
  shapeClassifier.train({ epochs: 50 }, finishedTraining);
}


function finishedTraining() {  
  console.log(">>> TRAINING FINISHED <<<")
  shapeClassifier.save();
}



