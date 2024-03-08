var gameControl = document.getElementById('gameControl');
var startGame = document.getElementById('startGame');
var game = document.getElementById('game');
var actions = document.getElementById('actions');
var score = document.getElementById('score');
var gameData = {
    dice: ["1dice.jpg", "2dice.jpg", "3dice.jpg", "4dice.jpg", "5dice.jpg", "6dice.jpg"],
    players: ["player1", "player2"],
    score: [0, 0],
    roll1: 0,
    roll2: 0,
    rollSum: 0,
    index: 0,
    gameEnd: 29
};
gameControl.addEventListener('click', function () {
    gameData.index = Math.round(Math.random());
    gameControl.innerHTML = "<h2>The Game has Started<h2>";
    gameControl.innerHTML += '<button id="quit">Do you want to quit?</button>';
    document.getElementById('quit').addEventListener('click', function () {
        location.reload();
    });
    setUpTurn();
});
function setUpTurn() {
    game.innerHTML = `Roll the dice for the ${gameData.players[gameData.index]}`;
    actions.innerHTML = '<button id="roll">Roll the Dice</h2>';
    document.getElementById('roll').addEventListener('click', function () {
        throwDice();
    });
}
function throwDice() {
    actions.innerHTML = "";
    gameData.roll1 = Math.floor(Math.random() * 6) + 1;
    gameData.roll2 = Math.floor(Math.random() * 6) + 1;
    game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
    game.innerHTML += `<img id="imgDice" src="${gameData.dice[gameData.roll1 - 1]}">`;
    game.innerHTML += `<img id="imgDice" src="${gameData.dice[gameData.roll2 - 1]}">`;
    gameData.rollSum = gameData.roll1 + gameData.roll2;
    if (gameData.rollSum === 2) {
        game.innerHTML += "<p>Oh snap!Snake eyes!</p>";
        gameData.score[gameData.index] = 0;
        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        setTimeout(setUpTurn, 2000);
    }
    else if (gameData.roll1 == 1 || gameData.roll2 == 1) {
        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        game.innerHTML = `<h2>you rolled a 1,switching to ${gameData.players[gameData.index]}</h2>`;
        setTimeout(setUpTurn, 2000);
    }
    else {
        gameData.score[gameData.index] += gameData.rollSum;
        actions.innerHTML = "<button id=roll>Roll again</button> or <button id=pass>Pass</button>";
        document.getElementById('roll').addEventListener('click', function () {
            setUpTurn();
        });
        document.getElementById('pass').addEventListener('click', function () {
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setUpTurn();
        });
        checkWinning();
    }
}
function checkWinning() {
    if (gameData.score[gameData.index] > gameData.gameEnd) {
        score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;
        actions.innerHTML = "";
        document.getElementById('quit').innnerHTML = "Start a new game";
    }
    else {
        score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]} is ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} is ${gameData.score[1]}</strong></p>`;
    }
}
