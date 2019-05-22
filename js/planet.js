var createPlanet = function(name, radius, colour, orbit, speed) {

  var geometry = new THREE.SphereGeometry(radius, 32, 32);
  var material = new THREE.MeshLambertMaterial({
    color: new THREE.Color(colour)
  });

  var planet = new THREE.Mesh(geometry, material);

  planet.userData.orbit = orbit;
  planet.userData.speed = speed;
  planet.userData.name = name;

  planet.castShadow = true;
  planet.receiveShadow = true;

  planets.push(planet);

  scene.add(planet);
}
