/**
 * Created by skyzn on 6/17/2017.
 */


function Rock(x, z) {
    this.rock = new Dodecahedron({
        radius: random(0.1, 3),
        x:x, z:z, y:0,
        red:random(150, 160), green:random(130, 150), blue: random(120, 130),
        rotationZ:200, rotationX:200, rotationY:200,
        roughness:1
    });
    world.add(this.rock);

    this.getXPos = function() {
        return this.rock.x;
    };
    this.getZPos = function() {
        return this.rock.z;
    };
}