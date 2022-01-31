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
      this.timer = 61;
      this.canvasWidth = 900;
      this.canvasHeight = 700;
      this.intervalId = null;
    }

    start() {
        
        this.spaceman = new Spaceman(this, 380, 420, 120, 150);

        setInterval(() => {


            if (this.timer === 0) {
                return
            } else {
                this.timer--;
        
            }
            
        }, 1000);
        
        const controls = new Controls(this);
        controls.keyboardEvents();

        this.intervalId = setInterval(() => {
            this.updateMoon();
          }, 1000 / 60);

    }

    updateMoon() {

        this.moonBackground();
        this.theRocket();
        this.spaceman.draw();
        this.createStars();
        this.createPlanets();
        this.stars.forEach((star) => {
            star.y += Math.floor(Math.random() * 7);
            star.draw();
            this.checkCatchStar(star);
         });
         this.planets.forEach((planet) => {
            planet.y += Math.floor(Math.random() * 10);
            planet.draw();
         });   

         this.aliens.forEach((alien) => {
            aliens.x += Math.floor(Math.random() * 10);
            aliens.draw();
         });   


        this.frames ++;
        this.checkCatchPlanet();
        this.updateFuelGauge();
        this.updateTimer();
        // this.checkGameOver();


    }

    moonBackground() {
    
            this.background.src = "/Images/Moon-Surface-Black-Sky.png";
            this.ctx.drawImage(this.background, this.x, this.y, this.canvasWidth, this.canvasHeight);
    }

    createStars() {

        if (this.frames % 300 === 0) {
            this.stars.push(new Star(this));
        }
    }

    createPlanets() {
        if (this.frames % 600 === 0) {
            this.planets.push(new Planet(this));
        }
    }

    // createAliens() {
    //     if (this.frames % 850 === 0) {
    //         this.aliens.push(new Alien(this));
    //     }
    // }



    checkCatchStar(star) {
        let caught = this.spaceman.catchStars(star)
        if (caught) {
            console.log('colided')
            this.starCount++;
            this.removeStar(star);
            this.updateStarCount();
            
            return this.fuel += 5;
            
        }
    }

        checkCatchPlanet() {
            let planetToRemove = null;
            const spaceman = this.spaceman;
            const caught = this.planets.some((planet) => {
                planetToRemove = planet;
                return spaceman.catchPlanets(planet);
            });
            if (caught) {
                console.log('colided')
                this.planetCount++;
                this.removePlanet(planetToRemove);
                this.updatePlanetCount();

                return this.fuel += 10;
                
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
        
        case (this.fuel >= 160):
            blockEight.classList.add('purple-fill');
                break;
        case (this.fuel >= 140 ):
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
            console.log('block one')
            break;

    }}

    theRocket() {

        if (this.fuel >= 160 && this.timer > 0) {
            this.rocket.src = "/Images/Rocket-With-Spaceman.png";
            this.ctx.drawImage(this.rocket, 695, 260, 120, 250);
            this.spaceman = null;

            
        } else {
            this.rocket.src = "/Images/Rocket-Empty.png";
            this.ctx.drawImage(this.rocket, 695, 260, 120, 250);
        }
}


 updateTimer () {
    let minutes = document.querySelector('.minutes h5');
    if (this.timer > 60) {
      minutes.innerHTML = '01:'
    } else {
      minutes.innerHTML = '00:'
        let decimals = document.querySelector('.decimals h5');
        let units = document.querySelector('.units h5');
        let updateDecimals = decimals.innerText;
        let updateUnits = units.innerText;
        let timeToString = this.timer.toString();

        updateDecimals = '7';
        updateUnits = '8';
        

 }}

// checkGameOver() {
//     if (this.timer === 0 && this.fuel < 160) {
//         clearInterval(this.intervalId);
//         console.log('GAME OVER')
//     }
// }

}