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
  if (keyCode === 67) {  // "c"
    clearCanvas();
  } else if (keyCode === 83) {  // "s"
    classify();
  }
}


function mousePressed() {
  drawing.current = [];  // if SHIFT is not being held, start a new drawing
}


function mouseDragged() {
  let r = 15;
  noFill();
  drawing.current.push( [Math.round(mouseX/r)*r,Math.round(mouseY/r)*r] ); // pushing every x/y coordinate of the pressed mouse
  drawSketches(drawing.current);
}


function mouseReleased() {
  drawing.store.push(drawing.current);
}

