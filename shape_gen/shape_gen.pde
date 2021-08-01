int setSize = 10;
int w = 128;

void setup(){
  size(128,128); 
}

void draw(){
  
  float r = random(10, w/3);
  float x = random(r, w - r);
  float y = random(r, w - r);

  for (int i = 0; i < 3; i++){    
    if (i == 0) {    //create data to recognize squares
      translate(x, y);
      background(255);
      rectMode(CENTER);
      rotate(random(-0.1, 0.1));
      square(0, 0, r*2);
      saveFrame("data/square_###.png");
    } else if (i == 1) {       //create data to recognize circles
      translate(-x,-y);
      background(255);
      circle(x, y, r*2);
      saveFrame("data/circle_###.png");  
    } else if (i == 2) {     //create data to recognize triangles
      float t = random(10, w/2);  // 10,64
      background(255);
      if (t * 2 > w){                             
        rotate(random(-0.25, 0));
        triangle(t, -t + t, t, t, -t + t, t); 
      } else {
        translate(t, t);
        rotate(random(-0.99,0.99));
        triangle(t, -t + t, t, t, -t + t, t); 
      }
      saveFrame("data/triangle_###.png");  
    }
  }
  if (frameCount == 20){
    exit();
  }
}
