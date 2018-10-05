let textTemplate = {
	score: 0, // Holds the value of my score
	// Function that displays the template for my score
	displayScore: function() {
		textSize(30);
		textFont("Verdana");
		textStyle(BOLD);
		fill("black");
		text(`Score: ${this.score}`, 22, 49);
		fill("white");
		text(`Score: ${this.score}`, 19, 46);
	},
	// Function displays the text stage cleared when enemy dies
	displayStageClear: function() {
		textSize(30);
		textFont("Verdana");
		textStyle(BOLD);
		fill("black");
		text(`Stage Cleared`, width / 2 - 100, 200);
		fill("white");
		text(`Stage Cleared`, width / 2 - 103, 200 - 3);
	}
}