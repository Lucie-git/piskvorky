import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';
const playerImg = document.querySelector('.hraje__obrazek');

const aiMove = async (board) => {
  const response = await fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      board: board,
      player: 'x',
    }),
  });
  const data = await response.json();
  const index = data.position.x + data.position.y * 10;
  const gameButtons = document.querySelectorAll('.grid__item');
  gameButtons[index].click();
};

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
  const gameButtons = document.querySelectorAll('.grid__item');
  const gameBoard = Array.from(gameButtons).map((button) => {
    if (button.classList.contains('board__field--circle')) {
      return 'o';
    } else if (button.classList.contains('board__field--cross')) {
      return 'x';
    } else {
      return '_';
    }
  });

  const winner = findWinner(gameBoard);
  if (winner === 'o' || winner === 'x') {
    setTimeout(() => {
      alert(`Vyhrál hráč se symbolem ${winner}.`);
      location.reload();
    }, 150);
  } else if (currentPlayer === 'cross') {
    setTimeout(() => {
      const updatedButtons = document.querySelectorAll('.grid__item');
      const updatedBoard = Array.from(updatedButtons).map((button) => {
        if (button.classList.contains('board__field--circle')) {
          return 'o';
        } else if (button.classList.contains('board__field--cross')) {
          return 'x';
        } else {
          return '_';
        }
      });
      aiMove(updatedBoard);
    }, 300);
  }
};

const gameButtons = document.querySelectorAll('.grid__item');
gameButtons.forEach((button) => {
  button.addEventListener('click', player);
});

//Pojistka tlačítek opakování hry a návratu na domovskou stránku

const repeat = (event) => {
  const stop = confirm('Přejete si načíst hru znovu?');
  if (stop === false) return event.preventDefault();
};

const repeatElm = document.querySelector('.tlacitka__opakovat');
repeatElm.addEventListener('click', repeat);

const home = (event) => {
  const stop = confirm('Přejete se vrátit na domovskou stránku?');
  if (stop === false) return event.preventDefault();
};

const homeElm = document.querySelector('.tlacitka__domu');
homeElm.addEventListener('click', home);
