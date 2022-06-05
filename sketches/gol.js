let mx = 0, my = 0, mpos = 0;
let pos0, dist0;
let puzzle_array = [...Array(9).keys()];
let control = true;
let start = false;
let inversion;

//https://services.digitalglobe.com/earthservice/tmsaccess/tms/1.0.0/DigitalGlobe:ImageryTileService@EPSG:3857@jpg/19/275635/336717.jpg?connectId=c2cbd3f2-003a-46ec-9e46-26a3996d6484

function preload() {
  img = [loadImage('https://raw.githubusercontent.com/kaheetonaa/map8puz/main/images/00.png'),loadImage('https://tile.openstreetmap.org/19/275637/187568.png'),loadImage('https://tile.openstreetmap.org/19/275638/187568.png'),loadImage('https://tile.openstreetmap.org/19/275636/187569.png'),loadImage('https://tile.openstreetmap.org/19/275637/187569.png'),loadImage('https://tile.openstreetmap.org/19/275638/187569.png'),loadImage('https://tile.openstreetmap.org/19/275636/187570.png'),loadImage('https://tile.openstreetmap.org/19/275637/187570.png'),loadImage('https://tile.openstreetmap.org/19/275638/187570.png')];
}

function setup() {
  pos0 = puzzle_array.findIndex((element) => element < 1);
  let mouse_pos = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  createCanvas(300, 300);
  puzzle_array = shuffle(puzzle_array);
  inversion=getInvCount(puzzle_array.filter((element) => element > 0));
}

function draw() {
  if (inversion % 2 == 0) {
    start=true;
    console.log(inversion);
  } else {
    puzzle_array = shuffle(puzzle_array);
    inversion=getInvCount(puzzle_array.filter((element) => element > 0));
  }
  pos0 = puzzle_array.findIndex((element) => element < 1);
  dist0 = dist(decode(pos0)[0], decode(pos0)[1], mx, my);
  clear();
  //image(img[0], 0, 0, 300, 300);
  textSize(30);
  mouse_to_pos();
  check_win();
  puzzle_draw();
  circle(mouseX, mouseY, 20);
}

function puzzle_draw() {
  let dis = 100;
  let dis_int = 5;
  for (let i=0; i<9;i++) {
    
    image(img[puzzle_array[i]], decode(i)[0]* dis+dis_int, decode(i)[1]* dis+dis_int, dis-dis_int, dis-dis_int);
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
  if (mouseX <= 300 && mouseY <= 300 && mouseX >= 0 && mouseY >= 0) {
    mx = floor(mouseX / 100);
    my = floor(mouseY / 100);
  }
  if (mouseX < 0) {
    mx = 0;
  }
  if (mouseY < 0) {
    my = 0;
  }
  if (mouseX > 300) {
    mx = 2;
  }
  if (mouseY > 300) {
    my = 2;
  }
  mpos = my * 3 + mx;
}

function mousePressed() {
  if (control && start) {
  if (dist0 <= 1 && puzzle_array[mpos] != 0) {
    puzzle_array[pos0] = puzzle_array[mpos];
    puzzle_array[mpos] = 0;
  }
}
}

function check_win() {
  if (getInvCount(puzzle_array.filter((element) => element > 0))==0 && pos0==0) {
    control = false;
    text('win',50, 50);
  }
}

function getInvCount(arr){
  let inv_count = 0;
  for(let i=0; i<arr.length-1; i++){
      for(let j=i+1; j<arr.length; j++){
          if(arr[i] > arr[j]) inv_count++;
      }
  }
  return inv_count;
}