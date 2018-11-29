const readline = require('readline');
const Bull = require('./bull');
var fs = require('fs');
var path = process.cwd();

function newReader() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

function play(count, game) {
    currentPlayer = count % 2 + 1;
    let r1 = newReader();
    r1.question(`Player ${currentPlayer} guess: `, (answer) => {
        r1.close();
        res = game.guess(currentPlayer, answer);
        console.log(res);
        if (res.bulls == 4) {
            console.log(`Player ${currentPlayer} wins!`);
            return;
        } else {
            play(++count, game);
        }
    });

}


function single(currentPlayer, game, guessNum){
    let r1 = newReader();
    r1.question(`Player ${currentPlayer} guess# ${guessNum}: `, (answer) => {
        r1.close();
        res = game.guess(currentPlayer, answer);
        console.log(res);
        if (res.bulls == 4) {
            console.log(`Player ${currentPlayer}, you've guessed the number in ${guessNum} guesses! .`);
            return;
        } else {
            single(currentPlayer, game, guessNum+1);
        }
    });
}



function pvp(){
    let r1 = newReader();
    r1.question('Player 1 number: ', (num1) => {
        r1.close();
        console.clear();
        let r2 = newReader();
        r2.question('Player 2 number: ', (num2) => {
            r2.close();
            console.clear();
            play(0, new Bull(num1, num2));
        });

    });
}

function asyncTimeout(fun, time){
    return new Promise(function(resolve, reject) {
            setTimeout(function() {
            fun();
            resolve();
        }, time);
    });
}

async function menu(){
    if(process.argv.length > 2){
        let num1 = (fs.readFileSync("p1num.txt")).toString();
        let num2 = (fs.readFileSync("p2num.txt")).toString();
        
        switch(process.argv[2]){
            case "1": case "2": single(parseInt(process.argv[2], new Bull(num1, num2), 1));
                break;
            case "single": single(1, new Bull(""), 1);
                break;
            default:console.log("invalid option");
                
        }
    
    }else{
    
        console.log("Welcome to bull, ladies");
        await asyncTimeout(_=>console.log("and gentlemen."), 500);
        await asyncTimeout(_=>{}, 500);
        console.log("Enter a game mode. \n1. Singleplayer \n2. PVP, random number. \n3. PVP, custom number \n4. PVE");
    
        let reader = newReader();
        reader.question("Answer: ", ans=>{
            if(!Number.isInteger(parseInt(ans))){
                menu();
            }else{
                switch (ans) {
                    case 1:
                        single(1, new Bull(""), 1);
                        break;
                    case 2:
                        
                        break;
                    case 3:
                        start();
                        break;
                    default:
                        // code
                }
            }
        })
        
    }
}


if (typeof require != 'undefined' && require.main == module) {
    menu();
}