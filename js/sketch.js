/* Global variables */
const step = 50;
const cWidth = 1175 * 0.9 - ((1175 * 0.9) % step);
const cHeight = 749 * 0.9 - ((749 * 0.9) % step);
const units = [];

let snake;
let food;
let score = 0;
const speed = 50;

let highScore = localStorage.getItem("high-score");
document.getElementById("high-score").innerText = highScore ?? 0;

function updateScore() {
  score++;
  document.getElementById("score").innerText = score;
  let highScore = localStorage.getItem("high-score");
  if (highScore == null || highScore < score) {
    document.getElementById("high-score").innerText = score;
    localStorage.setItem("high-score", score);
  }
}

function spawnFood() {
  const rndCol = Math.floor(Math.random() * (cWidth / step));
  const rndRow = Math.floor(Math.random() * (cHeight / step));
  food = new Unit(rndCol, rndRow);
}

function spawnSnake() {
  const rndCol = Math.floor(Math.random() * (cWidth / step));
  const rndRow = Math.floor(Math.random() * (cHeight / step));
  snake = new Unit(rndCol, rndRow);
}

/* Grid Units */
function Unit(column = 0, row = 0) {
  this.column = column + 1;
  this.row = row + 1;
  this.x = step * column;
  this.y = step * row;
  this.draw = function () {
    fill(240);
    stroke(200);
    rect(this.x, this.y, step, step);

    if (snake.column == this.column && snake.row == this.row) {
      fill(255, 0, 0);
      rect(this.x, this.y, step, step);
    }
    if (food.column == this.column && food.row == this.row) {
      fill(255, 0, 255);
      rect(this.x, this.y, step, step);
    }
  };
}

/* Draw empty grid */
function drawGrid() {
  for (let i = 0; i < cWidth / step; i++) {
    for (let j = 0; j < cHeight / step; j++) {
      const u = new Unit(i, j);
      u.draw();
      units.push(u);
    }
  }
}

function getUnit(x, y) {
  let selectedUnit = null;
  units.forEach((unit) => {
    if (x >= unit.x && x < unit.x + step && y >= unit.y && y < unit.y + step) {
      unit.isActive = true;
      selectedUnit = unit;
    }
  });
  return selectedUnit;
}

let snakeDirection = "UP";

function setup() {
  background(240);
  createCanvas(cWidth, cHeight);
  spawnFood();
  spawnSnake();
  setInterval(() => {
    drawGrid();
    moveSnake(snakeDirection);
  }, speed);
}

function moveSnake(direction) {
  if (snake.column == food.column && snake.row == food.row) {
    updateScore();
    spawnFood();
  }

  switch (direction) {
    case "UP":
      if (snake.row > 1) {
        snake.row--;
      }
      break;
    case "DOWN":
      if (snake.row < cHeight / step) {
        snake.row++;
      }
      break;
    case "LEFT":
      if (snake.column > 1) {
        snake.column--;
      }
      break;
    case "RIGHT":
      if (snake.column < cWidth / step) {
        snake.column++;
      }
      break;
  }
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      snakeDirection = "UP";
      break;
    case DOWN_ARROW:
      snakeDirection = "DOWN";
      break;
    case LEFT_ARROW:
      snakeDirection = "LEFT";
      break;
    case RIGHT_ARROW:
      snakeDirection = "RIGHT";
      break;
  }
}
