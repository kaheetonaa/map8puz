p5.disableFriendlyErrors = true; // disables FES
let mx = 0, my = 0, mpos = 0;
let pos0, dist0;
let puzzle_array = [...Array(9).keys()];
let control = true;
let start = false;
let inversion;
let dim;
var img = [];
var sat_img = [];
let timer = 0;
//https://services.digitalglobe.com/earthservice/tmsaccess/tms/1.0.0/DigitalGlobe:ImageryTileService@EPSG:3857@jpg/19/275635/336717.jpg?connectId=c2cbd3f2-003a-46ec-9e46-26a3996d6484

function preload() {
  
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


  //https://services.digitalglobe.com/earthservice/tmsaccess/tms/1.0.0/DigitalGlobe:ImageryTileService@EPSG:3857@jpg/{z}/{x}/{y}.jpg?connectId=c2cbd3f2-003a-46ec-9e46-26a3996d6484&flipy=true
  img[0]=loadImage('https://raw.githubusercontent.com/kaheetonaa/map8puz/main/images/00.png');

  //img = [loadImage('https://raw.githubusercontent.com/kaheetonaa/map8puz/main/images/00.png'), loadImage('https://tile.openstreetmap.org/19/275637/187568.png'), loadImage('https://tile.openstreetmap.org/19/275638/187568.png'), loadImage('https://tile.openstreetmap.org/19/275636/187569.png'), loadImage('https://tile.openstreetmap.org/19/275637/187569.png'), loadImage('https://tile.openstreetmap.org/19/275638/187569.png'), loadImage('https://tile.openstreetmap.org/19/275636/187570.png'), loadImage('https://tile.openstreetmap.org/19/275637/187570.png'), loadImage('https://tile.openstreetmap.org/19/275638/187570.png')];
}

function setup() {
  frameRate(12);
  pos0 = puzzle_array.findIndex((element) => element < 1);
  let mouse_pos = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  createCanvas(windowWidth, windowHeight);
  dim = min([windowWidth, windowHeight]);
  
  puzzle_array = shuffle(puzzle_array);
  inversion = getInvCount(puzzle_array.filter((element) => element > 0));
}

function draw() {
  print (frameCount,timer);
  if (frameCount % 12 == 0 && control) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer ++;
  }
  if (inversion % 2 == 0) {
    start = true;
  } else {
    puzzle_array = shuffle(puzzle_array);
    inversion = getInvCount(puzzle_array.filter((element) => element > 0));
  }
  pos0 = puzzle_array.findIndex((element) => element < 1);
  clear();
  //image(img[0], 0, 0, 300, 300);
  textSize(30);
  puzzle_draw();
  check_win();
  //circle(mouseX, mouseY, 20);

}

function puzzle_draw() {
  let dis = dim / 3;
  let dis_int = dis/20;
  //tint(255,127);
  image(sat_img[pos0], decode(pos0)[0] * dis + dis_int, decode(pos0)[1] * dis + dis_int, dis - dis_int, dis - dis_int)
  //tint(255,255);
  for (let i = 0; i < 9; i++) {

    image(img[puzzle_array[i]], decode(i)[0] * dis + dis_int, decode(i)[1] * dis + dis_int, dis - dis_int, dis - dis_int);
    //text(puzzle_array[i], decode(i)[0] * dis + dis_int, decode(i)[1] * dis + dis_int);
  }
}

function decode(number) {
  let pos_decoded = [0, 0];
  pos_decoded[1] = floor(number / 3);
  pos_decoded[0] = number - floor(number / 3) * 3;
  return pos_decoded;
}

function mouse_to_pos() {
  if (mouseX <= dim && mouseY <= dim && mouseX >= 0 && mouseY >= 0) {
    mx = floor(mouseX * 3 / dim);
    my = floor(mouseY * 3 / dim);
  }
  if (mouseX < 0) {
    mx = 0;
  }
  if (mouseY < 0) {
    my = 0;
  }
  if (mouseX > dim) {
    mx = 2;
  }
  if (mouseY > dim) {
    my = 2;
  }
  mpos = my * 3 + mx;
}

function mousePressed() {
  mouse_to_pos();
  dist0 = dist(decode(pos0)[0], decode(pos0)[1], mx, my);
  if (control && start && dist0 == 1 && puzzle_array[mpos] != 0) {
    puzzle_array[pos0] = puzzle_array[mpos];
    puzzle_array[mpos] = 0;
  }
}

function check_win() {
  if (getInvCount(puzzle_array.filter((element) => element > 0)) == 0 && pos0 == 0) {
    control = false;
    textSize(dim/30)
    fill(255)
    text('You win in '+timer+' second!', dim/12, dim/9,2*dim/12,5*dim/12);
  }
}

function getInvCount(arr) {
  let inv_count = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) inv_count++;
    }
  }
  return inv_count;
}