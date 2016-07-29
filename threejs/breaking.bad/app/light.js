var light = function(app) {

    return {
        hemisphereLight: null,
        shadowLight: null,

        create: function() {
            this.hemisphereLight = new THREE.HemisphereLight(0x5E5E5E,0x000000, .9) // sky-color, ground-color, intensity of light
            this.shadowLight = new THREE.DirectionalLight(0xffffff, 0.9); // color, intensity

            this.shadowLight.position.set(app.width, app.height, 100);
            this.shadowLight.castShadow = true;

            // Définit la partie visible de la this
            this.shadowLight.shadow.camera.left = -400;
            this.shadowLight.shadow.camera.right = 400;
            this.shadowLight.shadow.camera.top = 400;
            this.shadowLight.shadow.camera.bottom = -400;
            this.shadowLight.shadow.camera.near = 1;
            this.shadowLight.shadow.camera.far = 1000;

            // Définition de la resolution de la shadow
            // Le plus haut est le mieux mais aussi le plus coûteux
            this.shadowLight.shadow.mapSize.width = 2048;
            this.shadowLight.shadow.mapSize.height = 2048;

            // On ajout la shadow à la scene
            app.scene.add(this.hemisphereLight);
            app.scene.add(this.shadowLight);
        }

    }

};

module.exports = light;
