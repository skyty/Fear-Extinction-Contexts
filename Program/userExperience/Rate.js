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
    this.xTextPos = this.userPosition.x;
    this.yTextPos = this.userPosition.y + 3;
    var that = this;


    this.text = document.createElement("a-entity");
    this.text.setAttribute("text", "color: white; value: Please rate your experience; width: 5; lineHeight: 50; letterSpacing: 5; align: center;");
    // this.text.setAttribute("bmfont-text", "text: Please rate your experience:; color: white");
    this.text.setAttribute("position", "" + this.xTextPos + ", " + this.yTextPos + ", " + this.zPos);
    this.text.setAttribute("scale", "5, 5, 5");
    world.scene.appendChild(this.text);
    this.options.push(this.text);

    for (var i = 1; i <= 10; i++){
        var position = "" + this.xBoxPos + ", " + this.userPosition.y + " " + this.zPos;
        this.xBoxPos += 2.5;
        var box = document.createElement("a-box");
        box.setAttribute("id", "box" + i);
        box.setAttribute("color", "#FFF");
        box.setAttribute("height", "1.5");
        box.setAttribute("width", "1.5");
        box.setAttribute("depth", "1.5");
        box.setAttribute("position", position);
        box.setAttribute("src", "#rateAsset" + i);

        this.options.push(box);
        world.scene.appendChild(box);

        setTimeout(() => {  document.querySelector('[raycaster]').components.raycaster.refreshObjects(); });
        var targetEl = document.querySelector('#box' + i);
        targetEl.addEventListener('click', function(event) {
            //TODO: what happens on a user click?
            console.log(event.srcElement.id.substring(3));
            for (var x = 0; x < that.options.length; x++){
                for (var y = 0; y  < world.scene.childNodes.length; y++){
                    if (that.options[x] === world.scene.childNodes[y]){
                        world.scene.removeChild(world.scene.childNodes[y]);
                        break;
                    }
                }
            }
        });

    }
}

