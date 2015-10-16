var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var VIEW_ANGLE = 45;
var ASPECT     = WIDTH / HEIGHT;
var NEAR       = 0.1;
var FAR        = 1000;

var container = document.getElementById('container');

var renderer = new THREE.WebGLRenderer();
var camera   = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
var scene    = new THREE.Scene();

var texture = THREE.ImageUtils.loadTexture( "particlebis.png" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );

// Initialisation des particules
var particlesLength = 1000;
var particles       = new THREE.Geometry();
var pMaterial       = new THREE
    .PointsMaterial({
        color       : 0xFFFFFF,
        size        : 20,
//        map         : texture
    });

// Création des particules
for(var p = 0; p < particlesLength; p++) {

    var posx = (Math.random() * WIDTH) - WIDTH/2;
    var posy = (Math.random() * HEIGHT) - HEIGHT/2;
    var posz = (Math.random() * 500) - 250;
    var particle = new THREE.Vector3(posx, posy, posz);

    // On push dans le vertice (groupe de l'entités particules)
    particles.vertices.push(particle);

}

// Créer le particule system
var particleSystem = new THREE.Points(particles, pMaterial);
particleSystem.sortParticles = true;

// Ajout du system de particule à la scene
renderer.setSize(WIDTH, HEIGHT);
camera.position.z = 300;
container.appendChild(renderer.domElement);

scene.add(camera);
scene.add(particleSystem);

// Render
renderer.render(scene, camera);
