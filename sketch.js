function setup() {
  dado = new Dado();
  createCanvas(800, 600);
}

function draw() {
  ellipse(50, 50, 80, 80);
  dado.show();
}

function mousePressed(){
  dado.shuffle();
}