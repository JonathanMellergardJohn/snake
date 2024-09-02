export const Snake = {

  shape: [ [5,5], [5,4], [5,3] ],

  // directions: 1 = up, 2 = right, 3 = down, 4 = left
  direction: 2,

  changeDirection(direction) {
    let startDirEven = this.direction % 2 === 0;
    let newDirEven = direction % 2 === 0;

    if(startDirEven !== newDirEven)
      this.direction = direction;
  },

  move(direction) {

    // move body

    for (let i = this.shape.length - 1; i > 0; i--) {
      this.shape[i] = this.shape[i - 1];
    }

    // create new head
    let head = this.shape[0];

    switch(direction) {
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

    this.shape[0] = head;
  },

  grow(){
    this.shape.push([0, 0]);
  }
}
