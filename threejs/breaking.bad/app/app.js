(function() {
    'use strict';

    var colors = require('./utils/colors');
    var maths = require('./utils/math');

    var app = {
        colors: colors,
        maths: maths,
        scene: null,
        camera: null,
        aspectRatio: null,
        width: null,
        height: null,
        renderer: null,
        car: null,

        init: function() {
            scene.create();
            light.create();

            this.controls = new THREE.OrbitControls(app.camera);
            this.controls.addEventListener('change', app.render);

            this.car = new Car(app);
            this.scene.add(this.car.mesh);

            this.ground = new Ground(app);
            this.scene.add(this.ground.mesh);

            this.ground.mesh.position.y = -250;

            app.render();
            app.loop();
        },

        loop: function() {
            requestAnimationFrame(app.loop);

            app.controls.update();
            // app.car.mesh.rotation.x += 0.01;
            // app.car.mesh.rotation.y += 0.01;
            //
            //events(app.camera, app.scene, app.container);
        },

        render: function() {
            app.renderer.render(app.scene, app.camera);
        }
    };

    var scene = require('./scene')(app);
    var light = require('./light')(app);
    var Car = require('./components/campingcar');
    var Ground = require('./components/ground.js');

    app.init();

})();
