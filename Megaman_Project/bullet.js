let bullet = {
	x: 100, // Starting coordinate for the x-axis
	y: 326.5, // Starting coordinate for the y-axis
	diamX: 15, // Diameter of the width
	diamY: 8, // Diameter of the height
	speed: 3.5, // The rate of speed the bullet will travel
	shootButton: false, // Shoot key pressed value
	// Function will display the bullet on the screen
	display: function() {
		strokeWeight(3); // Outline's the thickness of the bullet
		fill("yellow"); // The color the shape will be
		ellipse(this.x, this.y, this.diamX, this.diamY); // Ellipse's x, y, width, and height based on the values stored in the bullet object's attributes

		this.moveBullet(); // Uses the method stored in bullet object to cause the bullet to move
	},
	// This will cause the bullet to move once it's been shot
	moveBullet: function() {
		this.x += this.speed;
		this.resetBullet(); // Will reset the position of the bullet once it goes out of bounds
	},
	// Resets the position of the bullet if out of bounds
	resetBullet: function() {
		// 
		if (this.x > width) {
			this.x = megaman.megamanX;
			this.speed = 0;
		}
	}
}