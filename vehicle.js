
// Vehicle is a cylinder shaped like a cone
function Vehicle() {
    this.mesh = BABYLON.MeshBuilder.CreateCylinder("indicator", { height: 1, diameterTop: 0, diameterBottom: 0.5 }, scene);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.bakeCurrentTransformIntoVertices();

    // create a location that is randomly within the bounds of a world
    // that is centered on 0,0,0
    var x = Math.random() * (world.right-world.left) - world.right;
    var y = Math.random() * (world.top-world.bottom) - world.top;
    var z = Math.random() * (world.back-world.front) - world.back;
    this.mesh.position.set(x,y,z);


    this.vel = new BABYLON.Vector3((Math.random()*.2)-.1,
            (Math.random()*.2)-.1, (Math.random()*.2)-.1);
    this.acc = new BABYLON.Vector3(0,0,0);
    }

Vehicle.prototype.update = function() {
    this.checkEdges();
    this.limit(this.acc, .001);
    this.vel.addInPlace(this.acc);
    this.acc.set(0,0,0);
    this.limit(this.vel, 0.1);
    this.mesh.position.addInPlace(this.vel);
    var target = this.vel.normalizeToNew().scaleInPlace(2).addInPlace(this.mesh.position);
    this.mesh.lookAt(target);

}

Vehicle.prototype.applyForce = function(v) {
    this.acc.addInPlace(v);
}

// Vector3 should have but does not apparently have a limit method
// so do it here, limiting to a scalar the length of a vector
Vehicle.prototype.limit = function(v,s){
    if(v.lengthSquared() > (s*s)){
        v.normalize().scaleInPlace(s);
    }
}

// checkEdges --
// Keep each vehicle within the confines of the world cube.
// When a vehicle gets close to one of the sides of the world cube,
// use the difference between the vehicles velocity and a vector
// towards the side to steer the vehicle away from the nearby side.

Vehicle.prototype.checkEdges = function(){
    if((world.right - this.mesh.position.x)< 2) {
        // create a vector towards the right edge the same length
        // as the current velocity
        var ref = new BABYLON.Vector3(1,0,0).scaleInPlace(this.vel.length());
        var diff = this.vel.subtract(ref);
        this.applyForce(diff);
    }
    if((this.mesh.position.x - world.left)< 2) {
        // create a vector towards the left edge the same length
        // as the current velocity
        var ref = new BABYLON.Vector3(-1,0,0).scaleInPlace(this.vel.length());
        var diff = this.vel.subtract(ref);
        this.applyForce(diff);
    }
    if((this.mesh.position.y - world.bottom)< 1.5) {
        // create a vector towards the bottom edge the same length
        // as the current velocity
        var ref = new BABYLON.Vector3(0,-1,0).scaleInPlace(this.vel.length());
        var diff = this.vel.subtract(ref);
        this.applyForce(diff);
    }
    if((world.top - this.mesh.position.y)< 1.5) {
        // create a vector towards the top edge the same length
        // as the current velocity
        var ref = new BABYLON.Vector3(0,1,0).scaleInPlace(this.vel.length());
        var diff = this.vel.subtract(ref);
        this.applyForce(diff);
    }
    if((world.back - this.mesh.position.z)< 1) {
        // create a vector towards the back edge the same length
        // as the current velocity
        var ref = new BABYLON.Vector3(0,0,1).scaleInPlace(this.vel.length());
        var diff = this.vel.subtract(ref);
        this.applyForce(diff);
    }
    if((this.mesh.position.z - world.front)< 1) {
        // create a vector towards the front edge the same length
        // as the current velocity
        var ref = new BABYLON.Vector3(0,0,-1).scaleInPlace(this.vel.length());
        var diff = this.vel.subtract(ref);
        this.applyForce(diff);
    }

}
