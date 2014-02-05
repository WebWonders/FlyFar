      //variables
      var scene;
      var plane;
      var background;
      var batteries;
      var flyTime;
      var scoreTime;
      var userScore;
      
      //constants
      var SPEED_OF_BACKGROUND = 15;
      var NUM_BATTERIES = 1;
      var NUM_CLOUDS = 3
      
      function Plane() {
        tPlane = new Sprite(scene, "Images/RetroPlane.png", 50, 50);
        tPlane.setSpeed(0);
        tPlane.setPosition();
        tPlane.followMouse = function() {
          this.setPosition(scene.getMouseX(), 500);
        }
        return tPlane;
      }
      function Battery() {
        tBattery = new Sprite(scene, "Images/BatteryPic.png", 150, 100);
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
    }
    function makeBatteries(){
        batteries = new Array(NUM_BATTERIES);
        for (i = 0; i < NUM_BATTERIES; i++){
            batteries[i] = new Battery();
        }
    }
    
    function updateBatteries(){
        for (i = 0; i < NUM_BATTERIES; i++){
            batteries[i].update();
        }
    }
    
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
     }
    
      function init() {
        scene = new Scene();
        scene.hideCursor();
        //timePut = document.getElementById('timeLeft');
        //flyTime = new Timer();
        //flyTime.reset();
        //scoreTime = new Timer();
        //scoreTime.reset();
        plane = new Plane();
        makeBatteries();
        background = new Background();
        //findScore();
        scene.start();
      }
      function update() {
        scene.clear();
        plane.followMouse();
        background.update();
        plane.update();
        updateBatteries();
        //currentTime = timer.getElapsedTime();
        //timePut.innerHTML = currentTime;
    }
/*    function reset() {
        flyTime.reset();
        scoreTime.reset();
        alert("Your score was" + Math.floor(userScore));
    }
    function findScore() {
        userScore = scoreTime.getElapsedTime();
    }*/

