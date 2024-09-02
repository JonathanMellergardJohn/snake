// VARIABLES

let snakeShape = [ [5,5], [5,4], [5,3] ];
// directions: 1 = up, 2 = right, 3 = down, 4 = left 
let snakeDirection = 2;
let appleLocation = [2, 2]
let gameInterval;

// GAME FLOW
function runGame() {

  renderApple();
  renderSnake();

  gameInterval = setInterval(() => {
    moveSnake();

    if(snakeCrashed()) {
      removeApple();
      removeSnake();
      renderEnd();
      clearInterval(gameInterval);
      return;
    }
    else if(snakeAte()){
      console.log("in else if block")
      setAppleLocation();
      growSnake();
      removeApple();
      renderApple();
    }
    removeSnake();
    renderSnake();

}, 500)
}

function snakeCrashed(){
  if(snakeShape[0][0] > 10 || snakeShape[0][1] > 10)
    return true;
  else 
    return false
}
function snakeAte() {

  for (let i = 0; i < snakeShape[0].length; i++) {
    if (snakeShape[0][i] !== appleLocation[i]) return false;
  }

  return true;
}

// STATE MANAGEMENT

function moveSnake() {

  // move body
  for (let i = snakeShape.length - 1; i > 0; i--) {
      snakeShape[i] = snakeShape[i - 1];
  }

  // create new head
  let head = snakeShape[0];

  switch(snakeDirection) {
    // move up
    case 1:
      head = [head[0] - 1, head[1]];
      break;
    // move right
    case 2:
      head = [head[0], head[1] + 1];
      break;
    // move down
    case 3:
      head = [head[0] + 1, head[1]];
      break;
    // move left

    case 4:
      head = [head[0], head[1] - 1];
  }

    // add new head

    snakeShape[0] = head;
}

function changeSnakeDirection(newDirection) {
    let startDirIsEven = snakeDirection % 2 === 0;
    let newDirIsEven = newDirection % 2 === 0;

    if(startDirIsEven !== newDirIsEven) {
      return newDirection;
    }
      



    return snakeDirection;
}

function growSnake() {
  snakeShape.push([0, 0])
}

function setAppleLocation() {
  let pair;

  do {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    pair = [num1, num2];
  } while (snakeShape.some(fp => 
    (fp[0] === pair[0] && fp[1] === pair[1]) || 
    (fp[0] === pair[1] && fp[1] === pair[0])
  ));

  appleLocation = pair;
  console.log("in setAppleLocation()")
}


// RENDERING
function removeSnake() {
  let previousSegments = document.querySelectorAll('.snake-segment');

  previousSegments.forEach(segment => {
    segment.classList.remove('snake-segment');
  });
}

function renderSnake() {
    snakeShape.forEach(segment => {
      let htmlElement = document.querySelector(`#sq-${segment[0]}-${segment[1]}`);
      htmlElement.classList.add('snake-segment');
    });
}
function removeApple(){
  let apple = document.querySelector('.apple');
  apple.classList.remove('apple');
  console.log("ran removeApple")
}
function renderApple() {
  let newApple = document.querySelector(`#sq-${appleLocation[0]}-${appleLocation[1]}`);
  newApple.classList.add('apple');
  console.log("ran renderApple")
}
function renderEnd() {
  let firstElement = document.querySelector('#sq-5-4');
  firstElement.innerHTML = 'GAME ';

  let secondElement = document.querySelector('#sq-5-7');
  secondElement.innerHTML = ' OVER';
}

// HANDLE USER INTERACTION

function handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        snakeDirection = changeSnakeDirection(1);
        break;
      case 'ArrowRight':
        snakeDirection = changeSnakeDirection(2);
        break;
      case 'ArrowDown':
        snakeDirection = changeSnakeDirection(3);
        break;
      case 'ArrowLeft':
        snakeDirection = changeSnakeDirection(4);

        break;
      default:
        break;
    }
}

// EXECUTION AND EVENT LISTENER

window.addEventListener('keydown', (event) => handleKeyDown(event));

runGame();
