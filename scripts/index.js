/********************************* */
// Grid
/********************************* */
const width = 10;
const height = width;
const cellCount = width * height;
const grid = document.querySelector('.grid');

let cells = [];
let snake;

const createGrid = () => {
  for (let index = 0; index < cellCount; index = index + 1) {
    const cell = document.createElement('div');
    grid.appendChild(cell);
    cells.push(cell);
  }
};

/********************************* */
// Snake
/********************************* */
const fruitsOnBoard = [];

class Snake {
  constructor(position) {
    this.headPosition = position;
    this.bodyPositions = [this.headPosition];
    this.size = 1;
    this.x;
    this.y;
    this.intervalId;
    this.intervalTime = 500;
    this.move();
    this.renderPositions(this.bodyPositions);
    this.setCoordinates();
  }

  render(position) {
    cells[position].classList.add('snake');
  }

  remove(position) {
    cells[position].classList.remove('snake');
  }

  isPositionAFruit() {
    const fruits = fruitsOnBoard.map((fruit) => fruit.position);
    return fruits.includes(this.headPosition);
  }

  eatFruit(position) {
    const fruit = fruitsOnBoard.find((fruit) => fruit.position === position);
    const indexOfFruit = fruitsOnBoard.indexOf(fruit);
    fruitsOnBoard.splice(indexOfFruit, 1);
    fruit.eaten();
    this.size = this.size + 1;
    this.increaseSpead();
    renderScore();

    console.log({ intervalTime: this.intervalTime });
  }

  shouldEat() {
    if (this.isPositionAFruit()) {
      this.eatFruit(this.headPosition);
    }
  }

  setBodyPositions() {
    this.bodyPositions.push(this.headPosition);
  }

  setCoordinates() {
    this.x = this.headPosition % 10;
    this.y = Math.floor(this.headPosition / 10);
  }

  moveUp() {
    this.removePositions(this.bodyPositions);
    this.setCoordinates();

    const newPosition = this.headPosition - width;
    const isBelowBorderTop = this.y > 0;

    if (isBelowBorderTop && !this.isBodySnake(newPosition)) {
      this.headPosition = newPosition;
      this.setBodyPositions();
      this.shouldEat();
    } else {
      gameOver();
    }

    this.renderPositions(this.bodyPositions);
  }

  moveRight() {
    this.removePositions(this.bodyPositions);
    this.setCoordinates();

    const newPosition = this.headPosition + 1;
    const isLeftOfBorderRight = this.x < width - 1;

    if (isLeftOfBorderRight && !this.isBodySnake(newPosition)) {
      this.headPosition = newPosition;
      this.setBodyPositions();
      this.shouldEat();
    } else {
      gameOver();
    }

    this.renderPositions(this.bodyPositions);
  }

  moveDown() {
    this.removePositions(this.bodyPositions);
    this.setCoordinates();

    const newPosition = this.headPosition + width;
    const isAboveBorderBottom = this.y < width - 1;

    if (isAboveBorderBottom && !this.isBodySnake(newPosition)) {
      this.headPosition = newPosition;
      this.setBodyPositions();
      this.shouldEat();
    } else {
      gameOver();
    }

    this.renderPositions(this.bodyPositions);
  }

  moveLeft() {
    this.removePositions(this.bodyPositions);
    this.setCoordinates();

    const newPosition = this.headPosition - 1;
    const isRightOfBorderLeft = this.x > 0;

    if (isRightOfBorderLeft && !this.isBodySnake(newPosition)) {
      this.headPosition = newPosition;
      this.setBodyPositions();
      this.shouldEat();
    } else {
      gameOver();
    }

    this.renderPositions(this.bodyPositions);
  }

  removePositions(bodyPositions) {
    const positionsToRemove = bodyPositions.slice(-this.size);
    positionsToRemove.forEach((position) => this.remove(position));
  }

  isBodySnake(newPosition) {
    const snakeBody = this.bodyPositions.slice(-this.size);
    return snakeBody.includes(newPosition);
  }

  renderPositions(bodyPositions) {
    const positionsToRender = bodyPositions.slice(-this.size);
    positionsToRender.forEach((position) => this.render(position));
  }

  increaseSpead() {
    this.intervalTime < 25
      ? (this.intervalTime = 25)
      : (this.intervalTime -= 25);
  }

  move() {
    window.addEventListener('keyup', (event) => {
      const { key } = event;
      switch (key) {
        case 'ArrowUp':
          clearInterval(this.intervalId);
          this.intervalId = setInterval(
            this.moveUp.bind(this),
            this.intervalTime,
          );
          break;
        case 'ArrowRight':
          clearInterval(this.intervalId);
          this.intervalId = setInterval(
            this.moveRight.bind(this),
            this.intervalTime,
          );
          break;
        case 'ArrowDown':
          clearInterval(this.intervalId);
          this.intervalId = setInterval(
            this.moveDown.bind(this),
            this.intervalTime,
          );
          break;
        case 'ArrowLeft':
          clearInterval(this.intervalId);
          this.intervalId = setInterval(
            this.moveLeft.bind(this),
            this.intervalTime,
          );
          break;
      }
    });
  }
}

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

class Fruit {
  constructor(position) {
    this.position = position;
    this.render(this.position);
  }

  render(position) {
    cells[position].classList.add('fruit');
  }

  remove(position) {
    cells[position].classList.remove('fruit');
  }

  eaten() {
    this.remove(this.position);
  }
}

/********************************* */
// Game initialization
/********************************* */

let renderFruitInterval;

const renderFruit = () => {
  const randomFruitPosition = getRandomNumber(0, 100);
  const fruit = new Fruit(randomFruitPosition);
  fruitsOnBoard.push(fruit);
};

const renderFruits = (event) => {
  renderFruitInterval = setInterval(renderFruit, 5000);
};

const startGame = (event) => {
  createGrid();
  renderFruits();
  snake = new Snake(55);
};

/********************************* */
// Score
/********************************* */

let score = 0;
const scoreDisplay = document.querySelector('.score > p');

const renderScore = () => {
  score = score + 1000;
  scoreDisplay.innerText = score;
};

document.addEventListener('DOMContentLoaded', startGame);

/********************************* */
// Reset
/********************************* */

const handleResetClick = (event) => {
  cells = [];
  grid.innerHTML = '';
  startGame();
};

const resetButton = document.querySelector('button[type="reset"]');

resetButton.addEventListener('click', handleResetClick);

/********************************* */
// Game Over
/********************************* */

const gameOver = () => {
  console.log('GAME OVER ');
  cells = [];
  grid.innerHTML = '';
  grid.classList.add('game-over');
};
