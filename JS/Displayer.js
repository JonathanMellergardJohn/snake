export class Displayer {

  static render(snakeShape) {
    
    // removes previous render
    let previousSegments = document.querySelectorAll('.snake-segment');
    previousSegments.forEach(segment => {
      segment.classList.remove('snake-segment');
    })
    // update render
    snakeShape.forEach(segment => {
      let htmlElement = document.querySelector(`#sq-${segment[0]}-${segment[1]}`);
      htmlElement.classList.add('snake-segment');
    })
  } 
}
