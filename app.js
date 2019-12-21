const readline = require('readline');
const BreathOfFantasy = require('./classes/BreathOfFantasy.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const game = new BreathOfFantasy();

function start() {
    addPlayer(1)
    .then( _ => addPlayer(2) )
    .then(_ => {
        game.startBattle( attackResult => { 
            rl.close();
         });
    });
}

function addPlayer(playerNumber){
    return new Promise((res,rej)=>{
        this.question = function(){
            rl.question(game.setPlayerQuestion(playerNumber), entry => {
                if(game.setPlayer(playerNumber, entry)){
                    res(entry)
                } else {
                    console.log(`\nErro! Tente novamente!\n`);
                    this.question();
                }
            })
        };
        this.question();
    });
}


start();