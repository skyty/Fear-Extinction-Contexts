/**
 * Created by skyzn on 6/18/2017.
 */

function ShockBox() {

    this.camera = document.querySelector("#screenCamera");
    this.container = new Container3D({
        y: 3.5
    });
    this.camera.appendChild(this.container.tag);

    this.box = new Box({
        x:0, y:-1, z:-2,
        width: 0.5, height:0.5, depth:0.5,
        red:206, green:179, blue:138,
        asset: "cardboard"
    });

    this.lid = new Plane( {
        x:0, y:-0.75, z:-2,
        rotationX:-90,
        width: 0.5, height:0.5,
        red:45, green:21, blue:4,
        opacity:0
    });

    this.cue = new Cylinder({
        x:0, y:-1, z:-2,
        height:0.1, radius:0.22,
        rotationX:90,
        red:0, green:0, blue:0
    });
    this.container.addChild(this.box);
    this.container.addChild(this.cue);
    this.container.addChild(this.lid);

    this.boxDrop = function() {
        this.container.nudge(0, -0.065, 0);
    };

    this.decideShock = function() {
        this.cue.setRed(255);
    };

    this.decideNeut = function() {
        this.cue.setGreen(255);
    };

    this.showCue = function() {
        this.lid.setOpacity(1);
        this.cue.nudge(0, 0.02, 0);

    };
    this.reset = function() {
        this.cue.setY(-1);
        this.container.setY(3.5);
        this.cue.setGreen(0);
        this.cue.setRed(0);
        this.lid.setOpacity(0);
    }
}