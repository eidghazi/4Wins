const haikel = document.querySelector('.haikel');
const tiemNextP = document.querySelector('.tiemNextP');
const restart = document.querySelector('.restart');
const p1Score = document.querySelector('.p1Score');
const p2Score = document.querySelector('.p2Score');
const player = document.querySelector('.player');
const nextRound = document.querySelector('.nextRound');
const timerBox = document.querySelector('.timer-container');
const playerTurn= document.querySelector('.player-turn');
const playerWin = document.querySelector('.playerWin')
const nextRoundBtn = document.querySelector('.nextR')
const firstName =  document.querySelector('.firstName')
const secondName = document.querySelector('.secondName')
const player11 = document.querySelector('.player11')
const player22 = document.querySelector('.player22')
const Eth = document.querySelector('.Eth')
const playerNames = document.querySelector('.playerNames')





let currentPlayer = 1;
let timeP1 = 15; 
let timeP2 = 15; 
let intervalId;  

function resetTime() {
  clearInterval(intervalId); 
  timeP1 = 15;
  timeP2 = 15; 
  tiemNextP.textContent = `${currentPlayer === 1 ? timeP1 : timeP2}s`; 
}

function resetgame(){
  const allcircles = document.querySelectorAll(".cir")

  allcircles.forEach(circle=> {
    circle.style.backgroundColor="";
    circle.classList.remove("red","yellow")
  });

  currentPlayer=1;
  playerTurn.textContent = `${name1}'S TURN`;


  resetTime();

}

function timeNextPlayerpl() {
  clearInterval(intervalId); 

  intervalId = setInterval(function() {
    if (currentPlayer === 1) {
      tiemNextP.textContent = `${timeP1}s`; 
      timeP1--;
      if (timeP1 === 0) {
        clearInterval(intervalId);
        currentPlayer = 2; 
        playerTurn.textContent = `${name2}'S TURN`;
        resetTime();
      }
    } else {
      tiemNextP.textContent = `${timeP2}s`; 
      timeP2--;
      if (timeP2 === 0) {
        clearInterval(intervalId);
        currentPlayer = 1; 
        playerTurn.textContent = `${name1}'S TURN`;
        resetTime();
      }
    }
  }, 1000);
}

function changeC(event) {
  const circle = event.target;
  const circleClass = circle.classList[1];
  const row = parseInt(circleClass[1]);
  const col = circleClass[0];

  if (row < 6) {
    const belowCircle = document.querySelector(`.${col}${row + 1}`);
    if (!belowCircle.style.backgroundColor) {
      return; 
    }
  }

  if (circle.style.backgroundColor === "red" || circle.style.backgroundColor === "yellow") {
    return;
  }

  if (currentPlayer === 1) {
    circle.style.backgroundColor = "red";
    currentPlayer = 2;
    circle.classList.add("red");
  } else {
    circle.style.backgroundColor = "yellow";
    currentPlayer = 1;
    circle.classList.add("yellow");
  }

  resetTime();
  timeNextPlayerpl();

  const playerTurn = document.querySelector('.player-turn');
  playerTurn.textContent = ` ${currentPlayer === 1 ? name1 : name2}'S TURN`;

  if (checkWin()) {
    setTimeout(() => {
      if (currentPlayer === 1) {
        p2Score.textContent = parseInt(p2Score.textContent) + 1;
        nextRound.classList.remove('hide')
        timerBox.classList.add('hide')
        playerWin.textContent=`${name2} win`
      } else {
        p1Score.textContent = parseInt(p1Score.textContent) + 1;
        nextRound.classList.remove('hide')
        timerBox.classList.add('hide')
        playerWin.textContent= `${name1} win`
      }
      
    }, 100);
    
  }
}

function checkWin() {
  return checkHorizontal() || checkVertical() || checkDiagonal();
}

function checkHorizontal() {
  for (let r = 1; r <= 6; r++) {
    for (let c = 0; c <= 3; c++) {
      const firstCircle = document.querySelector(`.${String.fromCharCode(97 + c)}${r}`);
      const secondCircle = document.querySelector(`.${String.fromCharCode(97 + c + 1)}${r}`);
      const thirdCircle = document.querySelector(`.${String.fromCharCode(97 + c + 2)}${r}`);
      const fourthCircle = document.querySelector(`.${String.fromCharCode(97 + c + 3)}${r}`);
      if (firstCircle && secondCircle && thirdCircle && fourthCircle &&
          firstCircle.style.backgroundColor === secondCircle.style.backgroundColor &&
          firstCircle.style.backgroundColor === thirdCircle.style.backgroundColor &&
          firstCircle.style.backgroundColor === fourthCircle.style.backgroundColor &&
          firstCircle.style.backgroundColor !== '') {
        return true;
      }
    }
  }
  return false;
}

function checkVertical() {
  for (let c = 0; c <= 6; c++) {
    for (let r = 1; r <= 3; r++) {
      const firstCircle = document.querySelector(`.${String.fromCharCode(97 + c)}${r}`);
      const secondCircle = document.querySelector(`.${String.fromCharCode(97 + c)}${r + 1}`);
      const thirdCircle = document.querySelector(`.${String.fromCharCode(97 + c)}${r + 2}`);
      const fourthCircle = document.querySelector(`.${String.fromCharCode(97 + c)}${r + 3}`);
      if (firstCircle && secondCircle && thirdCircle && fourthCircle &&
          firstCircle.style.backgroundColor === secondCircle.style.backgroundColor &&
          firstCircle.style.backgroundColor === thirdCircle.style.backgroundColor &&
          firstCircle.style.backgroundColor === fourthCircle.style.backgroundColor &&
          firstCircle.style.backgroundColor !== '') {
        return true;
      }
    }
  }
  return false;
}

function checkDiagonal() {
  for (let r = 1; r <= 3; r++) {
    for (let c = 0; c <= 3; c++) {
      const firstCircle = document.querySelector(`.${String.fromCharCode(97 + c)}${r}`);
      const secondCircle = document.querySelector(`.${String.fromCharCode(97 + c + 1)}${r + 1}`);
      const thirdCircle = document.querySelector(`.${String.fromCharCode(97 + c + 2)}${r + 2}`);
      const fourthCircle = document.querySelector(`.${String.fromCharCode(97 + c + 3)}${r + 3}`);
      if (firstCircle && secondCircle && thirdCircle && fourthCircle &&
          firstCircle.style.backgroundColor === secondCircle.style.backgroundColor &&
          firstCircle.style.backgroundColor === thirdCircle.style.backgroundColor &&
          firstCircle.style.backgroundColor === fourthCircle.style.backgroundColor &&
          firstCircle.style.backgroundColor !== '') {
        return true;
      }
    }
  }
  for (let r = 4; r <= 6; r++) {
    for (let c = 0; c <= 3; c++) {
      const firstCircle = document.querySelector(`.${String.fromCharCode(97 + c)}${r}`);
      const secondCircle = document.querySelector(`.${String.fromCharCode(97 + c + 1)}${r - 1}`);
      const thirdCircle = document.querySelector(`.${String.fromCharCode(97 + c + 2)}${r - 2}`);
      const fourthCircle = document.querySelector(`.${String.fromCharCode(97 + c + 3)}${r - 3}`);
      if (firstCircle && secondCircle && thirdCircle && fourthCircle &&
          firstCircle.style.backgroundColor === secondCircle.style.backgroundColor &&
          firstCircle.style.backgroundColor === thirdCircle.style.backgroundColor &&
          firstCircle.style.backgroundColor === fourthCircle.style.backgroundColor &&
          firstCircle.style.backgroundColor !== '') {
        return true;
      }
    }
  }
  return false;
}

restart.addEventListener("click", function() {
  resetTime();
  location.reload();
});




nextRoundBtn.addEventListener("click",function(){
  resetgame();
  nextRound.classList.add('hide')
  timerBox.classList.remove('hide')
})

let name1;
let name2; 

const playerName = function(){
  name1 = firstName.value;
   name2 = secondName.value;

  player11.textContent=name1;
  player22.textContent=name2;

  playerNames.classList.add('hide');
  Eth.classList.remove('hide');
  console.log("hiiiiiiiiiiiiiiii")

}

document.addEventListener("keydown",function(e){
  if(e.key==="Enter"){
    playerName()
    playerTurn.textContent = `${name1}'S TURN`;

    
  }
})