var _         = require('lodash'),
    gameBoard = require('./gameBoard');

//Process command line arguments
if (process.argv.length < 3) {
    throw new Error('Use "node app [fileName.txt] [generationsToProcess (optional)]');
} else {
    //Load the gameboard from the provided file name and display the initial version
    gameBoard.loadFromFile(process.argv[2]);
    console.log('Initial Game Board:');
    gameBoard.display();

    //Process the provided number of generations, or a single generation by default
    var generationsToProcess = (process.argv.length > 3) ? parseInt(process.argv[3], 10) || 1 : 1;
    _.each(_.range(1,generationsToProcess + 1), function(generationNumber) {
        //Display the board after each new generation is processed
        console.log('Generation ' + generationNumber + ':');
        gameBoard.proceedGeneration().display();
    });
}