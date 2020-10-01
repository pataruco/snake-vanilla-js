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
