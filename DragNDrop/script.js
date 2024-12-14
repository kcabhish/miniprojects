const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');

console.log(empties);

fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

empties.forEach((empty) => {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
});

function dragStart() {
  this.className += ' hold';
  setTimeout(() => (this.className = 'invisible'), 0);

  console.log('drag start');
}

function dragEnd() {
  this.className = 'fill';
  console.log('drag End');
}

function dragOver(e) {
  e.preventDefault();
  console.log('drag Over');
}

function dragEnter(e) {
  e.preventDefault();
  console.log('drag Enter');
}

function dragLeave() {
  console.log('drag Leave');
}

function dragDrop() {
  console.log(this);
  this.className = 'empty';
  this.append(fill);
}
