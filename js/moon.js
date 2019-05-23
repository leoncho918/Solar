var createMoon = function(name, description, radius, colour, orbit, speed, centreMass) {

  var geometry = new THREE.SphereGeometry(radius, 32, 32);
  var material = new THREE.MeshLambertMaterial({
    color: new THREE.Color(colour)
  });

  var moon = new THREE.Mesh(geometry, material);
  moon.userData.orbit = orbit;
  moon.userData.speed = speed;
  moon.userData.name = name;
  moon.userData.desc = description;

  moon.castShadow = true;
  moon.receiveShadow = true;
  
  planets.forEach(function(planet) {
    if (planet.userData.name == centreMass) {
        moon.userData.centreMass = planet;
        planet.add(moon);
    }
  })

  moons.push(moon);
}
