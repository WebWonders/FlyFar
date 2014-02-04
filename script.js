      //variables
      var scene;
      var plane;
      var background;
      var batteries;
      var scoreTime;
      var userScore;
      
      //constants
      var SPEED_OF_BACKGROUND = 15;
      var NUM_BATTERIES = 1;
      var NUM_CLOUDS = 3
      
      
      function Plane() {
        tPlane = new Sprite(scene, "Images/RetroPlane1.png", 50, 50);
        tPlane.setSpeed(0);
        tPlane.setPosition();
        tPlane.followMouse = function() {
          this.setPosition(scene.getMouseX(), 500);
        }
        return tPlane;
      } //end Plane
      
      function Battery() {
        tBattery = new Sprite(scene, "Images/Battery.png", 150, 100);
      tBattery.reset = function(){
            this.setDY((Math.random() * SPEED_OF_BACKGROUND) + 5);
            this.setDX((Math.random() * 10) - 5);
            newX = Math.random() * scene.width;
            this.setPosition(newX, 50);
        } // end reset
        
        tBattery.checkBounds = function(){
            if (this.y > scene.height){
                this.reset();
            }
        }
        
        tBattery.reset();
        
        return tBattery;
    } //end Battery
    
    function makeBatteries(){
        batteries = new Array(NUM_BATTERIES);
        for (i = 0; i < NUM_BATTERIES; i++){
            batteries[i] = new Battery();
        }
    } //end makeBatteries
    
    function updateBatteries(){
        for (i = 0; i < NUM_BATTERIES; i++){
            batteries[i].update();
        }
    } //end updateBatteries
    
    function Background(){
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
     } //end background
    
      function init() {
        scene = new Scene();
        scene.hideCursor();
        //score
        timePut = document.getElementById('timeLeft');
        scoreTime = new Timer();
        //scoreTime.reset();
        //end score
        plane = new Plane();
        makeBatteries();
        background = new Background();
        findScore();
        scene.start();
      } //end init
      
      function update() {
        scene.clear();
        plane.followMouse();
        background.update();
        plane.update();
        updateBatteries();
        currentTime = 60 - timer.getElapsedTime();
        timePut.innerHTML = currentTime;
      } //end update
    
    function reset() {
        alert("Your score was" + Math.round(currentTime));
        scoreTime.reset();
    } //end reset
    
    function findScore() {
        userScore = scoreTime.getElapsedTime();
    } //end findScore

