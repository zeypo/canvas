// set the scene size
var WIDTH = 400;
var HEIGHT = 300;

// set some camera attributes
var VIEW_ANGLE = 45;
var ASPECT     = WIDTH / HEIGHT;
var NEAR       = 0.1;
var FAR        = 10000;

var container = document.getElementById('container');

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var camera   = new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);

var scene = new THREE.Scene();

// add the camera to the scene
scene.add(camera);

// the camera starts at 0,0,0
// so pull it back
camera.position.z = 300;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
container.appendChild(renderer.domElement);

/**
 * Création d'une sphère
 */
var radius   = 50;
var segments = 16;
var rings    = 16;
var sphereMaterial = {
    color : 0xCC0000
};

// Création d'une mèche avec la géometrie d'une sphère
var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, rings),
    new THREE.MeshLambertMaterial(sphereMaterial)
);

// Allow la modification de la sphère
sphere.geometry.dynamic = true;

// Création d'une lumière blanche
var pointLight =
  new THREE.PointLight(0xFFFFFF);

// Positionement de la lumière
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// Ajout à la scene
scene.add(pointLight);
scene.add(sphere);

sphere.scale.x = 2;
sphere.scale.y = 2;
sphere.scale.z = 2;

// Render
renderer.render(scene, camera);
