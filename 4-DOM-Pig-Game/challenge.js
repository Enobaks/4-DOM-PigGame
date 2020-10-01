/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gameplaying;
gameplaying = true;
init();
var lastDice;
var targetScore;


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gameplaying) {
        // Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //  Display Result
        document.getElementById('diceOne').style.display = 'block';
        document.getElementById('diceTwo').style.display = 'block';
        document.getElementById('diceOne').src = 'dice-' + dice1 + '.png';
        document.getElementById('diceTwo').src = 'dice-' + dice2 + '.png';

        // if (dice === 6 && lastDice === 6) {
        //     //player looses score
        //     scores[activePlayer] = 0;
        //     nextPlayer(); 
        // }else 
        if (diceOne !== 1 && diceTwo !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            nextPlayer();
        }
        // lastDice = dice;
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gameplaying) {
        // Add current score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

       // Set new Winning score with input
        targetScore = document.querySelector('#inputText').value;
        var input;

        if (targetScore) {
            input = targetScore;
        }else {
            input = 20;
        }
         // Check if the player won the game
        if (scores[activePlayer] >= input) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
             document.getElementById('diceOne').style.display = 'none';
             document.getElementById('diceTwo').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameplaying = false;
        }else {
            //next player
            nextPlayer();
        }
    }
    
});

function nextPlayer() {
    if (activePlayer == 0) {
        activePlayer = 1;
        roundScore = 0;
    }else {
        activePlayer = 0;
    }
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('diceOne').style.display = 'none';
    document.getElementById('diceTwo').style.display = 'none';

};

function init() {
   
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gameplaying = true;
    document.getElementById('diceOne').style.display = 'none';
    document.getElementById('diceTwo').style.display = 'none';

    document.getElementById('score-0').innerHTML = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2'; 
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', function(){
    init();
});


