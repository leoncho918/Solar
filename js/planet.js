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

  var shape = new THREE.Shape();
  shape.moveTo(orbit, 0);
  shape.absarc(0, 0, orbit, 0, 2 * Math.PI, false);

  var spacedPoints = shape.createSpacedPointsGeometry(128);
  spacedPoints.rotateX(THREE.Math.degToRad(-90));
  var path = new THREE.Line(spacedPoints, new THREE.LineBasicMaterial({
    color: "white"
  }));
  
  planet.userData.path = path;

  scene.add(planet);
}
