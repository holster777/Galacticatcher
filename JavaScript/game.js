class Game {
    constructor() {
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.spaceman = null;
      this.background = new Image();
      this.frames = 0;
      this.stars = [];
      this.planets = [];
      this.aliens = [];
      this.x = 0;
      this.y = 0;
      this.starCount = 0;
      this.planetCount = 0;
      this.fuel = 0;
      this.rocket = new Image();
      this.spacemanRocket = new Image();
      this.spacemanRocket.src = "./docs/assets/images/Rocket-With-Spaceman.png"
      this.rocketFlying = new Image();
      this.timer = 60;
      this.canvasWidth = 900;
      this.canvasHeight = 700;
      this.intervalId = null;
      this.timerIntervalidId = null;
      this.gameRunning = false;
      this.stuck = false;
      this.rocketY = 220;
      this.beamSound = new Audio('./docs/assets/sounds/mixkit-arcade-retro-jump-223.wav');
      this.catchSound = new Audio('./docs/assets/sounds/mixkit-video-game-treasure-2066.wav');
    }

    start() {
        
        this.spaceman = new Spaceman(this, 380, 420, 120, 150);
        this.gameRunning = true;

       this.timerIntervalidId = setInterval(() => {


            if (this.timer === 0) {
                this.timer = 0;
            } else {
                this.timer--;
                this.stuck = false;
        
            }
            
            this.updateTimer();
            
        }, 1000);
        
        const controls = new Controls(this);
        controls.keyboardEvents();

        this.intervalId = setInterval(() => {
            this.updateMoon();
          }, 1000 / 60);

    }

    updateMoon() {

        if (!this.gameRunning && this.timer === 0) {
            this.gameOverScreen();
        } else {

        this.moonBackground();
        this.theRocket();
        this.spaceman.draw();
        this.createStars();
        this.createPlanets();
        this.createAliens();
        this.stars.forEach((star) => {
            star.y += Math.floor(Math.random() * 9);
            star.draw();
            this.checkCatchStar(star);

         });

         this.planets.forEach((planet) => {
            planet.y += Math.floor(Math.random() * 12);
            planet.draw();
            this.checkCatchPlanet(planet)
         });

         this.aliens.forEach((alien) => {
            alien.x ++;
            alien.draw();
            if (this.timer % 3 === 0 || this.timer % 4 === 0) {
            alien.beam();
            this.checkBeamHit(alien)
        }

         }); 

        this.frames ++;
        this.updateFuelGauge();
        // this.checkWin();
        // this.checkGameOver();
        this.checkGameStatus()
        }

    }

    moonBackground() {
    
        this.background.src = "./docs/assets/images/Moon-Surface-Black-Sky.png";
        this.ctx.drawImage(this.background, this.x, this.y, this.canvasWidth, this.canvasHeight);
    }

    createStars() {

        if (this.frames % 170 === 0) {
            this.stars.push(new Star(this));
        }
    }

    createPlanets() {
        if (this.frames % 300 === 0) {
            this.planets.push(new Planet(this));
        }
    }

    createAliens() {
        if (this.frames % 1000 === 0) {
            this.aliens.push(new Alien(this));
        }
    }



    checkCatchStar(star) {
            let starToRemove = null;
            const spaceman = this.spaceman;
            const caught = this.stars.some((star) => {
                starToRemove = star;
                return spaceman.catchStars(star)
            }); 
        if (this.spaceman.catchStars(star)) {
            this.starCount++;
            this.catchSound.play(); 
            this.removeStar(star);
            this.updateStarCount();
        
            return this.fuel += 5;
            
        }
    }

    checkCatchPlanet(planet) {
        let planetToRemove = null;
        const spaceman = this.spaceman;
        const caught = this.planets.some((planet) => {

            planetToRemove = planet;
            return spaceman.catchPlanets(planet);
            
        });
            
        if (caught) {
            this.planetCount++;
            this.catchSound.play(); 
            this.removePlanet(planetToRemove);
            this.updatePlanetCount();

            return this.fuel += 10;
                
        }
    }

    checkBeamHit() {
        const spaceman = this.spaceman;
        const hit = this.aliens.some((alien) => {
            return spaceman.beamHit(alien);
        });
    
        if (hit) {

        this.beamSound.play(); 
        this.stuck = true;
      

    }
}

    removeStar(star) {
        let thisStar = this.stars.indexOf(star);
        this.stars.splice(thisStar,1);

     }

    removePlanet(planet) {
        let thisPlanet = this.planets.indexOf(planet);
        this.planets.splice(thisPlanet,1);

     }

    updateStarCount() {
         let currentStarCount = document.querySelector('.star-count h3');
         currentStarCount.innerHTML = this.starCount;

     }

    updatePlanetCount() {
        let currentPlanetCount = document.querySelector('.planet-count h3');
        currentPlanetCount.innerHTML = this.planetCount;

     }

    updateFuelGauge() {
         let blockOne = document.querySelector('.block-1');
         let blockTwo = document.querySelector('.block-2');
         let blockThree = document.querySelector('.block-3');
         let blockFour = document.querySelector('.block-4');
         let blockFive = document.querySelector('.block-5');
         let blockSix = document.querySelector('.block-6');
         let blockSeven = document.querySelector('.block-7');
         let blockEight = document.querySelector('.block-8');
        
    switch (true) {
        
        case (this.fuel >= 180):
            blockEight.classList.add('purple-fill');
                break;
        case (this.fuel >= 150 ):
            blockSeven.classList.add('purple-fill');
            break;
        case (this.fuel >= 120 ):
            blockSix.classList.add('purple-fill');
            break;
        case (this.fuel >= 100 ):
            blockFive.classList.add('purple-fill');
            break;
        case (this.fuel >= 80 ):
            blockFour.classList.add('purple-fill');
            break;
        case (this.fuel >= 60 ):
            blockThree.classList.add('purple-fill');
            break;
        case (this.fuel >= 40 ):
            blockTwo.classList.add('purple-fill');
            break;
        case (this.fuel >= 20):
            blockOne.classList.add('purple-fill');
            break;

    }}

    theRocket() {
    
            this.rocket.src = "./docs/assets/images/Rocket-Empty.png";
            this.ctx.drawImage(this.rocket, 695, 260, 120, 250);
        
}

    winnerRocket() {

            console.log('winner rocket');
            
            //this.spacemanRocket.src = "/docs/assets/images/Rocket-With-Spaceman.png";
            this.ctx.drawImage(this.spacemanRocket, 695, 260, 120, 250);
            console.log('rocket win');

}


    rocketFly() {
        setInterval(() => {
            if (this.rocketY > 0 -330) {
                this.rocketY--;
                this.moonBackground();
                this.rocketFlying.src = "./docs/assets/images/Rocket-Flying.png";
                this.ctx.drawImage(this.rocketFlying, 695, this.rocketY, 120, 330);
                
        }}, 10) 
            };


    updateTimer (){
        if (!this.gameRunning) {
            return;
        }
        
        let minutes = document.querySelector('.minutes h5');
        if (this.timer > 60) {
        minutes.innerHTML = '01:'
        } else {
            minutes.innerHTML = '00:'
            let decimals = document.querySelector('.decimals h5');
            let units = document.querySelector('.units h5');
            let timeToString = this.timer.toString();

            if (this.timer < 10) {
                decimals.innerText = 0;
                units.innerText = timeToString[0];
        
            } else {
                decimals.innerText = timeToString[0];
                units.innerText = timeToString[1];
                
            }

    }}


    gameOverScreen() {
            this.background.src = "./docs/assets/images/Game-Over-Gold.png";
            this.ctx.drawImage(this.background, this.x, this.y, this.canvasWidth, this.canvasHeight);

    }

    checkGameStatus() {
        if (this.timer === 0 && this.fuel < 180) {

            this.ctx.clearRect(0 , 0 ,this.canvasWidth, this.canvasHeight);
            this.spaceman= null;
            this.aliens = null;
            this.stars = null;
            this.planets = null;
        
            this.gameRunning = false;

        

        }

        else if (this.timer > 0 && this.fuel >= 180) {
        

            this.moonBackground();
            this.winnerRocket();

            clearInterval(this.intervalId);
            clearInterval(this.timerIntervalidId);
    

            setTimeout(() => {
             this.rocketFly()
         }, 2000);

        }



    }



}



 // checkWin() {

    //     if (this.timer > 0 && this.fuel >= 20) {
        
    //     clearInterval(this.intervalId);
    //     clearInterval(this.timerIntervalidId);

    //     this.winnerRocket();
    //     // this.rocketFly();

    //     }}

        // setTimeout(() => {
        //     this.rocketFly()
        // }, 2000);
        
        // }}


    // checkGameOver() {
    //     if (this.timer === 0 && this.fuel < 160) {

    //         this.ctx.clearRect(0 , 0 ,this.canvasWidth, this.canvasHeight);
    //         this.spaceman= null;
    //         this.aliens = null;
    //         this.stars = null;
    //         this.planets = null;
        
    //         this.gameRunning = false;
            
    //     }
    // }