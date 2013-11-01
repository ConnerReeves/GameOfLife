var _  = require('lodash'),
    fs = require('fs');

//Initialize game board to empty array
var gameBoard = [];

//Loads game board file into array format
//Columns separated by single space, rows separated by new line
exports.loadFromFile = function(fileName) {
    try { var boardFile = fs.readFileSync(fileName);  }
    catch(err) { throw new Error('File Load Failed'); }
    var newBoard = _.map(boardFile.toString().split('\n'), function(row) {
        return _.map(row.split(' '), function(stateString) {
            return parseInt(stateString, 2);
        });
    });
    if (newBoard.length === 1 && newBoard[0].length === 1 && isNaN(newBoard[0][0])) {
        throw new Error('Empty Board');
    } else if (!_.all(_.flatten(newBoard), function(val) {
        return val === 0 || val === 1; //All entries are valid
    })) {
        throw new Error('Invalid Entries')
    } else if (!_.all(newBoard, function(row) {
        return row.length === newBoard[0].length;
    })) {
        throw new Error('Invalid Dimensions');
    } else { //New board is valid, replace existing with new
        gameBoard = newBoard;
        return this;
    }
};

//Overrides existing game board with new generation based on each
//nodes return value from the 'getNextNodeState' helper function
exports.proceedGeneration = function() {
    gameBoard = _.map(gameBoard, function(row, rowIndex) {
        return _.map(row, function(state, colIndex) {
            return _getNextNodeState(rowIndex, colIndex);
        });
    });
    return this;
};

//Displays the board to the user in the same format as the input file
exports.display = function() {
    console.log(_.map(gameBoard, function(row) {
        return (row.join(' '));
    }).join('\n') + '\n');
}

//Returns the array representation of the game board
exports.getBoard = function() {
    return gameBoard;
}

//Private function which gets the next state of the node at the provided
//index based on the node's current state and its live neighbor count
var _getNextNodeState = function(rowIndex, colIndex) {
    var liveNeighborCount = 0;  
    if (gameBoard[rowIndex - 1] !== undefined) {
        if (gameBoard[rowIndex - 1][colIndex - 1]) liveNeighborCount++;  //Upper-Left
        if (gameBoard[rowIndex - 1][colIndex]) liveNeighborCount++;      //Upper-Mid
        if (gameBoard[rowIndex - 1][colIndex + 1]) liveNeighborCount++;  //Upper-Right
    }
    
    if (gameBoard[rowIndex][colIndex - 1]) liveNeighborCount++;          //Mid-Left
    if (gameBoard[rowIndex][colIndex + 1]) liveNeighborCount++;          //Mid-right
    
    if (gameBoard[rowIndex + 1] !== undefined) {
        if (gameBoard[rowIndex + 1][colIndex - 1]) liveNeighborCount++;  //Lower-Left
        if (gameBoard[rowIndex + 1][colIndex]) liveNeighborCount++;      //Lower-Mid
        if (gameBoard[rowIndex + 1][colIndex + 1]) liveNeighborCount++;  //Lower-Right
    }

    if (gameBoard[rowIndex][colIndex] === 0) {                           //Currently dead
        return (liveNeighborCount === 3) ? 1 : 0;                        //Revive if live neighbors is exactly 3
    } else {                                                             //Currently alive
        return (liveNeighborCount < 2 || liveNeighborCount > 3) ? 0 : 1; //Kill if under or overpopulated
    }
};