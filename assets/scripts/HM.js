var DICTIONARY = ['Apple', 'Pikachu', 'Orange', 'Banana']; // This is text BANK where we getting our words from


//All of this code is about drawing hangMan , I borrowed it ! 
// from here 
//http://tutorials.codebar.io/examples/hangman-canvas/index.html
var canvas;
var contedxt;

function draw() {
	clearCanvas();
	setColor('#000000');
	setLineWidth(20);


};

function clearCanvas() {
	canvas.width = canvas.width;
};

function setColor(color) {
	context.strokeStyle = color;

};

function setLineWidth(width) {
	context.lineWidth = width;

}

function drawGallows() {
	context.strokeStyle = '#ff0000';
	context.beginPath();
	context.moveTo(350, 450);
	context.lineTo(10, 450);
	context.lineTo(70, 450);

	context.lineTo(70, 10);
	context.lineTo(200, 10);
	context.lineTo(200, 50);
	context.stroke();
};

function drawHead() {
	context.beginPath();
	context.arc(200, 100, 50, 0, Math.PI * 2, true);
	context.closePath();
	context.lineWidth = 4;
	context.stroke();
};

function drawBody() {
	context.beginPath();
	context.moveTo(200, 150);
	context.lineTo(200, 300);
	context.stroke();
};

function drawRightHand() {
	context.beginPath();
	context.moveTo(200, 170);
	context.lineTo(150, 250);
	context.stroke();
};

function drawLeftHand() {
	context.beginPath();
	context.moveTo(200, 170);
	context.lineTo(250, 250);
	context.stroke();
};

function drawRightFoot() {
	context.beginPath();
	context.moveTo(200, 300);
	context.lineTo(150, 380);
	context.stroke();
};

function drawLeftFoot() {
	context.beginPath();
	context.moveTo(200, 300);
	context.lineTo(250, 380);
	context.stroke();
};

$(document).ready(function() {
	canvas = $('#hangman')[0];
	context = canvas.getContext("2d");


});



var hangMan = { // This is our global where we store Beginning of the game 

	guessed: [], // array og guessed letters
	livesLeft: 0, // lives before loosing || winning
	result: [], // this is out word that been convertet into array of '_'
	looses: 0, // loosing score 
	wins: 0, // winning score 



	newGame: function() {
		setTimeout(document.getElementById('audio5').play(), 5000); // start of the game 
		this.complete = false; // game status 
		this.currentWord = DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)]; // pick a random word from BANK 
		this.currentWord = this.currentWord.toLowerCase(); // bring word to lower case 
		this.result = " "; // this is out word that been convertet into array of '_'
		this.guessed = []; // array og guessed letters IN  CURRENT GAME!
		this.livesLeft = 8; // lives before loosing || winning IN  CURRENT GAME!


		// displaying user guessed letter and lives to default values 
		document.getElementById('userGuess').innerHTML = this.guessed;
		document.getElementById('lives').innerHTML = this.livesLeft;

		// document.getElementById('pcWord').innerHTML = this.currentWord; // this uncommented will place word that we have to guess 

		for (i = 0; i < this.currentWord.length; i++) {
			this.result = "_" + this.result;
			document.getElementById('wordUp').innerHTML = this.result;

		}
		return this.result; // place the word as array of "_" ; 
	},



	rightLetter: function(letterToCheck) { // if Letter to check matches the one from the word we do this
		for (var i = 0; i < this.currentWord.length; i++) {

			if (this.currentWord[i] === letterToCheck) {

				var word = this.result.split(''); // replace the ''
				word[i] = letterToCheck;
				this.result = word.join(''); // spaps it with correct letter at the correct position of the word 
				document.getElementById('wordUp').innerHTML = this.result; // adds it to the array of '_'

				document.getElementById('audio3').play();
				console.log("Letter matched at position " + i); // this is how I check at witch position letter matches! 


			}


			if (this.result.indexOf('_') < 0) { // if array of '_' doesnt have any of '_' left game WON! 
				console.log('You are winner! ')
				document.getElementById('audio2').play();
				this.wins++; // ads winning score in THIS current game 
				clearCanvas(); // clearing hangman pic of canvas
				document.getElementById('wins').innerHTML = this.wins; // updates winn score in HTML 
				this.complete = true; // game complete 

				setTimeout("hangMan.newGame()", 2000);

				// restart THIS game , not all game! 

			}
		}
	},

	wrongLetter: function(letterToCheck) { // if letter does not match this function is going

		this.livesLeft--; // lifes are going down 
		document.getElementById('lives').innerHTML = this.livesLeft; // updates life score 
		switch (this.livesLeft) { // switch statement works while we put wrong letter and adds more HangMan picture + adds some sounds ! 
			case this.livesLeft = 7:
				document.getElementById('audio7').play();
				drawGallows();
				break;
				
			case this.livesLeft = 6:
				document.getElementById('audio6').play();
				drawHead();
				break;
			case this.livesLeft = 5:
				document.getElementById('audio7').play();
				drawBody();
				break;
			case this.livesLeft = 4:
				document.getElementById('audio4').play();
				drawRightHand();
				break;
			case this.livesLeft = 3:
				drawLeftHand();
				document.getElementById('audio6').play();
				break;
			case this.livesLeft = 2:
				document.getElementById('audio9').play();
				drawRightFoot();
				break;
			case this.livesLeft = 1:
				drawLeftFoot();
				document.getElementById('audio7').play();
				break;
			case this.livesLeft = 0:

				this.livesLeft = 8
				this.looses++;
				document.getElementById('looser').innerHTML = this.looses;
				document.getElementById('audio1').play();
				setTimeout("clearCanvas()", 2000);
				setTimeout("hangMan.newGame()", 2000); // if lives are 0 it starts new THIS game ! 
				break;
			default:
				hangMan.newGame()
				break;

		}


	},



	checkGuessedLetter: function(letterToCheck, result) { // function that checks if letter right! 

		if (this.guessed.indexOf(letterToCheck) >= 0) { // indexOF means word in THIS current game has the letter that matches once ore more times in the word 
			return
		}

		this.guessed.push(letterToCheck); // push the letter to the guessed letters 


		document.getElementById('userGuess').innerHTML = this.guessed;

		if (this.currentWord.indexOf(letterToCheck) > -1) { // if you push letter twice nothing is going to happened

			hangMan.rightLetter(letterToCheck); // if letter matches it will take to the function  for matchhing letter 

			console.log("Letter Matched!");
			document.getElementById('audio3').play();
		} else {
			hangMan.wrongLetter(letterToCheck); // if letter does not match iet will take you to the wrong letter with hangman pic and etc.


			console.log("Letter Doesnt Match!")



		}


	}



};
hangMan.newGame(); // takes object hangman to begin the game! 

document.onkeyup = function(event) { // for input fron keyboard! 


	if (event.key.match(/^[A-Za-z]$/)) { // ONLY ABC letters! 
		var letterToCheck = String.fromCharCode(event.keyCode).toLowerCase();
		console.log(letterToCheck);
		hangMan.checkGuessedLetter(letterToCheck); // passes letter varriable to the object! 
	}

}