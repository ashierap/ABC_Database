var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;
var score = 0; // Added score variable

var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};
var apple = {
  x: 320,
  y: 320
};
var gameOverScreen = document.getElementById('gameOver');
var restartButton = document.getElementById('restart');
var exitButton = document.getElementById('exit');
var finalScoreDisplay = document.getElementById('finalScore');
var highScoreDisplay = document.getElementById('highScore');
var leaderboardButton = document.getElementById('leaderboardButton');
var leaderboardDisplay = document.getElementById('leaderboardDisplay');
var animationId;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var leaderboard = [];

function drawScore() {
  context.fillStyle = 'white';
  context.font = '20px Arial';
  context.fillText('Score: ' + score, 10, 20);
}

function drawHighScore() {
  context.fillStyle = 'white';
  context.font = '20px Arial';
  context.fillText('Personal High Score: ' + highScore, 10, 50);
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  context.fillStyle = 'green';
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;

      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;

      // Increase the score when the snake eats an apple
      score += 10;
    }

    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        showGameOverScreen();
      }
    }
  });

  // Display the score on the canvas
  context.fillStyle = 'white';
  context.font = '20px Arial';
  context.fillText('Score: ' + score, 10, 20);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

function showGameOverScreen() {
  // Add the user's score to the leaderboard
  leaderboard.push({ username: 'Player', score: score });

  // Sort the leaderboard by score in descending order
  leaderboard.sort((a, b) => b.score - a.score);

  // Display the leaderboard
  console.log('Leaderboard:');
  for (var i = 0; i < leaderboard.length; i++) {
    console.log(`${i + 1}. ${leaderboard[i].username}: ${leaderboard[i].score}`);
  }


function resetGame() {
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;
  score = 0;

  // Start the game loop again
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
