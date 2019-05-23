var createPlanet = function(name, description, category, radius, colour, orbit, speed) {

  var geometry = new THREE.SphereGeometry(radius, 32, 32);
  var material = new THREE.MeshLambertMaterial({
    color: new THREE.Color(colour)
  });

  var planet = new THREE.Mesh(geometry, material);

  planet.userData.orbit = orbit;
  planet.userData.speed = speed;
  planet.userData.name = name;
  planet.userData.desc = description;
  planet.userData.category = category;
  planet.userData.colour = colour;

  planet.castShadow = true;
  planet.receiveShadow = true;

  planets.push(planet);

  if (name == "Saturn") {
    var ring_geometry = new THREE.RingGeometry(6, 10, 30, 1);
    var ring_material = new THREE.MeshLambertMaterial({
      color: new THREE.Color(colour),
      side: THREE.DoubleSide
    })
    var ring_mesh = new THREE.Mesh(ring_geometry, ring_material);
    ring_mesh.rotation.x = 1;
    ring_mesh.rotation.y = 0.75;
    planet.add(ring_mesh);
  }

  scene.add(planet);
}
