module.exports = class Bull{
    
    genRand(){
        let reg = /^(?!.*(.).*\1)\d{4}$/;
        let val;
        while(!reg.test(val)){
            val = Math.floor((Math.random() * 9876) + 123);
            if(val < 1000) val = "0"+val;
            else val = val+"";
        }
        return val;
    }

    calc(num1, num2){
        if (!Array.isArray(num1) || !Array.isArray(num2)) throw "non array parameters exception";
        if(num1.length != 4 || num2.length != 4)throw "invalid array length exception";
        let count = { bulls:0, cows:0};
        let check1 = {}, check2 = {};

        for(let i=0; i<4; i++){
            if (check1.hasOwnProperty(num1[i]) || check2.hasOwnProperty(num2[i])) throw "repeated number exception";
            check1[num1[i]]=1;
            check2[num2[i]]=1;
            if(num1[i] === num2[i])count.bulls++;
            else if(num2.includes(num1[i]))count.cows++;
        }

        return count;
    }

    constructor(playerNumber1, playerNumber2= this.genRand()+""){
        this.playerNumber1 = playerNumber1.split('');
        this.playerNumber2 = playerNumber2.split('');
    }

    guess(player, number){
        number = number.split('');
        if(player == 1)return this.calc(this.playerNumber2, number);
        else return this.calc(this.playerNumber1, number);
    }

}