var Ground = function(app) {
    this.mesh = new THREE.Object3D();

    var geom = new THREE.BoxGeometry(app.width, 300, 100, 30, 30, 30);
    var mat = new THREE.MeshBasicMaterial({color: app.colors.ground});

    geom.mergeVertices();

    var l = geom.vertices.length;

    for (var i = 0; i < l; i++) {
        var w = geom.vertices[i];
        var wave = {
            x: app.maths.random(10, 60) + w.x,
            y: app.maths.random(10, 60) + w.y,
            z: app.maths.random(10, 60) + w.z,
        };

        geom.vertices[i] = wave;
    }

    geom.verticesNeedUpdate = true;

    var box = new THREE.Mesh(geom, mat);

    box.receiveShadow = true;
    box.castShadow = true;

    box.position.z = -200;

    this.mesh.add(box);
};

module.exports = Ground;
