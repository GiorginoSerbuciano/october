function keyPressed() {
  if (keyCode === 83) {  // "s"
    plantTree(treeName);
  } 
}


function mousePressed() {
  clearCanvas();
  drawing.current = []; 
  
}


function mouseDragged() {
  let r = 5;  // "Zoom factor"
  noFill();
  drawing.current.push( [Math.round(mouseX/r)*r,Math.round(mouseY/r)*r] );
  drawSketches(drawing.current);
}


function mouseReleased() {
  drawing.store.push(drawing.current);
  classify();
}
