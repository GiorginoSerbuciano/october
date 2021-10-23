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


function mousePressed() {
if (keyIsDown(SHIFT) === false) {  // allows freehand drawing
    drawCollection.freeDrawing = [];  // if SHIFT is not being held, start a new drawing
} else if (keyIsDown(SHIFT) === true) {  // allows the drawing of a straight line
    drawCollection.lineDrawing = {x1:mouseX, y1:mouseY, x2:undefined, y2:undefined};  // CLEARS X2 AND Y2; ELSE WOULD CONNECT TO PREVIOUSLY DRAWN LINE
}
}


function mouseDragged() {
if (keyIsDown(SHIFT) === false) {  // FREEHAND DRAWING CONTROLS
    drawCollection.freeDrawing.push( [mouseX,mouseY] ); // pushing every x/y coordinate of the pressed mouse
    noFill();
    strokeWeight(weight);
    drawSketches(drawCollection.freeDrawing);
} else if (keyIsDown(SHIFT) === true) {  // LINE DRAWING CONTROLS
    let l = drawCollection.lineDrawing;
    drawCollection.lineDrawing = {x1:l.x1, y1:l.y1, x2:mouseX, y2:mouseY};
    let x1 = drawCollection.lineDrawing.x1;
    let y1 = drawCollection.lineDrawing.y1;
    let x2 = drawCollection.lineDrawing.x2;
    let y2 = drawCollection.lineDrawing.y2;
    background(bkg);  // ALLOWS A SINGLE 'PREVIEW' LINE
    line(x1, y1, x2, y2);  
}
}


function mouseReleased() {
drawCollection.freeStore.push(drawCollection.freeDrawing);
drawCollection.lineStore.push(drawCollection.lineDrawing);
}
