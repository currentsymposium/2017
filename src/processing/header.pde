int howMany = 110;
ExLine [] Elem = new ExLine[howMany];

void setup() {
  size(800, 600);
  background(30,40,130);
  stroke(250);
  strokeWeight(.4);
  float x = 0;
  float theta = 0;
  for (int i = 0; i < Elem.length; i++) {
    x += width/howMany;
    Elem[i]= new ExLine(x, theta);
    theta += PI/howMany;
  }
}

void draw() {
  background(30,40,130);
  for (int i = 0; i < Elem.length; i++) {
    Elem[i].display();
  }
}
class ExLine {
  float x, y, y2, y3;
  float rad, theta;

  ExLine(float _x, float _theta) {
    x = _x;
    y = height;
    y2 = y - 0.5;
    rad = 900;
    theta = _theta;
  }

  void display() {
    line(x, y, x, y2);
    line(x, y2, x, y3);

    y3 = y2 - map(sin(theta), -1, 2, 0, 1) * rad;

    theta += .005;
  }
}
