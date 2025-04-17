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

const repeat = (event) => {
  const stop = confirm('Přejete si načíst hru znovu?');
  if (stop === false) return event.preventDefault();
};

const repeatElm = document.querySelector('.tlacitka__opakovat');
repeatElm.addEventListener('click', repeat);

//Ještě si přidávám, bo mě irituje, že je to jen na jednom :)
//Určitě to jde udělat hezčí a kratší, ale momentálně na to nemám nervy :D
const home = (event) => {
  const stop = confirm('Přejete se vrátit na domovskou stránku?');
  if (stop === false) return event.preventDefault();
};

const homeElm = document.querySelector('.tlacitka__domu');
homeElm.addEventListener('click', home);
