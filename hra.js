let currentPlayer = 'circle';
const playerImg = document.querySelector('.hraje__obrazek');

const player = (event) => {
  event.target.disabled = true;
  if (currentPlayer === 'circle') {
    event.target.classList.add('board__field--circle');
    currentPlayer = 'cross';
    playerImg.src = 'podklady/cross.svg';
  } else {
    event.target.classList.add('board__field--cross');
    currentPlayer = 'circle';
    playerImg.src = 'podklady/circle.svg';
  }
};

const gameButtons = document.querySelectorAll('.grid__item');
gameButtons.forEach((button) => {
  button.addEventListener('click', player);
});
