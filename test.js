var _         = require('lodash'),
	chai      = require('chai'),
	gameBoard = require('./gameBoard');

chai.should();

describe('gameBoard', function() {
	describe('#loadFromFile', function() {
		it('should throw error in the event of a misconfigured board input file', function() {
			(function () {
				new gameBoard.loadFromFile('misconfiguredBoard.txt');
			}).should.throw(Error);
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
			it('should return the correct next generation for all given examples', function() {
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
