/**
 * Created by Zhi Jian Zheng on 7/15/2017.
 /**
 * Displays rating in front of user
 * Returns their rating
 *
 * TO USE: add to to index.html
 *  <script language="javascript" type="text/javascript" src="./../userExperience/Rate.js"></script>
 *
 *
 *  Inside sketch, call "loadRatingAsset" function within setup function
 *  Then, whenever you want the feedback to be displayed, be sure to use a global variable
 *  ie: var rateMe
 *  then, instantiate via: rateMe = new RateMe(world);
 *  To generate the numbers: rateMe.show();
 *      -left/right controls are already handled here
 *  To get the result: rateMe.select();
 *
 *  NOTE: be sure to create a boolean variable that checks if you've already made a new RateMe();
 *  for ex: global variable rateCreated = false;
 *  then, set to true when you've instantiated
 *  then, set false after you've called rateMe.select() to tell us that we can make another RateMe();
 *
 *
 */


function loadRatingAsset(){
    for (var i = 1; i <= 5; i++){
        var img = document.createElement("img");
        img.setAttribute("src", "./../userExperience/images/" + i + ".png");
        img.setAttribute("id", "rateAsset" + i);
        document.getElementById("assets").appendChild(img);
    }
}

function RateMe(world){
    this.options = [];
    this.world = world;
    this.userPosition = world.getUserPosition();
    this.xBoxPos = this.userPosition.x - 3;
    this.zPos = this.userPosition.z - 3;
    this.xTextPos = this.userPosition.x;
    this.yTextPos = this.userPosition.y - 1 ;
    this.camera = document.querySelector("#screenCamera");
    this.selectedNumber = 1;
    this.shown = false;

    this.show = function(){
        if (this.shown === false) {
            this.shown = true;
            //create our oculus rift left/right hands
            var rightHand = document.createElement("a-entity");
            rightHand.setAttribute("oculus-touch-controls", "hand: right");
            rightHand.addEventListener("abuttondown", this.moveLeft);
            rightHand.addEventListener("bbuttondown", this.moveRight);
            this.options.push(rightHand);
            this.world.scene.appendChild(rightHand);

            //refresh our objects
            setTimeout(() => {
                document.querySelector('[raycaster]').components.raycaster.refreshObjects();
            });

            //create our text
            var text = document.createElement("a-entity");
            text.setAttribute("text", "color: white; value: Please rate your experience; width: 5; lineHeight: 50; letterSpacing: 5; align: center;");
            text.setAttribute("position", "" + this.xTextPos + ", " + this.yTextPos + ", " + this.zPos);
            text.setAttribute("scale", "1, 1, 1");
            this.camera.appendChild(text);
            this.options.push(text);

            //create our numbers
            for (var i = 1; i <= 5; i++) {
                var position = "" + this.xBoxPos + ", " + (this.userPosition.y - 2) + " " + this.zPos;
                this.xBoxPos += 1.5;
                var box = document.createElement("a-plane");
                box.setAttribute("id", "box" + i);
                box.setAttribute("color", "#FFF");
                if (this.selectedNumber === i) {
                    box.setAttribute("height", "0.9");
                    box.setAttribute("width", "0.9");
                    box.setAttribute("depth", "0.9");
                }
                else {
                    box.setAttribute("height", "0.5");
                    box.setAttribute("width", "0.5");
                    box.setAttribute("depth", "0.5");
                }
                box.setAttribute("position", position);
                box.setAttribute("src", "#rateAsset" + i);
                box.setAttribute("transparent", "true");

                this.options.push(box);
                this.camera.appendChild(box);

                setTimeout(() => {
                    document.querySelector('[raycaster]').components.raycaster.refreshObjects();
                });
            }
        }
    };

    this.moveLeft = function(){
        var oldNumber = document.querySelector("#box" + this.selectedNumber);
        oldNumber.setAttribute("height", "0.5");
        oldNumber.setAttribute("width", "0.5");
        oldNumber.setAttribute("depth", "0.5");
        if (this.selectedNumber === 1) {
            this.selectedNumber = 5;
        } else {
            this.selectedNumber--;
        }

        var newNumber = document.querySelector("#box" + this.selectedNumber);
        newNumber.setAttribute("height", "0.9");
        newNumber.setAttribute("width", "0.9");
        newNumber.setAttribute("depth", "0.9");
    };

    this.moveRight = function(){
        var oldNumber = document.querySelector("#box" + this.selectedNumber);
        oldNumber.setAttribute("height", "0.5");
        oldNumber.setAttribute("width", "0.5");
        oldNumber.setAttribute("depth", "0.5");

        if (this.selectedNumber === 5) {
            this.selectedNumber = 1;
        } else {
            this.selectedNumber++;
        }
        var newNumber = document.querySelector("#box" + this.selectedNumber);
        newNumber.setAttribute("height", "0.9");
        newNumber.setAttribute("width", "0.9");
        newNumber.setAttribute("depth", "0.9");
    };

    this.select = function () {
        //delete everything
        for (var x = 0; x < this.options.length; x++) {
            for (var y = 0; y < this.camera.childNodes.length; y++) {
                if (this.options[x] === this.camera.childNodes[y]) {
                    this.camera.removeChild(this.camera.childNodes[y]);
                    break;
                }
            }
        }

        //return the number
        console.log(this.selectedNumber);
        return this.selectedNumber;
    };
}

