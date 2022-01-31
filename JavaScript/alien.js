class Alien {
    constructor(game) {
      this.game = game;
      this.x = 0;
      this.y = 150;
      this.width = 100;
      this.height = 50;
      this.img = new Image();
    }
    left() {
      return this.x;
    }
    right() {
      return this.x + this.width;
    }
  
    top() {
      return this.y;
    }
  
    bottom() {
      return this.y + this.height;
    }
  
    draw() {
        this.img.src = '/Images/Alien-Ship.png';
        this.game.ctx.drawImage(this.img,this.x, this.y, this.width, this.height);

    }

  }