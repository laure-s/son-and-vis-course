var halfHeight = 0;
var redC;
var yellowC;
var kb_sound;
var kill_bill_list;
var kb_time_list;
var silent, l1, l2, l3 ,l4;
var cur_audio_time;
var counter;
var time_text;
var xPos;
var play_btn;
var cur_kb_time;
var yPos=0;
var recHeight=20;
var linePos;
var lastLinePos=220;
var lastCRecHeight=0;
var lastDRecHeight=0;
var isMass;
var spawnPerFrame = 3;
var allParticles = [];
// var particlesHist = [];

var cnv;


function toggleSong(){
	if (kb_sound.isPlaying()){
		kb_sound.pause();
		play_btn.html("play");
	} else {
		kb_sound.play();
		play_btn.html("pause");
	}
}

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
	kb_sound = loadSound('killbill_datasound2.mp3');
	kill_bill_list = [[0, 2], [1, 15], [0, 6], [0, 3], [1, 6], [1, 6], [2, 2],
								 [4, 0], [0, 6], [0, 0], [0, 0], [2, 7], [0, 0], [0, 1], [6, 0],
								 [26, 0], [11, 1], [0, 0], [1, 0], [0, 1]];

	kb_time_list = [1, 2168, 5178, 7345, 9512, 12522, 15531, 18541, 21550, 23718, 26537,
									29357, 32366, 35186, 37353, 40173, 46970, 53766, 56586, 59595];
	counter = 0;
	cur_kb_time = 0;
	linePos = 0;
	silent = 0;
	l1 = 1;
	l2 = 2;
	l3 = 3;
	l4 = 4;
	redC = color(250, 0, 0);
	yellowC = color(255, 230, 0);
	isMass=false;
}

function setup() {
	counter = 0;
	cur_kb_time = 0;
	silent = 0;
	l1 = 1;
	l2 = 2;
	l3 = 3;
	l4 = 4;
	halfHeight = windowHeight/2;
	redC = color(250, 0, 0);
	yellowC = color(255, 230, 0);

	cnv = createCanvas(windowWidth-200, windowHeight);
  cnv.position(100,0);

	background(300);
	drawBackground();

	play_btn = createButton('play');
	play_btn.position(50,150);
	play_btn.mousePressed(toggleSong);
	time_text = "0 mins";

}

function draw() {
	if (!isMass){
		drawBackground();
	}
	// else {
	// 	drawMassBackground();
	// }

	cur_kb_time =	kb_time_list[counter];
	cur_audio_time = (kb_sound.currentTime()) * 1000;

	if (cur_audio_time >= cur_kb_time){
		counter++;
		time_text = (counter*5).toString() + " mins";
		yPos=-5;
		recHeight=0;
		lastCRecHeight =0;
		lastDRecHeight =0;
		if (kill_bill_list[counter][0] > 10){
    // if (counter == 15){

			isMass = true;
      kb_sound.setVolume(1.0);
		} else {
			isMass = false;
      kb_sound.setVolume(0.7);
		}
	}
	// to make it the size of time bar
	linePos = map(counter, 0, kb_time_list.length, 220, 1020);
	// to make it smooth
	linePos = lerp(lastLinePos, linePos, 0.02);
	text(time_text, linePos-15, halfHeight+35);
	stroke(yellowC);
	line(linePos, halfHeight-10, linePos, halfHeight+10);
	stroke(0);
	line(linePos+2, halfHeight-10, linePos+2, halfHeight+10);

	lastLinePos = linePos;
	if (kb_sound.isPlaying()){
    if (isMass){
      massDeath(counter);
    }
    else{
      curse(counter);
      death(counter);
    }
	}
}

function curse(counter){
	let speed;
	fill(yellowC);
	noStroke();
	xPos = map(counter, 0, kill_bill_list.length, 0, windowWidth);
	recHeight = map(kill_bill_list[counter][1], 0, 26, 0, windowHeight);
	speed = (kill_bill_list[counter][1]) / 100;
	recHeight = lerp(lastCRecHeight, recHeight, speed);
	rect(xPos, yPos, 20, recHeight, 50);
	lastCRecHeight = recHeight;
}

function death(counter){
	fill(redC);
	noStroke();
	xPos = map(counter, 0, kill_bill_list.length, 0, windowWidth);
	recHeight = map(kill_bill_list[counter][0], 0, 26, 0, windowHeight);
	recHeight = lerp(lastDRecHeight, recHeight, 0.02);
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
	// particlesHist.push(allParticles.slice(0));
}

// function drawMassBackground(){
// 	clear();
// 	stroke(redC);
// 	strokeWeight(2);
// 	line(300, (halfHeight), 1100, (halfHeight));
// 	for (particlesList in particlesHist){
// 		for (var i = allParticles.length-1; i > -1; i-=1){
// 				stroke(allParticles[i].h, 360, 360);
//     	strokeWeight(allParticles[i].size);
//     	line(allParticles[i].lastPos.x, allParticles[i].lastPos.y,
//          allParticles[i].pos.x, allParticles[i].pos.y);
// 		}
// 	}
// }
