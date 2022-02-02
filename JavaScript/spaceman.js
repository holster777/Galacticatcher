class Spaceman {
    constructor(game, x, y, width, height) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.direction = 'right';
      this.width = width;
      this.height = height;
      this.img = new Image();
      this.canvas;
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
        return this.y + this.height
      }

    catchStars(star) {
        return !(this.bottom() < star.top() || this.top() > star.bottom() || this.right() < star.left() || this.left() > star.right()); 
      }

    catchPlanets(planet) {
        return !(this.bottom() < planet.top() || this.top() > planet.bottom() || this.right() < planet.left() || this.left() > planet.right());
      }

    beamHit(alien) {
        return !(this.bottom() < alien.beamTop() || this.top() > alien.beamBottom() || this.right() < alien.beamLeft() || this.left() > alien.beamRight());
      }


    draw() {
        if (this.direction === 'right'){
        this.img.src = '/Images/Spaceman-right.png';

        } else if (this.direction === 'left') {
            this.img.src ='/Images/Spaceman-left.png'
        }
        this.game.ctx.drawImage(this.img,this.x, this.y, this.width, this.height);
    }

        
    }

