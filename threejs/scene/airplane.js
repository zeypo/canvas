var scene,
    camera,
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane,
    WIDTH,
    HEIGHT,
    renderer,
    container,
    hemisphereLight,
    shadowLight;

var airplane,
    sea,
    sky;


var colors = {
	red: 0xf25346,
	white: 0xffffff,
	brown: 0x59332e,
	pink: 0xF5986E,
	brownDark: 0x23190f,
	blue: 0x68c3c0
};
var mousePos = {x: 0, y: 0};


/**
 * Crée l'element de la mer
 */
var Sea = function() {
    var geom = new THREE.CylinderGeometry(600,600,800,40,10); // radius-top, radius-bottom, height, segments-radius, segments-vertically

    // rotate la geometry des axes
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    // Combine les vertices afin d'assurer la continuiter de la vague
    geom.mergeVertices();

    var l = geom.vertices.length;

    this.waves = [];

    for (var i = 0; i < l; i++) {
        var w = geom.vertices[i];
        var wave = {
            x: w.x,
            y: w.y,
            z: w.z,
            ang: Math.random() * Math.PI * 2, // random angle for vertice
            amp: 5 + Math.random() * 15, // random distance
            speed: 0.016 + Math.random() * 0.032 // random speed between 0.016 and 0.048 radians / frame
        };

        this.waves.push(wave);
    }

    // Création du material
    var mat = new THREE.MeshPhongMaterial({color: colors.blue, transparent: true, opacity: 0.6, shading: THREE.FlatShading});

    // Pour créer un objet on à besoin de créer une mesh
    // Qui est la combinaison d'une forme (geom) et d'un material
    this.mesh = new THREE.Mesh(geom, mat);

    // Permet à la mer de recevoir les shadow
    this.mesh.receiveShadow = true;
};

Sea.prototype.moveWaves = function() {
    var vertices = this.mesh.geometry.vertices;
    var l = vertices.length;

    for (var i = 0; i < l; i++) {
        var v = vertices[i];
        var prop = this.waves[i];

        // update the position of the vertex
		v.x = prop.x + Math.cos(prop.ang)*prop.amp;
		v.y = prop.y + Math.sin(prop.ang)*prop.amp;

		// increment the angle for the next frame
		prop.ang += prop.speed;
    }

    // Tell the renderer that the geometry of the sea has changed.
	// In fact, in order to maintain the best level of performance,
	// three.js caches the geometries and ignores any changes
	// unless we add this line
	this.mesh.geometry.verticesNeedUpdate = true;

	sea.mesh.rotation.z += .005;
};

/**
 * Crée les nuages
 */
var Cloud = function() {
    this.mesh = new THREE.Object3D();

    // Création d'un carré qui sera dupliqué
    var geom = new THREE.BoxGeometry(20, 20, 20);
    var mat = new THREE.MeshPhongMaterial({color: colors.white});

    // Duplication de la geom par un nb aléatoire
    var nBlocs = 3+Math.floor(Math.random()*3);

    for (var i = 0; i < nBlocs; i++) {
        // Crée la mesh en clonant la géomatrie
        var m = new THREE.Mesh(geom, mat);

        // Set la position et l'inclinaison de chaques cubs random
        m.position.x = i*15;
		m.position.y = Math.random()*10;
		m.position.z = - 5 + (Math.random()*10);
		m.rotation.z = Math.random()*Math.PI*2;
		m.rotation.y = Math.random()*Math.PI*2;

        // Set la taille du cube de façon random
        var s = 0.1 + Math.random() * 0.9;
        m.scale.set(s, s, s);

        // Donne droit aux cube de recevoir et envoyer la lumière
        m.castShadow = true;
        m.setShadow = true;

        this.mesh.add(m);
    }
};

var Sky = function() {
    this.mesh = new THREE.Object3D();
    this.nClouds = 20;

    // On distribue les nuages sur un angle homogène
    var stepAngle = Math.PI * 2 / this.nClouds;

    // Crée les nuages
    for (var i = 0; i < this.nClouds; i++) {
        var c = new Cloud();

        var a = i * stepAngle; // l'angle final du nuage
        var h = 750 + Math.random() * 200; // Distance entre le centre de l'abscisse et le nuage

        // Conversion des coordonées polaires en coordonées cartesiennes
        c.mesh.position.x = Math.cos(a) * h;
        c.mesh.position.y = Math.sin(a) * h;

        // Rotate le nuage en fonction de sa position
        c.mesh.rotation.z = a + Math.PI / 2;

        // Positionne le nuage à une depth random
        c.mesh.position.z = -400 - Math.random() * 400;

        // Random scale pour chaques nuages
        var s = 1 + Math.random() * 2;
        c.mesh.scale.set(s, s, s);

        this.mesh.add(c.mesh);
    }
};

var Pilote = function() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = 'pilot';

    this.angleHairs = 0;

    // Body
    var geomPilot = new THREE.BoxGeometry(15, 15, 15);
    var matPilot = new THREE.MeshPhongMaterial({color: colors.brow, shading: THREE.FlatShading});
    var body = new THREE.Mesh(geomPilot, matPilot);

    body.position.set(2, -12, 0);
    this.mesh.add(body);

    // Face
    var geomFace = new THREE.BoxGeometry(10, 10, 10);
    var matFace = new THREE.MeshPhongMaterial({color: colors.pink});
    var face = new THREE.Mesh(geomFace, matFace);

    this.mesh.add(face);

    // One Hair element
    var geomHair = new THREE.BoxGeometry(4, 4, 4);
    var matHair = new THREE.MeshPhongMaterial({color: colors.brown});
    var hair = new THREE.Mesh(geomHair, matHair);

    // Align the shape of the hair to it's bottom boundary
    hair.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 2, 0));

    // Hairs container & Hairs animated
    var hairs = new THREE.Object3D();
    this.hairsTop = new THREE.Object3D();

    // Creat a grid (like matrix) of 3*4 for hairs
    for (var i = 0; i < 12; i++) {
        var h = hair.clone();
        var col = i % 3;
		var row = Math.floor(i / 3);
		var startPosZ = -4;
		var startPosX = -4;

        h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
		this.hairsTop.add(h);
    }

    hairs.add(this.hairsTop);

    // Hairs on the sides
    var hairSideGeom = new THREE.BoxGeometry(12,4,2);
    var hairMat = new THREE.MeshLambertMaterial({color:colors.brown});

    hairSideGeom.applyMatrix(new THREE.Matrix4().makeTranslation(-6,0,0));

    var hairSideR = new THREE.Mesh(hairSideGeom, hairMat);
	var hairSideL = hairSideR.clone();

    hairSideR.position.set(8,-2,6);
	hairSideL.position.set(8,-2,-6);
	hairs.add(hairSideR);
	hairs.add(hairSideL);

    // create the hairs at the back of the head
	var hairBackGeom = new THREE.BoxGeometry(2,8,10);
	var hairBack = new THREE.Mesh(hairBackGeom, hairMat);
	hairBack.position.set(-1,-4,0)
	hairs.add(hairBack);
	hairs.position.set(-5,5,0);

	this.mesh.add(hairs);

    var glassGeom = new THREE.BoxGeometry(5,5,5);
	var glassMat = new THREE.MeshLambertMaterial({color:colors.brown});
	var glassR = new THREE.Mesh(glassGeom,glassMat);
	glassR.position.set(6,0,3);
	var glassL = glassR.clone();
	glassL.position.z = -glassR.position.z

	var glassAGeom = new THREE.BoxGeometry(11,1,11);
	var glassA = new THREE.Mesh(glassAGeom, glassMat);
	this.mesh.add(glassR);
	this.mesh.add(glassL);
	this.mesh.add(glassA);

	var earGeom = new THREE.BoxGeometry(2,3,2);
	var earL = new THREE.Mesh(earGeom,matFace);
	earL.position.set(0,0,-6);
	var earR = earL.clone();
	earR.position.set(0,0,6);
	this.mesh.add(earL);
	this.mesh.add(earR);
};

Pilote.prototype.updateHairs = function() {
    // Get the hairs
    var hairs = this.hairsTop.children;
    var l = hairs.length;

    for (var i = 0; i < l; i++) {
        var h = hairs[i];

        h.scale.y = 0.75 + Math.cos(this.angleHairs + i / 3) * 0.25;
    }

    // Increment the angle
    this.angleHairs += 0.16;
};

/**
 * Shape de l'avion
 */
var AirPlane = function() {

    this.mesh = new THREE.Object3D();

    // Cabin
    var geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
    var matCockpit = new THREE.MeshPhongMaterial({color: colors.red, shading: THREE.FlatShading});
    var cockpit = new THREE.Mesh(geomCockpit, matCockpit);

    // Changements des vertices du cockpit
    geomCockpit.vertices[4].y -= 10;
    geomCockpit.vertices[4].z += 20;
    geomCockpit.vertices[5].y -= 10;
    geomCockpit.vertices[5].z -= 20;
    geomCockpit.vertices[6].y += 30;
    geomCockpit.vertices[6].z += 20;
    geomCockpit.vertices[7].y += 30;
    geomCockpit.vertices[7].z -= 20;

    cockpit.castShadow = true;
    cockpit.receiveShadow = true;

    this.mesh.add(cockpit);

    // Moteur
    var geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1 ,1);
    var matEngine = new THREE.MeshPhongMaterial({color: colors.white, shading: THREE.FlatShading});
    var engine = new THREE.Mesh(geomEngine, matEngine);

    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;

    this.mesh.add(engine);

    // Glass
    var geomGlass = new THREE.BoxGeometry(3, 7, 40, 1, 1, 1);
    var matGlass = new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.FlatShading, transparent: true, opacity: 0.3});
    var glass = new THREE.Mesh(geomGlass, matGlass);

    glass.position.x = 23;
    glass.position.y = 28;
    glass.receiveShadow = true;

    this.mesh.add(glass);


    // Queu
    var geomTail = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    var matTail = new THREE.MeshPhongMaterial({color: colors.red, shading: THREE.FlatShading});
    var tail = new THREE.Mesh(geomTail, matTail);

    tail.position.set(-35, 20, 0);
    tail.castShadow = true;
    tail.receiveShadow = true;

    this.mesh.add(tail);

    // Wings
    var geomWing = new THREE.BoxGeometry(40, 8, 150 ,1 ,1 ,1);
    var matWing = new THREE.MeshPhongMaterial({color: colors.red, shading: THREE.FlatShading});
    var wing = new THREE.Mesh(geomWing, matWing);

    wing.receiveShadow = true;
    wing.castShadow = true;

    this.mesh.add(wing);

    // Propeller
    var geomPropeller = new THREE.BoxGeometry(20,10,10,1,1,1);
    var matPropeller = new THREE.MeshPhongMaterial({color:colors.brown, shading:THREE.FlatShading});

    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    // blades
    var geomBlade = new THREE.BoxGeometry(1,100,20,1,1,1);
    var matBlade = new THREE.MeshPhongMaterial({color:colors.brownDark, shading:THREE.FlatShading});
    var blade = new THREE.Mesh(geomBlade, matBlade);

    blade.position.set(8,0,0);
    blade.castShadow = true;
    blade.receiveShadow = true;

    this.propeller.add(blade);
    this.propeller.position.set(50,0,0);

    this.mesh.add(this.propeller);

    // Add the pilot
    this.pilote = new Pilote();

    this.pilote.mesh.position.y = 30;

    this.mesh.add(this.pilote.mesh);
};

/**
 * Crée la scene de base
 */
function createScene() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    scene = new THREE.Scene();

    scene.fog = new THREE.Fog(0xf7d9aa, 0, 950);

    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 1000;

    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.position.x = 0;
    camera.position.y = 100;
    camera.position.z = 200;

    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(WIDTH, HEIGHT);

    // Autorise le shadow rendering
    renderer.shadowMap.enabled = true;

    container = document.getElementById('world');
    container.appendChild(renderer.domElement);

    // Update les variables et la camera en cas de resize
    window.addEventListener('resize', handleResize, true);
}

/**
 * Créer les lumières de la scene
 */
function createLights() {
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9) // sky-color, ground-color, intensity of light
    shadowLight = new THREE.DirectionalLight(0xffffff, 0.9); // color, intensity

    shadowLight.position.set(150, 350, 350);
    shadowLight.castShadow = true;

    // Définit la partie visible de la shadowLight
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

    // Définition de la resolution de la shadow
    // Le plus haut est le mieux mais aussi le plus coûteux
    shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

    // On ajout la shadow à la scene
    scene.add(hemisphereLight);
    scene.add(shadowLight);
}

/**
 * Créer la mer
 */
function createSea() {
    sea = new Sea();
    sea.mesh.position.y = -600;
    scene.add(sea.mesh);
}

function createSky() {
	sky = new Sky();
	sky.mesh.position.y = -600;
	scene.add(sky.mesh);
}

function createPlane() {
	airplane = new AirPlane();
	airplane.mesh.scale.set(.40,.40,.40);
	airplane.mesh.position.y = 100;
    //airplane.mesh.scale.set(1, 1, 1);

    //airplane.pilote.mesh.z = 0;
    //airplane.pilote.mesh.x = 4;
    //airplane.pilote.mesh.y = 0;

    //airplane.mesh.rotation.y = -0.5;
    //airplane.mesh.rotation.z = -0.4;

    scene.add(airplane.mesh);
}

/**
 * Update la scene et la variable en case de resize de la scene
 */
function handleResize() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

window.addEventListener('load', init, false);

function init() {
	// set up the scene, the camera and the renderer
	createScene();

	// add the lights
	createLights();

	// add the objects
	createPlane();
	createSea();
	createSky();

    document.addEventListener('mousemove', handleMouseMove, false);

	// start a loop that will update the objects' positions
	// and render the scene on each frame
	loop();
}

function loop() {
    airplane.propeller.rotation.x += 0.3;
    airplane.pilote.updateHairs();
    sea.mesh.rotation.z += 0.005;
    sea.moveWaves();
    sky.mesh.rotation.z += 0.01;

    updatePlane();

	requestAnimationFrame(loop);
	renderer.render(scene, camera);
}

function handleMouseMove(event) {
    // converting mouse value in a value between -1 and 1
    var tx = -1 + (event.clientX / WIDTH) * 2;
    var ty = 1 - (event.clientY / HEIGHT) * 2;

    mousePos = { x: tx, y: ty };
};

function updatePlane() {
    var targetX = normalize(mousePos.x, -1, 1, -100, 100);
	var targetY = normalize(mousePos.y, -1, 1, 25, 175);

	// update the airplane's position
	airplane.mesh.position.y = targetY;
	airplane.mesh.position.x = targetX;
	airplane.propeller.rotation.x += 0.3;
}

function normalize(v,vmin,vmax,tmin, tmax){
	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);

    return tv;
}
