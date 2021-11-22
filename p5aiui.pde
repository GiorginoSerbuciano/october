int cpx1, cpy1, cpx2, cpy2;  // coordinates of curve control points
int m = 6;  // number of vertices, i.e. number of rotations around circle
int x1 = 64;  // default starting x-coordinate
int y1 = 32;  // default starting y-coordinate
int setSize = 200;  // determines the number of drawings produced

void setup(){
  size(70,70); 
  frameRate(30);
}

void draw(){

  stroke(255);
  strokeWeight(2);
  background(22, 22, 29);   
  noFill();

  pushMatrix();
  if (frameCount < setSize + 1){
    print(frameCount, "lobed \n");
    int d = round(random(50,150));  // curve modifier
    
    for (int i = 0; i < m; i++){
      float angle = TWO_PI / m;  // a circle divided by the number of rotations
      int xr = round(cos(angle*(i+1))*32 + 32);  // x-coord of next point along circle
      int yr = round(sin(angle*(i+1))*32 + 32);  // y-coord of next point along circle 

      // This block determines the position of the control points -- WIP
      if (xr >= 32 && yr >= 32){  // bottom-right quadrant
        cpx1 = x1+d;
        cpy1 = y1;
        cpx2 = xr;
        cpy2 = yr+d;
      } else if (xr >= 32 && yr <= 32) {  // top-right quadrant
        cpx1 = x1;
        cpy1 = y1-d;
        cpx2 = xr+d;
        cpy2 = yr;
      } else if (xr <= 32 && yr >= 32) {  // bottom-left quadrant
        cpx1 = x1+d;
        cpy1 = y1+d;
        cpx2 = xr-d;
        cpy2 = yr+d;
      } else if (xr <= 32 && yr <= 32) {  // top-left quadrant
        cpx1 = x1-d;
        cpy1 = y1+d;
        cpx2 = xr;
        cpy2 = yr-d;
      }
      
        noFill();
        curve(cpx1, cpy1, x1, y1, xr, yr, cpx2, cpy2);

      x1 = xr;  // stores last x-coord
      y1 = yr;  // stores last y-coord  

    }

    saveFrame("data/lobed_###.png"); 
    popMatrix();

  } else if (frameCount > setSize && frameCount < 1 + setSize * 2) {

    print(frameCount, "entire \n");

    int width = round(random(15, 60));
    int height = round(random(15, 60));

    ellipse(35, 35, width, height); //creates oval shapes with semi-random size through width, height parameters

    saveFrame("data/entire_###.png");
    popMatrix();

  } else if (frameCount == 1 + setSize * 2) {
    exit();
  }
}