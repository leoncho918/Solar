var planets = [];
var distances = [];
var orbits = [];
var light;

function generatePlanets() {

  orbits.push(Date.now()*0.0001);
  orbits.push(Date.now()*0.0001);

  //Adding distances to array
  distances.push(100);
  distances.push(15);
  //Sun
  var sun_mesh = new Star(10, "rgb(255, 153, 51)");
  light = new THREE.PointLight(new THREE.Color("rgb(255, 153, 51)"), 2);
  sun_mesh.add(light)

  //Create meshes
  var earth_mesh = new Planet(3, "rgb(66, 134, 244)");
  var moon_mesh = new Planet(1, "rgb(166, 166, 166)");

  earth_mesh.position.set(Math.cos(orbits[0]) *  distances[0],
                          0, Math.sin(orbits[0]) * distances[0]);

  //Add planets to array
  planets.push(sun_mesh);
  planets.push(earth_mesh);
  planets.push(moon_mesh);

  //Set planet positions
  //planets[1].position.set(distances[0], 0 , 0);
  planets[2].position.set(distances[1], 0 , 0);

  scene.add(planets[0]);
}
