/**
 * Created by Zhi Jian Zheng on 7/15/2017.
 */

/**
 * Displays rating in front of user
 * Returns their rating
 *
 * TO USE: add to to index.html
 *  <script language="javascript" type="text/javascript" src="./../userExperience/Rate.js"></script>
 *  <script language="javascript" type="text/javascript" src="./../userExperience/libraries/aframe-bmfont-text-component.js"></script>
 *
 *  Inside sketch, call "loadRatingAsset" function within setup with world as its parameter
 *  Then, whenever you want to get user rating, just call rateMe() function with the necessary parameters
 */
function loadRatingAsset(world){
// <img src="img/sky.jpg" id="sky">
    for (var i = 1; i <= 10; i++){
        var img = document.createElement("img");
        img.setAttribute("src", "./../userExperience/images/" + i + ".png");
        img.setAttribute("id", "rateAsset" + i);
        document.getElementById("assets").appendChild(img);
    }
}

function rateMe(world, userPosition){
    this.options = [];
    this.numbers = [];
    this.userPosition = userPosition;
    this.xBoxPos = this.userPosition.x - 13;
    this.zPos = this.userPosition.z - 10;
    this.xTextPos = this.userPosition.x - 7.5;
    this.yTextPos = this.userPosition.y + 3;
    var that = this;


    this.text = document.createElement("a-entity");
    this.text.setAttribute("bmfont-text", "text: Please rate your experience:; color: white");
    this.text.setAttribute("position", "" + this.xTextPos + ", " + this.yTextPos + ", " + this.zPos);
    // this.text.setAttribute("position", "0, 0, 0");
    this.text.setAttribute("scale", "5, 5, 5");
    world.scene.appendChild(this.text);

    for (var i = 1; i <= 10; i++){
        this.options.push(new Box({
            red:255, green:255, blue:255,
            height:1.5, width:1.5, depth:1.5,
            x: this.xBoxPos += 2.5,
            y: this.userPosition.y,
            z: this.zPos,
            asset: "rateAsset" + i,
            // metalness: 0.2,
            // transparent: true,
            // roughness: 0.8,
            clickFunction: function(event){

                for (var i = 0; i < that.options.length; i++){
                    world.remove(that.options[i]);
                }

                for (var i = 0; i < world.scene.childNodes.length; i++){
                    if (world.scene.childNodes[i] === that.text){
                        world.scene.removeChild(world.scene.childNodes[i]);
                    }
                }

                //TODO: what happens on a user click?
                console.log(event.asset.substring(9) + " clicked");
            }
        }));
        console.log(this.xBoxPos, this.userPosition.y, this.userPosition.z);
        world.add(this.options[i-1]);
    }




}

