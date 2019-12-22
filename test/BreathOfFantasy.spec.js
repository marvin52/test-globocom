const assert = require('assert');
const BreathOfFantasy = require('./../classes/BreathOfFantasy.js');

describe('Testing the BreathOfFantasy game class', function(){

    before(function () {
        //silence the console
        console.log = function () {};
    });

    after(function () {
        //reset console
        delete console.log;
    });

    beforeEach(function(){
        this.game = new BreathOfFantasy();
    });

    it('should add player One with the correct entry and leave player Two with default values', function(){
        let playerNumber = 1; // 1 for player One
        let entry = `nome1 100 20`; // Correct format
        let res = this.game.setPlayer(playerNumber, entry);
        let players = {
            one: res.player,
            two: { name: '', energy: null, power: null }
        }

        // Check if the players object matches
        assert.deepEqual( this.game.players, players );
    })

    it('should add player Two with the correct entry and leave player One with default values', function(){
        let playerNumber = 2; // 2 or any other number for player two
        let entry = `nome2 100 40`; // Correct format
        let res = this.game.setPlayer(playerNumber, entry);
        let players = {
            one: { name: '', energy: null, power: null },
            two: res.player
        }

        // Check if the players object matches
        assert.deepEqual( this.game.players, players );
    })

    it('return false status when you type a string in an invalid format', function(){
        let playerNumber = 1; // Try to set player One
        let entry = `nome2 100 40a`; // Inorrect format
        let res = this.game.setPlayer(playerNumber, entry);

        // Check if the status is false
        assert.ok( !res.status );
    })

    it('Game should end in 13 rounds and the winner must be playerOne only with \'Normal\' hits', function(done){
        let resPlayerOne = this.game.setPlayer(1, `playerOne 100 50`);
        let resPlayerTwo = this.game.setPlayer(2, `playerTwo 100 10`);

        let mockRandomNumber = _ => 50;
        let delayTime = 10; // Change delay time between rounds from 3500 to 10 miliseconds
        let expectedAttackResult = {
            finish: true,
            round: 13,
            looser: { energy: 0, name: 'playerTwo', power: 10 },
            winner: { energy: 82, name: 'playerOne', power: 50 }
        }
        
        // Initialize game
        this.game.rounds( mockRandomNumber, delayTime )
            .then(attackResult => {
                assert.deepEqual(attackResult, expectedAttackResult);
                done()
            });
    })

    it('Game should end in 9 rounds and the winner must be playerOne only with \'Sorte\' hits', function(done){
        let resPlayerOne = this.game.setPlayer(1, `playerOne 100 50`);
        let resPlayerTwo = this.game.setPlayer(2, `playerTwo 100 10`);

        let mockRandomNumber = _ => 80; // Inject mock randomNumber function
        let delayTime = 10; // Change delay time between rounds from 3500 to 10 miliseconds
        let expectedAttackResult = {
            finish: true,
            round: 9,
            looser: { energy: 0, name: 'playerTwo', power: 10 },
            winner: { energy: 84, name: 'playerOne', power: 50 }
        }
        
        // Initialize game
        this.game.rounds( mockRandomNumber, delayTime )
            .then(attackResult => {
                assert.deepEqual(attackResult, expectedAttackResult);
                done()
            });
    })

    it('Game should end in 7 rounds and the winner must be playerOne only with \'Crítico\' hits', function(done){
        let resPlayerOne = this.game.setPlayer(1, `playerOne 100 50`);
        let resPlayerTwo = this.game.setPlayer(2, `playerTwo 100 10`);

        let mockRandomNumber = _ => 99; // Inject mock randomNumber function
        let delayTime = 10; // Change delay time between rounds from 3500 to 10 miliseconds
        let expectedAttackResult = {
            finish: true,
            round: 7,
            looser: { energy: 0, name: 'playerTwo', power: 10 },
            winner: { energy: 82, name: 'playerOne', power: 50 }
        }
        
        // Initialize game
        this.game.rounds( mockRandomNumber, delayTime )
            .then(attackResult => {
                assert.deepEqual(attackResult, expectedAttackResult);
                done()
            });
    })

    it('Promise of method this.game.rounds should rejected because the two player are not bove setted', function(done){
        let resPlayerOne = this.game.setPlayer(1, `playerOne 100 50`);

        let mockRandomNumber = _ => 99; // Inject mock randomNumber function
        let delayTime = 10; // Change delay time between rounds from 3500 to 10 miliseconds
        this.game.rounds( mockRandomNumber, delayTime )
            .then(attackResult => {
                done(new Error('Expected method to reject.'))
            })
            .catch((err) => {
                assert.ok(err instanceof Error);
                done();
            })
            .catch(done);
    })


    it('should initialize the rounds trough startBattle method and return attackResult.finish equals to true', function(done){
        let resPlayerOne = this.game.setPlayer(1, `playerOne 100 50`);
        let resPlayerTwo = this.game.setPlayer(2, `playerTwo 100 10`);
        
        let mockRandomNumber = _ => 80; // Inject mock randomNumber function
        let delayTime = 10; // Change delay time between rounds from 3500 to 10 miliseconds
        
        // Initialize game
        this.game.startBattle(attackResult => {
            assert.ok(attackResult.finish)
            done();
        }, mockRandomNumber, delayTime);
    })

})