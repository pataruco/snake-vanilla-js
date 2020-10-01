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
class Snake {
  constructor(position) {
    this.position = position;
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

  move() {
    window.addEventListener('keyup', (event) => {
      const { key } = event;
      const x = this.position % 10;
      const y = Math.floor(this.position / 10);

      this.remove(this.position);

      switch (key) {
        case 'ArrowUp':
          if (y > 0) {
            this.position = this.position - width;
          }
          break;
        case 'ArrowRight':
          if (x < width - 1) {
            this.position++;
          }
          break;
        case 'ArrowDown':
          if (y < width - 1) {
            this.position = this.position + width;
          }
          break;
        case 'ArrowLeft':
          if (x > 0) {
            this.position--;
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
}

let renderFruitInterval;

const renderFruit = () => {
  const randomFruitPosition = getRandomNumber(0, 100);
  new Fruit(randomFruitPosition);
};

const renderFruits = (event) => {
  renderFruitInterval = setInterval(renderFruit, 5000);
};

document.addEventListener('DOMContentLoaded', renderFruits);
