function preload() {
  img = loadImage('https://tile.openstreetmap.org/14/8612/5862.png');
}

function setup() {
  createCanvas(300, 300);

}

function draw() {
image(img,0,0,300,300);
  circle(mouseX,mouseY,20);
  
}

