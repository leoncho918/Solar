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
    if (planet.userData.name == centreMass)
        planet.add(moon);
  })

  moons.push(moon);

  var shape = new THREE.Shape();
  shape.moveTo(orbit, 0);
  shape.absarc(0, 0, orbit, 0, 2 * Math.PI, false);
}