/**
 * Created by skyzn on 6/17/2017.
 */


function Tree(x, z) {
    this.container = new Container3D({
        x:x, y:2, z:z,
        scaleX:random(3, 4),
        scaleY:random(2, 6),
        scaleZ:random(3, 4)
    });
    world.add(this.container);

    this.trunk1 = new Box({
        red:81, green:50, blue:26,
        height:11, width:random(1,1.5), depth:random(1,1.5),
        y:0
    });
    this.trunk2 = new Cylinder({
        red:81, green:50, blue:26,
        radius:random(0.5,0.8),
        height:11,
        y:0
    });
    this.leavesCluster = new Container3D({
        y:9
    });
    this.container.addChild(this.leavesCluster);
    this.cluster1 = new Sphere({
        red:random(2, 124), green:random(80, 200), blue:random(0, 80),
        repeatX:5, repeatY:5,
        radius:random(4, 7)
    });
    this.cluster2 = new Sphere({
        red:random(2, 124), green:random(80, 200), blue:random(0, 80),
        radius:random(0.2, 5),
        x:random(-2,2), y:random(-2,2), z: random(-2,2)
    });
    this.cluster3 = new Sphere({
        red:random(2, 124), green:random(80, 200), blue:random(0, 80),
        radius:random(0.2, 5),
        x:random(-2,2), y:random(-2,2), z: random(-2,2)
    });
    this.cluster4 = new Sphere({
        red:random(2, 124), green:random(80, 200), blue:random(0, 80),
        radius:random(0.2, 5),
        x:random(-2,2), y:random(-2,2), z: random(-2,2)
    });
    this.leavesCluster.addChild(this.cluster1);
    this.leavesCluster.addChild(this.cluster2);
    this.leavesCluster.addChild(this.cluster3);
    this.leavesCluster.addChild(this.cluster4);

    this.container.addChild(this.trunk1);
    this.container.addChild(this.trunk2);


    this.getXPos = function() {
        return this.container.x;
    };
    this.getZPos = function() {
        return this.container.z;
    };
}