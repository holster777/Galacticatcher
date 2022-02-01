class Alien {
    constructor(game) {
      this.game = game;
      this.x = 0;
      this.y = 80;
      this.width = 140;
      this.height = 70;
      this.img = new Image();
    }

    beam() {

      this.game.ctx.fillStyle = 'rgb(188, 255, 164, 0.5)';
      this.game.ctx.beginPath();
      this.game.ctx.moveTo(this.x+70, this.y+70);
      this.game.ctx.lineTo(this.x-20, this.y+480);
      this.game.ctx.lineTo(this.x+90, this.y+480);
      this.game.ctx.fill();
      this.game.ctx.closePath();


    }

    beamLeft() {
      return this.x-20;
    }
    beamRight() {
      return this.x+90;
    }

    beamBottom() {
      return this.y+480;
    }

    beamTop() {
      return this.x + 70;
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