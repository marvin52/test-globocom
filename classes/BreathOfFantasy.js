class BreathOfFantasy {
 
    constructor(){
        this.playerNameRegex = /([\w]+)\s([0-9]+)\s([0-9]+)$/m;

        this.players = {
            one: { name: '', energy: null, power: null },
            two: { name: '', energy: null, power: null }
        }
        
        this.round = 1;
        this.question = _ => `\nEntre o ${_} personagem no seguinte formato:\n<nome> <energia> <poder> Ex.: Paulo 100 30\n`;
    }


    /**
     * Returns a setPlayer string question based no playerNumber
     * @param {int} playerNumber 
     * @returns {string}
     */
    getPlayerQuestion(playerNumber){
        return playerNumber === 1 ? this.question('primeiro') : this.question('segundo')
    }


    /**
     * Get params from STDIN entry and add player.
     * When playerNumber is equals to 1, add player one. 
     * When playerNumber is different from 1, add player two. 
     * @param {int} playerNumber 
     * @param {string} entry
     * @returns {boolean}
     */
    setPlayer(playerNumber, entry){
        try {
            let player = playerNumber === 1 ? this.players.one : this.players.two
            let regexEntry = entry.match(this.playerNameRegex);
            
            // Check if entry is valid
            if(regexEntry && entry.split(` `).length === 3){

                let [ fullEntry, name, energy, power ] = regexEntry;
                // Check if energy and power are greater than 0
                if(parseInt(energy) > 0 && parseInt(power) > 0){
                    // Set player infos
                    player.name = name;
                    player.energy = parseInt(energy);
                    player.power = parseInt(power);

                    console.log(`\n${playerNumber===1?'Primeiro':'Segundo'} jogador definido \n* Name  : ${player.name}\n* Energy: ${player.energy}\n* Power : ${player.power}\n`);

                    // Return status true if player is setted up
                    return { status: true, errorMessage: null, player }
                }
                return { status: false, errorMessage: `\nErro! O valor de energia e poder devem ser maior que zero!\n`}
            }
            // Return status false if player isn't setted up
            return { status: false, errorMessage: `\nErro! Parece que você não digitou no formato correto. Tente novamente!\n` }
        } catch(e) {
            return { status: false, errorMessage: `\nErro! Tente novamente!\n` }
        }
    }


    /**
     * Returns a random number in between the min and max range
     * @param {object} range={min, max}
     * @returns {int}
     */
    getRandomNumber({min=0, max=100}){
        return Math.floor(Math.random() * max) + min 
    }


    /**
     * Start the battle invoking the rounds method
     * @param {function} callback
     * @param {function} randomNumber returns a random number
     * @param {int} delayTime delay between rounds
     */
    startBattle(callback, grn = this.getRandomNumber, delayTime = 3500){
        let { one, two } = this.players
        console.log(`O jogo começou!`);
        console.log(`Batalha entre ${one.name} e ${two.name}`);

        // Delay to start of 500 miliseconds
        setTimeout(_ => {
            this.rounds( grn, delayTime )
                    .then(attackResult => {
                        if(callback) callback(attackResult);
                    });
        }, 500);
    }


    /**
     * Initialize the rounds and resolve when the game is done
     * @param {function} randomNumber returns a random number
     * @param {int} delayTime delay between rounds
     * @returns {Promise}
     */
    rounds( randomNumber = this.getRandomNumber, delayTime = 3500){

        let random = randomNumber({ min: 0, max: 100 });

        return new Promise( ( res, rej ) => {

            if(this.players.one.energy !== null && this.players.two.energy !== null){
                // Delay of 3500 miliseconds between rounds
                setTimeout( _ => {
                    let attacker, victim, _round = this.round % 2 !== 0;
                    
                    // Player one atack when round is odd
                    attacker = _round ? this.players.one : this.players.two;
                    victim   = _round ? this.players.two : this.players.one;
                    
                    let attackResult = this.playerAttack({ attacker, victim, random });
                    this.round++;
                    
                    // If the battle is finish, resolve the Promise
                    if(attackResult.finish){
                        res(attackResult);
                    } else {
                        this.rounds(randomNumber, delayTime)
                                .then( attackRes => res(attackRes) );
                    }
                }, delayTime);
            } else {
                rej(new Error('Error! Check if playerOne and playerTwo are setted!'));
            }
        });
    }


    /**
     * Calculate the damage of the atack based in a random number 
     * @param {object} obj={attacker, victim, random} 
     */
    playerAttack({ attacker, victim, random=0}){
        let [ message, damage ] = [ '', 0 ];
        
        console.log(`\n\n-----[RODADA ${this.round}]-----`);
        console.log(`\n-> ${attacker.name} atacou ${victim.name}!`);
        console.log(`* D100: ${random}`);
        
        switch(true){
            case random >= 0 && random <= 15:
                message = `* Errou -${damage} HP`;
            break;
            case random >= 16 && random <= 70:
                damage = parseInt(attacker.power / 3);
                victim.energy = victim.energy - damage;
                message = `* Normal -${damage} HP`;
            break;
            case random >= 71 && random <= 96:
                damage = parseInt( ( attacker.power / 3 ) *  1.2 );
                victim.energy = victim.energy - damage;
                message = `* Sorte!!! -${damage} HP`;
            break;
            case random >= 97 && random <= 100:
                damage = parseInt( ( attacker.power / 3 ) *  2 );
                victim.energy = victim.energy - damage;
                message = `* Crítico! -${damage} HP`;
            break;
        }

        if(victim.energy < 0)
            victim.energy = 0;

        console.log(message);
        console.log(`-> ${victim.name} ficou com ${victim.energy} de energia restante!\n`);

        let attackResult = {
            finish: false,
            winner: attacker,
            looser: victim,
            round: this.round
        };

        if(victim.energy <= 0){
            console.log(`\nJogo acabou! O vencedor foi ${attacker.name} com ${attacker.energy} de HP restante!\n`);
            attackResult.finish = true;
        }

        return attackResult;
        
    }


}

module.exports = BreathOfFantasy