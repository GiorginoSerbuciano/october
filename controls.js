function keyPressed() {
  if (keyCode === 67) {  // "c"
    clearCanvas();
  } else if (keyCode === 83) {  // "s"
    classify();
  } 
}


function mousePressed() {
  drawing.current = []; 
}


function mouseDragged() {
  let r = 15;  // "Zoom factor"
  noFill();
  drawing.current.push( [Math.round(mouseX/r)*r,Math.round(mouseY/r)*r] );
  drawSketches(drawing.current);
}


function mouseReleased() {
  drawing.store.push(drawing.current);
}

