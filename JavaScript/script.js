window.onload = () => {
  let game = null;
  
    document.getElementById('start-btn').onclick = () => {
      
      if (!game) {
      startGame();
    }
    };
  
    function startGame() {
      game = new Game();
      game.start();
    }
  };