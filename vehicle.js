
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

    }

Vehicle.prototype.update = function() {
    this.mesh.position.addInPlace(this.vel);
    this.checkEdges();
    var target = this.vel.normalizeToNew().scaleInPlace(2).addInPlace(this.mesh.position);
    this.mesh.lookAt(target);

}

Vehicle.prototype.checkEdges = function(){
    // wrap around when the vehicle exits the world cube
    if(this.mesh.position.x >= world.right)
        this.mesh.position.x = world.left;
    else if(this.mesh.position.x <= world.left)
        this.mesh.position.x = world.right;
    if(this.mesh.position.y >= world.top)
        this.mesh.position.y = world.bottom;
    else if(this.mesh.position.y <= world.bottom)
        this.mesh.position.y = world.top;
    if(this.mesh.position.z >= world.back)
        this.mesh.position.z = world.front;
    else if(this.mesh.position.z <= world.front)
        this.mesh.position.z = world.back;
}
