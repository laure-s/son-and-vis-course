var halfHeight = 0;
var redC;
var yellowC;
var kb_sound;
var kill_bill_list;
var kb_time_list;
// var silent, l1, l2, l3 ,l4;
var cur_audio;
var counter;
var time_text;
var xPos;
var play_btn;
var cur_kb_time;
var yPos=0;
var recHeight=0;
var linePos;
var lastLinePos=220;
var lastCRecHeight=0;
var lastDRecHeight=0;
var isMass;
var spawnPerFrame = 5;
var allParticles = [];
var amp;
// var particlesHist = [];

var cnv;


var silence_sound;
var small_sound;
var medium_sound;
var big_sound;
var huge_sound;




// function toggleSong(){
// 	if (kb_sound.isPlaying()){
// 		kb_sound.pause();
// 		play_btn.html("play");
// 	} else {
// 		kb_sound.play();
// 		play_btn.html("pause");
// 	}
// }

function Particle(x, y) {
  this.lastPos = new p5.Vector(x, y);
  this.pos = new p5.Vector(x, y);
  this.vel = new p5.Vector(0, 0);
  this.acc = new p5.Vector(0, 0);
  this.size = random(2, 20);
  this.h = redC;
}

function drawBackground(){
	clear();
	stroke(redC);
	strokeWeight(2);
	line(220, (halfHeight), 1020, (halfHeight));
}

function preload(){

	silence_sound = loadSound('sounds/silence2.wav');
  small_sound = loadSound('sounds/small_laugh.wav');
  medium_sound = loadSound('sounds/medium_laugh.wav');
  big_sound = loadSound('sounds/big_laugh.wav');
  huge_sound = loadSound('sounds/huge_laugh2.wav');



	kill_bill_list = [[1, 6], [1, 6], [1, 1], [0, 4], [0, 6], [0, 3],
   [3, 2], [0, 23], [1, 3], [0, 1], [5, 3], [0, 4], [1, 0],
    [0, 15], [0, 12], [1, 7], [0, 9], [0, 22], [0, 1], [0, 17],
     [0, 9], [0, 14], [0, 4], [0, 9], (0, 0), [19, 20], [0, 7],
     [0, 17], [3, 11], [7, 2], [3, 21], [1, 2]]

	cur_kb_time = 0;
	linePos = 0;
	redC = color(250, 0, 0);
	yellowC = color(255, 230, 0);
	isMass=false;
}

function setup() {
	counter = 0;
	cur_kb_time = 0;
	halfHeight = windowHeight/2;
	redC = color(250, 0, 0);
	yellowC = color(255, 230, 0);

	cnv = createCanvas(windowWidth-200, windowHeight);
  cnv.position(100,0);

	background(300);
	drawBackground();

	// play_btn = createButton('play');
	// play_btn.position(50,150);
	// play_btn.mousePressed(toggleSong);
	time_text = "0 mins";
  cur_audio = silence_sound;
  cur_audio.play();
  frameRate(30)
  // amp = new p5.Amplitude();
}

function draw() {
	if (!isMass){
		drawBackground();
	}

  if(!(cur_audio.isPlaying())) {
    counter++;
    isMass = false;
    changeAudio(counter)
    cur_audio.play();
		time_text = (counter*5).toString() + " mins";
		yPos=-5;
		recHeight=0;
		lastCRecHeight =0;
		lastDRecHeight =0;
    // if (kill_bill_list[counter][0] >= 14){
    //   isMass = true;
    // } else {
    //   isMass = false;
    // }
  }

	// to make it the size of time bar
	linePos = map(counter, 0, kill_bill_list.length, 220, 1020);
	// to make it smooth
	linePos = lerp(lastLinePos, linePos, 0.03);
	lastLinePos = linePos;

  if (isMass){
    massDeath(counter);
  }
  else{
    noStroke();
    fill(redC);
    text(time_text, linePos-15, halfHeight+35);
  	stroke(yellowC);
  	line(linePos, halfHeight-10, linePos, halfHeight+10);
  	stroke(0);
  	line(linePos+2, halfHeight-10, linePos+2, halfHeight+10);

    death(counter);
    curse(counter);
  }
}

function curse(counter){
	let speed;
	fill(yellowC);
	noStroke();
	xPos = map(counter, 0, kill_bill_list.length, 220, 1020);
	recHeight = map(kill_bill_list[counter][1], 0, 26, 0, windowHeight);
	speed = (kill_bill_list[counter][1]) / 100;
	recHeight = lerp(lastCRecHeight, recHeight, 0.05);
	rect(xPos, yPos, 20, recHeight, 50);
	lastCRecHeight = recHeight;
}

function death(counter){
  let speed;
	fill(redC);
	noStroke();
	xPos = map(counter, 0, kill_bill_list.length, 220, 1020);
	recHeight = map(kill_bill_list[counter][0], 0, 26, 0, windowHeight);
  speed = (kill_bill_list[counter][0]) / 100;
	recHeight = lerp(lastDRecHeight, recHeight, 0.05);
	rect(xPos+50, yPos, 20, recHeight, 50);
	lastDRecHeight = recHeight;
}

function massDeath(){
	for (var i = 0; i < spawnPerFrame; i++) {
  	allParticles.push(new Particle(random(width), 0));
  }

  for (var i = allParticles.length-1; i > -1; i-=1) {
    allParticles[i].acc.add(new p5.Vector(0, allParticles[i].size*0.01))

    allParticles[i].vel.add(allParticles[i].acc);
    allParticles[i].pos.add(allParticles[i].vel);
    allParticles[i].acc.mult(0);

    stroke(allParticles[i].h, 360, 360);
    strokeWeight(allParticles[i].size);
    line(allParticles[i].lastPos.x, allParticles[i].lastPos.y,
         allParticles[i].pos.x, allParticles[i].pos.y);

    allParticles[i].lastPos.set(allParticles[i].pos.x, allParticles[i].pos.y);

    if (allParticles[i].pos.y > height || allParticles[i].pos.x < 0 || allParticles[i].pos.x > width) {
      allParticles.splice(i, 1);
    }
  }
}

function changeAudio(counter){
  if(counter < kill_bill_list.length){
    // isMass = false;
    item = kill_bill_list[counter]
    num_of_death = item[0];
    num_of_curse = item[1];

    var vol;

    if (num_of_death==0 && num_of_curse==0){
      cur_audio = silence_sound;
        // # play(silence_audio)
        // sound_of_data += silence_audio
      }

    else if (num_of_death < 5 && num_of_death>0){
      vol = map(num_of_death, 0, 26, 0.0, 1.0);
      cur_audio = medium_sound;
      // cur_audio.setVolume(vol);
    }
        // # line of red

    else if (num_of_death >5 && num_of_death<14){
        vol = map(num_of_death, 0, 26, 0.0, 1.0);
        cur_audio = big_sound;
        // cur_audio.setVolume(vol);
        // # lots of lines
      }
    else if (num_of_death >= 14){
      isMass = true;
      vol = map(num_of_death, 0, 26, 0.0, 1.0);
      cur_audio = huge_sound;
      cur_audio.setVolume(vol);
        // # whole screen red
      }

    else if (num_of_curse < 14 && num_of_curse>0){
      vol = map(num_of_curse, 0, 26, 0.0, 1.0);
      cur_audio = small_sound;
      cur_audio.setVolume(vol);
        // # draw yellow line
      }
    else if (num_of_curse >= 14){
      vol = map(num_of_curse, 0, 26, 0.0, 1.0);
      cur_audio = medium_sound;
      cur_audio.setVolume(vol);
    }
  }
}
