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
    this.bodyPositions = [];
    this.size = 1;
    this.render(this.headPosition);
    this.move();
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
  }

  shouldEat() {
    if (this.isPositionAFruit()) {
      this.eatFruit(this.headPosition);
    }
  }

  setBodyPositions() {
    this.bodyPositions.push(this.headPosition);
  }

  moveUp() {
    this.headPosition = this.headPosition - width;
    this.setBodyPositions();
    this.shouldEat();
  }

  moveRight() {
    this.headPosition++;
    this.setBodyPositions();
    this.shouldEat();
  }

  moveDown() {
    this.headPosition = this.headPosition + width;
    this.setBodyPositions();
    this.shouldEat();
  }

  moveLeft() {
    this.headPosition--;
    this.setBodyPositions();
    this.shouldEat();
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
      const x = this.headPosition % 10;
      const y = Math.floor(this.headPosition / 10);

      this.removePositions(this.bodyPositions);

      // this.remove(this.headPosition);

      switch (key) {
        case 'ArrowUp':
          if (y > 0) {
            this.moveUp();
          }
          break;
        case 'ArrowRight':
          if (x < width - 1) {
            this.moveRight();
          }
          break;
        case 'ArrowDown':
          if (y < width - 1) {
            this.moveDown();
          }
          break;
        case 'ArrowLeft':
          if (x > 0) {
            this.moveLeft();
          }
          break;
      }

      this.renderPositions(this.bodyPositions);

      // this.render(this.headPosition);
    });
  }
}

const snake = new Snake(55);

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

let renderFruitInterval;

const renderFruit = () => {
  const randomFruitPosition = getRandomNumber(0, 100);
  const fruit = new Fruit(randomFruitPosition);
  fruitsOnBoard.push(fruit);
};

const renderFruits = (event) => {
  renderFruitInterval = setInterval(renderFruit, 5000);
};

document.addEventListener('DOMContentLoaded', renderFruits);
