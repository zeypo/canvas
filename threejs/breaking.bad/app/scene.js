var scene = function(app) {
    return {
        create: function() {
            app.width = window.innerWidth;
            app.height = window.innerHeight;

            app.scene = new THREE.Scene();
            app.scene.fog = new THREE.Fog(0xf7d9aa, 0, 950);

            app.aspectRatio = app.width / app.height;

            app.camera = new THREE.PerspectiveCamera(60, app.aspectRatio, 1, 1000);
            app.camera.position.x = 0;
            app.camera.position.y = 100;
            app.camera.position.z = 200;
            //app.camera.position.z = 5;

            app.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
            app.renderer.setSize(app.width, app.height);

            // Autorise le shadow rendering
            app.renderer.shadowMap.enabled = true;

            app.container = document.getElementById('world');
            app.container.appendChild(app.renderer.domElement);
        }
    };
};

module.exports = scene;
