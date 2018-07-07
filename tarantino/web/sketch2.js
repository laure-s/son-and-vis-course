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
var x_time;
var play_btn;
var cur_kb_time;
var yPos=0;
var recHeight=20;

function toggleSong(){
	if (kb_sound.isPlaying()){
		kb_sound.pause();
    play_btn.html("play");
	} else {
		kb_sound.play();
    play_btn.html("pause");
	}
}
function loaded(){
  play_btn = createButton('play');
	play_btn.position(150,150);
	play_btn.mousePressed(toggleSong);
}
function drawBackground(){
  clear();
	halfHeight = windowHeight/2;
	stroke(redC);
	strokeWeight(2);
	line(300, (halfHeight), 1100, (halfHeight));
}

function preload(){
	kb_sound = loadSound('killbill_datasound.mp3');
	kill_bill_list = [(0, 2), (1, 15), (0, 6), (0, 3), (1, 6), (1, 6), (2, 2),
								 (4, 0), (0, 6), (0, 0), (0, 0), (2, 7), (0, 0), (0, 1), (6, 0),
								 (26, 0), (19, 1), (0, 0), (1, 0), (0, 1)]

	kb_time_list = [1, 2168, 5178, 7345, 9512, 12522, 15531, 18541, 21550, 23718, 26537,
									29357, 32366, 35186, 37353, 40173, 46970, 53766, 56586, 59595]
}
function setup() {

  // kb_sound = loadSound('killbill_datasound.mp3', loaded);

  counter = 0;
	cur_kb_time = 0;
	silent = 0;
	l1 = 1;
	l2 = 2;
	l3 = 3;
	l4 = 4;
	redC = color(250, 0, 0);
	yellowC = color(255, 230, 0);

	createCanvas(windowWidth, windowHeight);
  background(300);

	drawBackground();

	play_btn = createButton('play');
	play_btn.position(50,150);
	play_btn.mousePressed(toggleSong);
	x_time = 100;
	time_text = "0 mins";
}

function draw() {
	drawBackground();
	cur_kb_time =	kb_time_list[counter];
	cur_audio_time = (kb_sound.currentTime()) * 1000;

	if (cur_audio_time > cur_kb_time){
		counter++;
		time_text = (counter*5).toString() + " mins";
		yPos=0;
		recHeight=20;
		// updateTime();
	}
	// text(counter, 100, 20);
	// text(cur_audio_time, 100, halfHeight+50);
	text(time_text, x_time, halfHeight+35);
	// text(cur_kb_time.toString(), x_time, halfHeight+70);

	x_time = 300 + (counter*35);
	stroke(yellowC);
	line(x_time, halfHeight-10, x_time, halfHeight+10);
	stroke(0);
	line(x_time+2, halfHeight-10, x_time+2, halfHeight+10);

	curse(counter);

}

function curse(counter){
	rect(0, yPos, 20, recHeight, 50);
	recHeight= recHeight+1;
	if (recHeight > height){
	  yPos=yPos+5;
	}
}
function death(counter){
}
