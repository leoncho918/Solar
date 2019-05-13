var points = [];

function generatePlanets() {
  var distances = [];
  var planets = [];
  var sun_point = new THREE.Object3D();
  var earth_point = new THREE.Object3D();

  //Adding distances to array
  distances.push(100);
  distances.push(15);
  //Sun
  var sun_mesh = new Star(10, "rgb(255, 153, 51)");
  var light = new THREE.PointLight(new THREE.Color(1, 1, 1), 2);
  sun_mesh.add(light)
  scene.add(sun_mesh);

  //Create meshes
  var earth_mesh = new Planet(3, "rgb(66, 134, 244)");
  var moon_mesh = new Planet(1, "rgb(166, 166, 166)");

  //Attach points to meshes
  sun_mesh.add(sun_point);
  earth_mesh.add(earth_point);

  //Add planets to array
  planets.push(earth_mesh);
  planets.push(moon_mesh);

  //Add points to array
  points.push(sun_point);
  points.push(earth_point);

  //Set planet positions
  planets[0].position.set(distances[0], 0 , 0);
  planets[1].position.set(distances[1], 0 , 0);

  //Adding orbits
  points[0].add(earth_mesh);
  points[1].add(moon_mesh);
}
