const readline = require('readline');
const BreathOfFantasy = require('./classes/BreathOfFantasy.js');

const game = new BreathOfFantasy();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function addPlayer(playerNumber){
    return new Promise((res,rej)=>{
        this.question = function(){
            rl.question(game.getPlayerQuestion(playerNumber), entry => {
                let p = game.setPlayer(playerNumber, entry)
                if(p.status){
                    res(entry)
                } else {
                    console.log(p.errorMessage);
                    this.question();
                }
            })
        };
        this.question();
    });
}

function initApp() {
    addPlayer(1)
    .then( _ => addPlayer(2) )
    .then(_ => {
        game.startBattle( attackResult => {
            rl.close();
         });
    });
}


initApp();