/**
 * Created by skyzn on 6/16/2017.
 */


var world;
var treeArray = [];

var screenCamera;

var frameTime = 0;

var cueTimes = [180, 600, 1100];
var cuePosition = 0;


function setup() {
    noCanvas();
    world = new World('context-1');
    world.setUserPosition(0, 3, 0);
    loadRatingAsset(world);
    screenCamera = document.querySelector('#screenCamera');

    var ground = new Plane({
        x:0, y:0, z:0,
        width:500, height:500,
        rotationX:-90,
        asset:'grass',
        repeatX:150, repeatY:150
    });
    world.add(ground);

    createTrees(100);


    shockBox = new ShockBox();

    // startTime = millis()/1000;
    rateMe(world, world.getUserPosition());
}

function draw() {

    // if (mouseIsPressed) {
    //     world.moveUserForward(1);
    // }

    updatePosition();


    // if (frameCount >= cueTimes[cuePosition]) {
    //     if (frameCount === cueTimes[cuePosition]) {
    //         frameTime = frameCount;
    //     }
    //     shockBox.decideShock();
    //     if (frameCount - frameTime <= 50) {
    //         shockBox.boxDrop();
    //     }
    //     if (frameCount - frameTime > 60 && frameCount - frameTime <= 120) {
    //         shockBox.showCue();
    //     }
    //     if (frameCount - frameTime > 360 && frameCount - frameTime <= 362) {
    //         shockBox.reset();
    //         if(cueTimes.length - cuePosition >= 2) {
    //             cuePosition += 1;
    //         }
    //     }
    // }
}

function createTrees(n) {
    for(var i=0; i<n; i++) {
        treeArray.push(new Tree(random(-250, 250), random(-250, 250)));
    }
}

function updatePosition() {
    for(i = 0; i < treeArray.length; i++) {

        if(dist(world.getUserPosition().x, world.getUserPosition().z, treeArray[i].getXPos(), treeArray[i].getZPos()) < 8) {
            world.setUserPosition(world.getUserPosition().x + 4, world.getUserPosition().y, world.getUserPosition().z + 4);
        }
    }

    if (world.getUserPosition().x < -220 || world.getUserPosition().x > 220 || world.getUserPosition().z < -220 || world.getUserPosition().z > 220){
        world.setUserPosition(0, world.getUserPosition().y, 200);
    }
}