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


function keyPressed() {
  if (keyCode === 67) {
    clearCanvas();
  }
}


function mousePressed() {
  if (keyIsDown(SHIFT) === false) {  // allows freehand drawing
    drawCollection.free = [];  // if SHIFT is not being held, start a new drawing
    drawCollection.clone1 = []; 
  } 
}



function mouseDragged() {
  if (keyIsDown(SHIFT) === false) {  // FREEHAND DRAWING CONTROLS
    drawCollection.free.push( [mouseX,mouseY] ); // pushing every x/y coordinate of the pressed mouse
    drawCollection.clone1.push( [mouseX*20,mouseY*20] ); // pushing every x/y coordinate of the pressed mouse
    noFill();
    // drawSketches(drawCollection.free);
    drawSketches(drawCollection.clone1);
  } 
}


function mouseReleased() {
  drawCollection.freeStore.push(drawCollection.free);
  drawCollection.cloneStore.push(drawCollection.clone1);
  drawCollection.lineStore.push(drawCollection.line);
}

