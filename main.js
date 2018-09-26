const readline = require('readline');
const Bull = require('./bull');

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

function start() {
    let r1 = newReader();
    r1.question('Player 1 number: ', (num1) => {
        r1.close();
        let r2 = newReader();
        r2.question('Player 2 number: ', (num2) => {
            r2.close();
            play(0, new Bull(num1, num2));
        });

    });

}

if (typeof require != 'undefined' && require.main == module) {
    start();
}
