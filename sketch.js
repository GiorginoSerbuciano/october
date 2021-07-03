let vertex_list = [];
let drawing_array = [];
let drawing = [];

function setup(){
  createCanvas(400,400);
  background(255);
}


function mouseReleased(){
  if (keyIsPressed == true){
    if (keyIsDown(SHIFT)){
    } else {
      drawing_array.push(drawing);
      drawing = [];
    }
  } else {
    drawing_array.push(drawing);
    drawing = [];
  }
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
