class Star {
    constructor(game) {
      this.game = game;
      this.x = Math.floor(Math.random() * 850);
      this.y = 0;
      this.width = 18;
      this.height = 18;
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
        this.img.src = '/Images/Star.png';
        this.game.ctx.drawImage(this.img,this.x, this.y, this.width, this.height);

    }

  }

  class Planet {
    constructor(game) {
      this.game = game;
      this.x = Math.floor(Math.random() * 850);
      this.y = 0;
      this.width = 50;
      this.height = 30;
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
        this.img.src = '/Images/Planet.png';
        this.game.ctx.drawImage(this.img,this.x, this.y, this.width, this.height);
    }
  }















  // class Planet extends Star {
  //   constructor(game) {

  // }

  //   draw() {
  //     this.img.src = '/Images/Planet.png';
  //       this.game.ctx.drawImage(this.img,this.x, this.y, this.width, this.height);
  //   }

  // }


  // class Soldier {
  //   constructor(health, strength) {
  //     this.health = health;
  //     this.strength = strength; }
  //     attack(){
  //       return this.strength;
  //     }
  //     receiveDamage(damage) {
  //       this.health -= damage;
  //     }
  //   }
  
  // // Viking
  // class Viking extends Soldier {
  //   constructor(name,health,strength) {
  //     super(health, strength);
  //     this.name = name;
  //   }
  //   receiveDamage(damage) {
  //     super.receiveDamage(damage);
  //     if (this.health > 0) {
  //       return(`${this.name} has received ${damage} points of damage`)
  //     } else if (this.health <=0) {
  //       return(`${this.name} has died in act of combat`)
  //     }}
  //     battleCry() {
  //       return "Odin Owns You All!"
  //     }
  
  //   }