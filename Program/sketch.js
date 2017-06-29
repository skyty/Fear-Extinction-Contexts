/**
 * Created by skyzn on 6/1/2017.
 */
var world;

function setup(){
    noCanvas();

    world = new World('world');

    // var ground = new Plane({
    //     x:0, y:0, z:0,
    //     width:500, height:500,
    //     rotationX:-90,
    //     repeatX:50, repeatY:50
    // });
    // world.add(ground);

}


function draw() {
    if (mouseIsPressed || touchIsDown) {
        world.moveUserForward(0.1);
    }
}
