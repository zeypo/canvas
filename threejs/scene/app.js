var w = window.innerWidth;
var h = window.innerHeight;

// Création de l'environnement
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

renderer.setSize(w, h);

document.body.appendChild(renderer.domElement); // Ajoute le renderer au DOM

// Création d'un cube
var geometry = new THREE.BoxGeometry(1, 1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);

scene.add(cube); // On ajoute notre cube à la scene

camera.position.z = 5;

// Rend la scene
function render() {

    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;
    cube.scale += 0.01;

	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

render();
