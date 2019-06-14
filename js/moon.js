// Function to create new moons and add them to the scene
var createMoon = function(name, description, category, radius, colour, texture, orbit, speed, centreMass) {
  // Create the geometry with the given radius and material with a map of the given texture needed for the mesh
  var geometry = new THREE.SphereGeometry(radius, 32, 32);
  var material = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('img/textures/'+texture+''),
    shininess: 0
  });
  // Create the mesh
  var moon = new THREE.Mesh(geometry, material);

  // Store moon properties in userdata
  moon.userData.orbit = orbit;
  moon.userData.speed = speed;
  moon.userData.name = name;
  moon.userData.desc = description;
  moon.userData.category = category;
  moon.userData.colour = colour;

  // Make the mesh receive shadows and cast shadows
  moon.castShadow = true;
  moon.receiveShadow = true;

  // Search for the planet with the same name as the moon's given center planet and add the moon to the planet
  planets.forEach(function(planet) {
    if (planet.userData.name == centreMass) {
        moon.userData.centreMass = planet;
        planet.add(moon);
    }
  })
  // Add the moon to the array
  moons.push(moon);
}
