class Controls {
    constructor(game) {
      this.game = game;
      this.spaceman = this.game.spaceman;
    }
  
    keyboardEvents() {
      window.addEventListener('keydown', (e) => {
        if (!this.game.stuck) {

          switch (e.code) {
            case 'ArrowRight':
              if (this.spaceman.x + this.spaceman.width < 850) {
                this.spaceman.x += 50;
                this.spaceman.y -= 30;
                this.spaceman.direction = 'right';
                
  
              }
              break;
            case 'ArrowLeft':
              if (this.spaceman.x > 10) {
                this.spaceman.x -= 50;
                this.spaceman.y -= 30;
                this.spaceman.direction = 'left';
                
              }
              break;
          }
          
        }
      
      });
      window.addEventListener('keyup', (e) => {
        switch (e.code) {
          case 'ArrowRight':
            if (this.spaceman.x + this.spaceman.width < 850) {
                this.spaceman.y = 420;

            }
            break;
          case 'ArrowLeft':
            if (this.spaceman.x > 10) {
                this.spaceman.y = 420;
            }
            break;
        }
      });
    }
  }