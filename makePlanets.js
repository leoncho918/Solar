var planets = [];
var moons = [];
var sun_mesh
var light;

function generatePlanets() {
  //Sun
  sun_mesh = new Star(10, "rgb(255, 153, 51)");
  light = new THREE.PointLight(new THREE.Color("rgb(255, 153, 51)"), 2);
  sun_mesh.add(light)

  //Create meshes
  createPlanet("Earth", 3, "rgb(66, 134, 244)", 30, 4);
  createPlanet("Moon", 1, "rgb(166, 166, 166)", 40, 4);

  scene.add(sun_mesh);
}
