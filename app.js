/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, previousScore, dice, activePlayer, gamePlaying, winningScore;

init();

// EventListener for button in input field
document.getElementById('scoreButton').addEventListener('click', function() {
    winningScore = document.getElementById('winningScore').value;
    console.log(winningScore);
    document.querySelector('.form-popup').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'block';
    }); 

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random number
        // dice = Math.floor(Math.random()*6)+1;
        Math.random() >= 0.5 ? dice = 6 : dice = 2;
        // if two 6 in row, set all scores to zero and change player
        if (dice === 6 && dice === previousScore) {
            previousScore = 0;
            scores[activePlayer] = 0;
            roundScore = 0;
            displayResults();
            nextPlayer();

        } else {
            // 3. Update the round if not 1
            if ( dice !== 1) {
                roundScore += dice;
                displayResults();
            } else {
                roundScore = 0;
                displayResults();
                nextPlayer();

            }
        }
        previousScore = dice;
    }
});

function displayResults() {
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
}

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    dice = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    previousScore = 0;

    document.querySelector('.form-popup').style.display = 'block';
    document.querySelector('.wrapper').style.display = 'none';

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
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

document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;


        // Update the UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});