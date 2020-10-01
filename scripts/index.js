/********************************* */
// Grid
/********************************* */
const width = 10;
const height = width;
const cellCount = width * height;
const grid = document.querySelector('.grid');

const cells = [];

for (let index = 0; index < cellCount; index = index + 1) {
  const cell = document.createElement('div');
  cell.innerText = index;
  grid.appendChild(cell);
  cells.push(cell);
}

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
    renderScore();
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
    this.setCoordinates();
    if (this.y > 0) {
      this.headPosition = this.headPosition - width;
      this.setBodyPositions();
      this.shouldEat();
    } else {
      console.log('kill');
    }
  }

  moveRight() {
    this.setCoordinates();
    if (this.x < width - 1) {
      this.headPosition++;
      this.setBodyPositions();
      this.shouldEat();
    } else {
      console.log('kill');
    }
  }

  moveDown() {
    this.setCoordinates();

    if (this.y < width - 1) {
      this.headPosition = this.headPosition + width;
      this.setBodyPositions();
      this.shouldEat();
    } else {
      console.log('kill');
    }
  }

  moveLeft() {
    this.setCoordinates();
    if (this.x > 0) {
      this.headPosition--;
      this.setBodyPositions();
      this.shouldEat();
    } else {
      console.log('kill');
    }
  }

  removePositions(bodyPositions) {
    const positionsToRemove = bodyPositions.slice(-this.size);
    positionsToRemove.forEach((position) => this.remove(position));
  }

  renderPositions(bodyPositions) {
    const positionsToRender = bodyPositions.slice(-this.size);
    positionsToRender.forEach((position) => this.render(position));
  }

  move() {
    window.addEventListener('keyup', (event) => {
      const { key } = event;

      this.removePositions(this.bodyPositions);

      switch (key) {
        case 'ArrowUp':
          this.moveUp();
          break;
        case 'ArrowRight':
          this.moveRight();
          break;
        case 'ArrowDown':
          this.moveDown();
          break;
        case 'ArrowLeft':
          this.moveLeft();
          break;
      }

      this.renderPositions(this.bodyPositions);
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
  renderFruits();
  new Snake(55);
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
