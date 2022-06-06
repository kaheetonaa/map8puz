function preload() {
    //img = loadImage('https://tile.openstreetmap.org/' + tilez + '/' + tx + '/' + ty + '.png')
}

function setup() {
    frameRate(12);
    dim = min([windowWidth, windowHeight]);
    createCanvas(dim, dim);
    let margin = dim / 60;
}

function draw() {
    clear();
    background(0);
    textSize(30);
}