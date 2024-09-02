import { Snake } from './Snake.js';
import { Displayer } from './Displayer.js';

// global variables

    let intervalId = null;
    let speed = 1000;

  static startGame() {
    Controller.initializeGameListener();

    Controller.intervalId = setInterval(() => {
      Controller.updateState();
      Controller.render();
    }, Controller.speed);
  }

  static updateState(){
    const direction = Snake.direction;
    Snake.move(direction);
  }
  static render() {
    Displayer.render(Snake.shape);
  }
  // Listener functions

  static handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        console.log('Up arrow pressed');
        Snake.changeDirection(1);
        break;
      case 'ArrowRight':
        console.log('Right arrow pressed');
        Snake.changeDirection(2);
        break;
      case 'ArrowDown':
        console.log('Down arrow pressed');
        Snake.changeDirection(3);
        break;
      case 'ArrowLeft':
        console.log('Left arrow pressed');
        Snake.changeDirection(4);
        break;
      default:
        console.log('Key pressed but key not in use');
        break;
    }
  }

  static initializeGameListener() {
    window.addEventListener('keydown', (event) => Controller.handleKeyDown(event));
  }
}
