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
    this.position = position;
    this.bodyPosition = [];
    this.size = 1;
    this.render(this.position);
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
    return fruits.includes(this.position);
  }

  eatFruit(position) {
    const [fruit] = fruitsOnBoard.filter(
      (fruit) => fruit.position === position,
    );

    const indexOfFruit = fruitsOnBoard.indexOf(fruit);
    fruitsOnBoard.splice(indexOfFruit, 1);
    fruit.eaten();
    this.size = this.size + 1;
  }

  shouldEat() {
    if (this.isPositionAFruit()) {
      this.eatFruit(this.position);
    }
  }

  moveUp() {
    this.position = this.position - width;
    this.shouldEat();
  }

  moveRight() {
    this.position++;
    this.shouldEat();
  }

  moveDown() {
    this.position = this.position + width;
    this.shouldEat();
  }

  moveLeft() {
    this.position--;
    this.shouldEat();
  }

  move() {
    window.addEventListener('keyup', (event) => {
      const { key } = event;
      const x = this.position % 10;
      const y = Math.floor(this.position / 10);

      this.remove(this.position);

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
        default:
          console.log('Eso no es una flecha flaco');
          break;
      }
      this.render(this.position);
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
