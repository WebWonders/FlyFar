      //variables
      var scene;
      var plane;
      var background;
      var batteries;
      var gasCans;
      var bombs;
      var scoreTime;
      
      //constants
      var SPEED_OF_BACKGROUND = 15;
      var NUM_BATTERIES = 1;
      var NUM_GAS_CANS = 1;
      var NUM_BOMBS = 1;
      
      function counter() {
            var aRand = Math.floor(Math.random() * 2);
            
            return aRand;
      } //end counter()
      
      function Plane() {
        tPlane = new Sprite(scene, "Images/RetroPlane.png", 50, 50);
        tPlane.setSpeed(0);
        tPlane.setPosition();
        tPlane.setBoundAction(STOP);
        tPlane.followMouse = function() {
          this.setPosition(scene.getMouseX(), 500);
        }
        return tPlane;
      } //end Plane()
      
      function Battery() {
        tBattery = new Sprite(scene, "Images/BatteryPic.png", 100, 100);
        
        tBattery.reset = function(){
            this.setDY((Math.random() * SPEED_OF_BACKGROUND) + 5);
            this.setDX((Math.random() * 10) - 5);
            newX = Math.random() * scene.width;
            this.setPosition(newX, 50);
        }
        
        tBattery.checkBounds = function() {
            if (this.y > scene.height){
                this.reset();
            }
        }
        
        tBattery.reset();
        
        return tBattery;
    } //end Battery()
    
    function makeBatteries() {
        batteries = new Array(NUM_BATTERIES);
        for (i = 0; i < NUM_BATTERIES; i++){
            batteries[i] = new Battery();
        }
    } //end makeBatteries()
    
    function updateBatteries() {
        for (i = 0; i < NUM_BATTERIES; i++){
            batteries[i].update();
        }
    } //end updateBatteries
    
    function Background() {
        tBackground = new Sprite(scene, "Images/OverheadGroundPic.jpg", 800, 1440);
        tBackground.setDX(0);
        tBackground.setDY(SPEED_OF_BACKGROUND);
        tBackground.setPosition(400, 0);
        tBackground.checkBounds = function(){
            if (this.y > 720){
                this.setPosition(400, -120)
            }
        }
        return tBackground;
     } //end Background()
     
     function checkCollisions() {
           for (i = 0; i < NUM_BATTERIES; i++){
            if (plane.collidesWith(batteries[i])){
                batteries[i].reset();
                userScore += 5;
            }
        }
     } //end checkCollisions()
    
      function init() {
        scene = new Scene();
        scene.hideCursor();
        currentTime = new Timer();
        currentTime.reset();
        plane = new Plane();
        makeBatteries();
        background = new Background();
        scene.start();
      } //end init()
      
      function update() {
        scene.clear();
        plane.followMouse();
        background.update();
        plane.update();
        updateBatteries();
        scoreTime = Math.round(30 - currentTime.getElapsedTime());
        document.getElementById('timeLeft').innerHTML = scoreTime;
     } //end update()
    
    function resetGame() {
        alert("Your score was" + scoreTime);
        currentTime = reset();
    } //end reset()
    
    function findScore() {
        userScore += scoreTime.getElapsedTime();
    } //end findScore()
    
    if (currentTime <= 0) {
          resetGame();
    } //endif
