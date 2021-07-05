let vertex_list = [];
let drawing_array = [];
let drawing = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);
  // console.log(">>RUNNING<<");
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function mousePressed() {
  // console.log("event: mousePressed()");
  if (keyIsDown(SHIFT) === false){
    drawing = [];
  }
}

function keyPressed() {
  if (key === "c"){
    // console.log(">>ERASE<<");
    drawing = [];
    clear();
    // BUG: Does not clear latest drawing!
  }
}

function mouseReleased(){
  // console.log("event: mouseReleased()");
  drawing_array.push(drawing);

}

function draw(){

  noFill();
  if (mouseIsPressed){
    drawing.push([mouseX,mouseY]);
    beginShape();
    for (let i = 0; i < drawing.length; i++){
      let x = drawing[i][0];
      let y = drawing[i][1];
      vertex(x,y);
    }
  }
  endShape();
}
