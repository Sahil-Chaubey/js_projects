var dealersum = 0;
var yourSum = 0;

var dearAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

var canHit = true; // allows the player to draw while your sum is less then or equal to 21

window.onload = function(){
    buildDeck ();
    shuffleDeck ();
    startGame ();
}

function buildDeck(){
    let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let types = ['C', 'D', 'H', 'S'];
    deck = [];

    for(let i=0; i<types.length; i++){
        for(let j =0; j< values.length; j++){
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C ......
        }
    }
    //console.log(deck);
}

function shuffleDeck (){
    for (let i =0; i< deck.length; i++){
        let j = Math.floor(Math.random()*deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}


function startGame (){
    hidden =deck.pop();
    dealersum += getValue(hidden);
    dearAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealersum);

    while (dealersum < 17){
        // <img>
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealersum += getValue(card);
        dearAceCount += checkAce(card);
        document.getElementById('dealer-cards').append(cardImg);

    }
    console.log(dealersum);

    for(let i =0 ; i<2 ;i++){
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById('your-cards').append(cardImg);

    }

    console.log(yourSum);

    document.getElementById("hit").addEventListener('click', hit);
    document.getElementById("stay").addEventListener('click', stay);



}

function hit (){
    if(!canHit){
        return;
    }
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById('your-cards').append(cardImg);

    if(reduceAce(yourSum, yourAceCount) > 21){
        canHit = false;
    }

    
}


function stay (){
    dealersum = reduceAce(dealersum, dearAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById('hidden').src = "./cards/" + hidden + ".png";

    let message = "";

    if (yourSum > 21){
        message = "You lose !"
    }
    else if (dealersum > 21){
        message = "You Win !"
    }
    // both you and the deal have the sum of less then or equal to 21 

    else if (yourSum == dealersum){
        message = "Tie!"
    }
    else if (yourSum > dealersum){
        message = "You Win!"
    }
    else if (yourSum < dealersum){
        message = "You lose!"
    }
    document.getElementById('dealer-sum').innerText = dealersum;
    document.getElementById('your-sum').innerText = yourSum;
    document.getElementById("results").innerText = message;
}

function getValue (card){
    let data = card.split("-") //"4-c" -> ["4", "C"]
    let value = data[0]

    if (isNaN(value)){
        if(value == "A"){
            return 11;
        }
        return 10 ;
    }

    return parseInt(value);
}

function checkAce (card){
    if(card[0]== "A"){
        return 1;
    }
    else {
        return 0;
    }
}

function reduceAce(playerSum , playerAceCount){
    while (playerSum > 21 && playerAceCount > 0 ){
        playerSum -= 10;
        playerAceCount -=1;
    }
    return playerSum;
}