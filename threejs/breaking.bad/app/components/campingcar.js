var Car = function(app) {
    this.mesh = new THREE.Object3D();

    var geom = new THREE.BoxGeometry(50, 50, 50);
    var mat = new THREE.MeshBasicMaterial({color: app.colors.van.lightBeige});
    var box = new THREE.Mesh(geom, mat);

    box.receiveShadow = true;
    box.castShadow = true;

    box.position.y = 1;
    box.position.x = 0;
    box.position.z = -100;

    this.mesh.add(box);
};

module.exports = Car;
