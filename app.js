/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, previousScore1, previousScore2, dice1, dice2, activePlayer, gamePlaying, winningScore;

init();

// EventListener for button in input field
document.getElementById('scoreButton').addEventListener('click', function() {
    winningScore = document.getElementById('winningScore').value;
    document.querySelector('.form-popup').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'block';
    }); 

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random number
        dice1 = Math.floor(Math.random()*6)+1;
        dice2 = Math.floor(Math.random()*6)+1;
        // Math.random() >= 0.5 ? dice = 6 : dice = 2;

        // if two 6 in row, set all scores to zero and change player
        if (dice1 === 6 && dice1 === previousScore1) {
            previousScore1 = 0;
            scores[activePlayer] = 0;
            roundScore = 0;
            displayResults();
            nextPlayer();

        } else if (dice2 === 6 && dice2 === previousScore2) {
            previousScore2 = 0;
            scores[activePlayer] = 0;
            roundScore = 0;
            displayResults();
            nextPlayer();
        } else {
            console.log('not two 6 in row');
            // 3. Update the round if not 1
            if ( dice1 !== 1 && dice2 !== 1) {
                console.log('dice1, dice2: ' + dice1, dice2);
                roundScore += (dice1 + dice2);
                displayResults();
            } else {
                console.log('dice1, dice2: ' + dice1, dice2 + 'roundScore when one dice == 1: ' + roundScore + ' change player');
                roundScore = 0;
                displayResults();
                nextPlayer();
            }
        }
        previousScore1 = dice1;
        previousScore2 = dice2;
    }
});

function displayResults() {
        var dice1DOM = document.querySelector('.dice1');
        var dice2DOM = document.querySelector('.dice2');
        dice1DOM.style.display = 'block';
        dice2DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice1 + '.png';
        dice2DOM.src = 'dice-' + dice2 + '.png';
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
}

function nextPlayer() {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    dice1 = 0;
    dice2 = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    previousScore1 = 0;
    previousScore2 = 0;

    document.querySelector('.form-popup').style.display = 'block';
    document.querySelector('.wrapper').style.display = 'none';

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

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
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});