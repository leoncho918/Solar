var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
// var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.1, 1000 );

camera.position.set(0,0,7);
camera.lookAt(0,0,1);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry( 1, 1, 1);
var material = new THREE.MeshBasicMaterial();
material.wireframe = true;
material.color = new THREE.Color(1,0,0);
var cube = new THREE.Mesh( geometry, material );
cube.position.x-=1;
cube.position.y-=0.3;

scene.add( cube );
renderer.render(scene, camera);
