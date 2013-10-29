var gameBoard = require('./gameBoard');

console.log('Initial Board:');
gameBoard.loadFromFile('rallyExampleBoard.txt').display();

var counter = 0;
setInterval(function() {
	console.log('Generation ' + ++counter + ':');
	gameBoard.proceedGeneration().display();
	if (counter > 6) clearInterval(this);
}, 1000);
