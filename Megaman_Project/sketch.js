/*
Jason Chan
I loved Megaman as a child so I wanted to try and create a program as a homage to Keiji Inafune
This program should allow Megaman to move and shoot his buster cannon
Created Oct 3, 2018
*/

let stageBackground, imgMegaman, imgVirus; // Global variables

// Sets up the image from my assets folder preload only runs once
function preload() {
	stageBackground = loadImage(stage.stageName[round(random(stage.stageName.length - 1))]); // Randommizes my stages
	imgMegaman = loadImage(megaman.megamanSprite[1]); // Megaman's image
	imgVirus = loadImage(stage.stageVirusDefault[0]); // Enemy's image

	// Things to load for mp3 to play
	soundFormats("mp3", "ogg");
	mySoundStart = loadSound("assets/mp3/stageStart.mp3"); // Loads audio stageStart
	mySoundClear = loadSound("assets/mp3/stageClear.mp3"); // Loads audio to stageClear
}

// Function only runs once when started
function setup() {
	createCanvas(800, 500); // Canvas size
	mySoundStart.play(); // Plays the mp3

	// These lines of code is referenced from P5.Sound Reference for displaying frequency
	fft = new p5.FFT();
	mySoundClear.amp(0.5);
}


// Function draw loops infinitely
function draw() {
	background(0, 204, 0); // Background color
	imageMode(CENTER); // Expands the image from the center of the coordinate it'll be located from
	image(stageBackground, width / 2, height / 2, width, height); // Stage the background to expand in the center and fit the canvas width and height
	textTemplate.displayScore(); // Displays the score on screen, will increment by 100 everytime an enemy is killed
	displayFrequency();

	virus.virusX -= virus.virusSpeed; // Virus move towards the left

	// If the shoot button has been pressed it'll display the bullet
	if (bullet.shootButton === true) {
		// Causes the bullet to be displayed
		bullet.display();
	}
	// Have to be displayed below if statement above otherwise bullet will display ontop of megaman
	image(imgMegaman, megaman.megamanX, megaman.megamanY, 100, 100); // Displays megaman based on coordinates
	image(imgVirus, virus.virusX, virus.virusY, 100, 100); // Displays the virus enemy based on coordinates

	bulletHitEnemy(); // Uses the custom built function for what happens when the bullet hits the enemy

	// This if statement makes the virus automatically change it's sprite as it moves
	// if (round(virus.virusX) - virus.virusX === 0.5) {
	// 	imgVirus = loadImage(stage.stageVirusDefault[0]);
	// } else {
	// 	imgVirus = loadImage(stage.stageVirusAction[0]);
	// }

	// I use this if statement to show print to console the position of my mouse location when the mouse is pressed
	// if (mouseIsPressed) {
	// 	print(`x: ${mouseX} y: ${mouseY}`);
	// }
}



/*
Functions belong below this line
*/

// This detects when certain keys are pressed
function keyPressed() {
	// SPACE BAR is pressed change the value of bullet.shootButton to true and change megaman to shoot sprite
	if (keyCode === 32) {
		bullet.shootButton = true
		bullet.speed = 3.5;
		imgMegaman = loadImage(megaman.megamanSprite[0]);
		imgVirus = loadImage(stage.stageVirusAction[0]);
	}
	// Left arrow key is pressed moves the image to the left
	else if (keyCode === 37) {
		megaman.megamanX -= megaman.speed;
		bullet.x -= megaman.speed;
		imgMegaman = loadImage(megaman.megamanSprite[4]);
		imgVirus = loadImage(stage.stageVirusAction[0]);
	}
	// Right arrow key is pressed moves the image to the right 
	else if (keyCode === 39) {
		megaman.megamanX += megaman.speed;
		bullet.x += megaman.speed;
		imgVirus = loadImage(stage.stageVirusAction[0]);
		imgMegaman = loadImage(megaman.megamanSprite[3]);
		virus.virusSpeed = 0.5;
	}
}

// The SPACE BAR is pressed to change megaman's default sprite
function keyReleased() {
	if (keyCode === 32) {
		imgVirus = loadImage(stage.stageVirusDefault[0]);
		imgMegaman = loadImage(megaman.megamanSprite[1]);
	}
	// Left arrow key is released defaults the image to the left
	else if (keyCode === 37) {
		megaman.megamanX -= megaman.speed;
		bullet.x -= megaman.speed;
		imgVirus = loadImage(stage.stageVirusDefault[0]);
		imgMegaman = loadImage(megaman.megamanSprite[2]);
	}
	// Right arrow key is released defaults the image to the right 
	else if (keyCode === 39) {
		megaman.megamanX += megaman.speed;
		bullet.x += megaman.speed;
		imgVirus = loadImage(stage.stageVirusDefault[0]);
		imgMegaman = loadImage(megaman.megamanSprite[1]);
	}
}

// Function that displays what happens when the bullet hits the enemy 
function bulletHitEnemy() {
	// Tracks if the bullet's x coordinate and enemy's x coordinates touched
	if (bullet.x > virus.virusX) {
		textTemplate.score += 100; // Increment the scoreboard by 100
		bullet.x = megaman.megamanX; // Resets the position of the bullet to megaman's x coordinate
		bullet.speed = 0; // Set's the bullet speed to 0 so the bullet doesn't continue to shoot
		imgVirus = loadImage(virus.virusDeathSprite); // Load's the sprite of what happens when the virus dies
		virus.virusX = virus.virusSpawn; // Virus changes the virus's x coordinates to respawn point coordinates
		virus.virusSpeed = 0; // Makes virus stop moving
		textTemplate.displayStageClear(); // Displays stage clear when enemy is dead
		mySoundClear.play(); // Plays audio
	}
}

// These lines of code is referenced from P5.Sound Reference for displaying frequency
// Displays frequency if stageClear audio is playing
function displayFrequency() {
	if (mySoundClear.isPlaying()) {
		var waveform = fft.waveform();
		noFill();
		beginShape();
		stroke(0, 102, 255); // waveform is red
		strokeWeight(3);
		for (var i = 0; i < waveform.length; i++) {
			var x = map(i, 0, waveform.length, 0, width);
			var y = map(waveform[i], -1, 1, 0, height);
			vertex(x, y);
		}
		endShape();
	}
}