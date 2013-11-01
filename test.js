var _         = require('lodash'),
	chai      = require('chai'),
	gameBoard = require('./gameBoard');

chai.should();

describe('gameBoard', function() {
	describe('#loadFromFile', function() {
		it('should throw an error if the file specified cannot be found', function() {
			(function () {
				new gameBoard.loadFromFile('nonExistantBoard.txt');
			}).should.throw('File Load Failed');
		});
		it('should throw an error if an empty input file is specified', function() {
			(function () {
				new gameBoard.loadFromFile('blankBoard.txt');
			}).should.throw('Empty Board');
		});
		it('should throw an error in the event of a misconfigured board input file', function() {
			(function () {
				new gameBoard.loadFromFile('invalidEntriesBoard.txt');
			}).should.throw('Invalid Entries');
		});
		it('should throw an error if the board is not perfectly rectangular (same number of entries in each row', function() {
			(function () {
				new gameBoard.loadFromFile('nonRectangularBoard.txt');
			}).should.throw('Invalid Dimensions');
		});
		it('should return the new board in the event of a successfully loaded board file', function() {
			gameBoard.loadFromFile('spinnerBoard.txt').should.be.a('object')
		});
	});

	describe('#proceedGeneration', function() {
		it('should return the new board after the generation has been proceeded', function() {
			gameBoard.loadFromFile('spinnerBoard.txt');
			gameBoard.proceedGeneration().should.be.a('object');
		});

		describe('#Examples', function() {
			it('should return the correct second generation for all given examples', function() {
				gameBoard.loadFromFile('spinnerBoard.txt');
				gameBoard.proceedGeneration();
				gameBoard.getBoard().should.eql([
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0],
					[0, 1, 1, 1, 0],
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0],
				]);
			
				gameBoard.loadFromFile('rallyExampleBoard.txt');
				gameBoard.proceedGeneration();
				gameBoard.getBoard().should.eql([
					[0, 0, 0, 0, 0], 
					[1, 0, 1, 1, 1], 
					[1, 1, 1, 1, 1], 
					[0, 1, 0, 0, 0], 
					[0, 0, 0, 0, 0]
				]);
			});
		});
	});
});
