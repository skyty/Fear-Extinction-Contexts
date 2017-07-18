/**
 * Created by skyzn on 6/16/2017.
 */
var world;
var rockArray = [];

var camera;

var frameTime = 0;

var cueTimes = [180, 600, 1100];
var cuePosition = 0;


function setup() {
    noCanvas();

    world = new World('context-1');
    world.setUserPosition(0, 3, 0);
    camera = document.querySelector('#screenCamera');

    var ground = new Plane({
        x:0, y:0, z:0,
        width:700, height:700,
        rotationX:-90,
        asset: 'snow',
        repeatX:200, repeatY:200
    });
    world.add(ground);

    createRocks(100);

    shockBox = new ShockBox();

    // startTime = millis()/1000;

}

function draw() {


    if (mouseIsPressed) {
        world.moveUserForward(1);
    }

    updatePosition();


    if (frameCount >= cueTimes[cuePosition]) {
        if (frameCount === cueTimes[cuePosition]) {
            frameTime = frameCount;
        }
        shockBox.decideShock();
        if (frameCount - frameTime <= 50) {
            shockBox.boxDrop();
        }
        if (frameCount - frameTime > 60 && frameCount - frameTime <= 120) {
            shockBox.showCue();
        }
        if (frameCount - frameTime > 360 && frameCount - frameTime <= 362) {
            shockBox.reset();
            if(cueTimes.length - cuePosition >= 2) {
                cuePosition += 1;
            }
        }
    }
}

function createRocks(n) {
    for(var i=0; i<n; i++) {
        rockArray.push(new Rock(random(-350, 350), random(-350, 350)));
    }
}

function updatePosition() {
    for(i = 0; i < rockArray.length; i++) {

        if(dist(world.getUserPosition().x, world.getUserPosition().z, rockArray[i].getXPos(), rockArray[i].getZPos()) < 4) {
            world.setUserPosition(world.getUserPosition().x + 2, world.getUserPosition().y, world.getUserPosition().z + 2);
        }
    }

    if (world.getUserPosition().x < -220 || world.getUserPosition().x > 220 || world.getUserPosition().z < -220 || world.getUserPosition().z > 220){
        world.setUserPosition(0, world.getUserPosition().y, 200);
    }
}