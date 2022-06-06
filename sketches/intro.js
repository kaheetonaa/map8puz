var img = [];
var sat_img = [];

function preload() {
    foreground_img = loadImage('https://raw.githubusercontent.com/kaheetonaa/map8puz/main/images/Intro.png')

    let params = getURLParams();
    let tilex = params.x;
    let tiley = params.y;
    let tilez = params.z;
    for (let ty = parseInt(tiley); ty < parseInt(tiley) + 3; ty++) {
      for (let tx = parseInt(tilex); tx < parseInt(tilex) + 3; tx++) {
        img.push(loadImage('https://tile.openstreetmap.org/' + tilez + '/' + tx + '/' + ty + '.png'))
        sat_img.push(loadImage('https://services.digitalglobe.com/earthservice/tmsaccess/tms/1.0.0/DigitalGlobe:ImageryTileService@EPSG:3857@jpg/' + tilez + '/' + tx + '/' + ty + '.jpg?connectId=c2cbd3f2-003a-46ec-9e46-26a3996d6484&flipy=true'))
      }
    }
    img[0]=loadImage('https://raw.githubusercontent.com/kaheetonaa/map8puz/main/images/00.png');

}

function setup() {
    frameRate(12);
    dim = min([windowWidth, windowHeight]);
    createCanvas(dim, dim);
}

function draw() {
    clear();
    background(255);
    //draw sat
    image(sat_img[0], dim*2/9, dim*2/9, dim*5/27, dim*5/27)
    for (let i = 0; i < 9; i++) {
        image(img[i], dim*2/9+ decode(i)[0] * dim*5/27, dim*2/9+decode(i)[1] * dim*5/27, dim*5/27,dim*5/27);
        //text(puzzle_array[i], decode(i)[0] * dis + dis_int, decode(i)[1] * dis + dis_int);
      }
    image(foreground_img,0,0,dim,dim)
    textSize(dim/40);
    textFont('Georgia');
    textAlign(CENTER)
    fill('#e70000')
    text('Click here to play !', dim/2, 8.5 *dim/9 );
}
function decode(number) {
    let pos_decoded = [0, 0];
    pos_decoded[1] = floor(number / 3);
    pos_decoded[0] = number - floor(number / 3) * 3;
    return pos_decoded;
  }
  
