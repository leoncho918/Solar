var createMoon = function(name, radius, colour, orbit, speed, centreMass) {

  var geometry = new THREE.SphereGeometry(radius, 32, 32);
  var material = new THREE.MeshLambertMaterial({
    color: new THREE.Color(colour)
  });

  var moon = new THREE.Mesh(geometry, material);
  moon.userData.orbit = orbit;
  moon.userData.speed = speed;
  moon.userData.name = name;

  moon.castShadow = true;
  moon.receiveShadow = true;
  
  planets.forEach(function(planet) {
    if (planet.userData.name == centreMass) {
        moon.userData.centreMass = planet;
        planet.add(moon);
    }
  })

  moons.push(moon);

  var shape = new THREE.Shape();
  shape.moveTo(orbit, 0);
  shape.absarc(0, 0, orbit, 0, 2 * Math.PI, false);

  var spacedPoints = shape.createSpacedPointsGeometry(128);
  spacedPoints.rotateX(THREE.Math.degToRad(-90));
  var path = new THREE.Line(spacedPoints, new THREE.LineBasicMaterial({
    color: "white"
  }));
  
  moon.userData.path = path;
}
