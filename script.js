const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const resetScore = document.getElementById('reset-score');
const autoPlay = document.querySelector('.auto-play');
const matchResult = document.querySelector('.match-result');
let result = '';
let finalResult = document.getElementById('final-result');
const resetDiv = document.querySelector('.reset-div');

rock.addEventListener('click', () => {
    playGame('rock');

});
paper.addEventListener('click', () => {
    playGame('paper');
})
scissors.addEventListener('click', () => {
    playGame('scissors');
})
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    }
    else if (event.key === 'p') {
        playGame('paper');
    }
    else if (event.key === 's') {
        playGame('scissors');
    }  
    else if (event.key === 'a') {
        checkAutoPlay();
    }
    else if (event.key === 'Backspace') {
        resetDiv.innerHTML = '<p class="reset-text">Are you sure you want to reset the score?</p><button class="yes-button">Yes</button><button class="no-button">No</button>';
        const yesButton = document.querySelector('.yes-button');
        const noButton = document.querySelector('.no-button');

        clearInterval(intervalId);
        autoPlay.textContent = 'Auto play'; 
        isAutoPlaying = false;

        yesButton.addEventListener('click', () => {
            whenResetScore();    
        })
        
        noButton.addEventListener('click', () => {
            resetDiv.innerHTML = '';
        })
    } 
    else if (event.key === 'Enter') {
        whenResetScore();    
    }
    else if (event.key === 'Escape') {
        resetDiv.innerHTML = '';
    }
})

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

function randomByPc() {
    let pc = '';
    const randomGenerator = Math.random();
    if (randomGenerator >= 0 && randomGenerator < 1/3) {
        pc = 'rock';
    }

    else if (randomGenerator >= 1/3 && randomGenerator < 2/3) {
        pc = 'paper';
    }

    else if (randomGenerator >= 2/3 && randomGenerator <= 1) {
        pc = 'scissors';
    }
    return pc;
}

function playGame(playerMove) {
    const computerMove = randomByPc();
    document.querySelector('.moves').classList.add('moves-clicked');
    finalResult.classList.remove('final-result-when-reset');

    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'It\'s a tie.';
            changeIcon('assets/rock-emoji.png', 'assets/rock-emoji.png');
        }
    
        else if (computerMove === 'paper') {
            result = 'You lose.';
            changeIcon('assets/rock-emoji.png', 'assets/paper-emoji.png');
        }
    
        else if (computerMove === 'scissors') {
            result = 'You won.';
            changeIcon('assets/rock-emoji.png', 'assets/scissors-emoji.png');

        }
    }
    
    else if (playerMove === 'paper'){
        if (computerMove === 'rock') {
            result = 'You won.'
            changeIcon('assets/paper-emoji.png', 'assets/rock-emoji.png');
        }

        else if (computerMove === 'paper') {
            result = 'It\'s a tie.'
            changeIcon('assets/paper-emoji.png', 'assets/paper-emoji.png');
        }

        else if (computerMove === 'scissors') {
            result = 'You lose.';
            changeIcon('assets/paper-emoji.png', 'assets/scissors-emoji.png');
        }
    }

    else if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.'
            changeIcon('assets/scissors-emoji.png', 'assets/rock-emoji.png');
        }
        else if (computerMove === 'paper') {
            result = 'You won.';
            changeIcon('assets/scissors-emoji.png', 'assets/paper-emoji.png');
        }
    
        else if (computerMove === 'scissors') {
            result = 'It\'s a tie.';
            changeIcon('assets/scissors-emoji.png', 'assets/scissors-emoji.png');
        }    
    }

    if (result === 'You won.') {
        score.wins += 1;
    }
    
    else if (result === 'You lose.') {
        score.losses += 1;
    }

    else if (result === 'It\'s a tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    matchResult.classList.remove('match-result-when-reset');
    matchResult.textContent = result;
    finalResult.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
}

resetScore.addEventListener('click', () => {
    resetDiv.innerHTML = '<p class="reset-text">Are you sure you want to reset the score?</p><button class="yes-button">Yes</button><button class="no-button">No</button>';
    const yesButton = document.querySelector('.yes-button');
    const noButton = document.querySelector('.no-button');

    clearInterval(intervalId);
    autoPlay.textContent = 'Auto play'; 
    isAutoPlaying = false;

    yesButton.addEventListener('click', () => {
        whenResetScore();    
    })
    
    noButton.addEventListener('click', () => {
        resetDiv.innerHTML = '';
    })
}) 

let isAutoPlaying = false;
let intervalId;

autoPlay.addEventListener('click', () => {
    checkAutoPlay();
})

function checkAutoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(function() {
            const playerMove = randomByPc();
            playGame(playerMove);
        }, 1000); 
        autoPlay.textContent = 'Stop playing';   
        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalId);
        autoPlay.textContent = 'Auto play';   
        isAutoPlaying = false;
    }
}

function changeIcon(myIconPath, computerIconPath) {
    document.querySelector('.player-icon').src = myIconPath;
    document.querySelector('.computer-icon').src = computerIconPath;   
}

function whenResetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    matchResult.classList.add('match-result-when-reset');
    finalResult.classList.add('final-result-when-reset');
    finalResult.textContent = 'Start the game';
    document.querySelector('.moves').classList.remove('moves-clicked');
    resetDiv.innerHTML = '';
}