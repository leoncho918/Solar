var createMoon = function(name, description, category, radius, colour, texture, orbit, speed, centreMass) {

  var geometry = new THREE.SphereGeometry(radius, 32, 32);
  var material = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('../img/textures/'+texture+'')
  });

  var moon = new THREE.Mesh(geometry, material);
  moon.userData.orbit = orbit;
  moon.userData.speed = speed;
  moon.userData.name = name;
  moon.userData.desc = description;
  moon.userData.category = category;
  moon.userData.colour = colour;

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
