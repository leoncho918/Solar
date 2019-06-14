// Function to create new planets and add them to the scene
var createPlanet = function(name, description, category, radius, colour, texture, orbit, speed, rotation) {
  // Create the geometry with the given radius and material with a map of the given texture needed for the mesh
  var geometry = new THREE.SphereGeometry(radius, 32, 32);
  var material = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('img/textures/'+texture+''),
    shininess: 0
  });
  // Create the mesh
  var planet = new THREE.Mesh(geometry, material);

  // Store planet properties in userdata
  planet.userData.orbit = orbit;
  planet.userData.speed = speed;
  planet.userData.name = name;
  planet.userData.desc = description;
  planet.userData.category = category;
  planet.userData.colour = colour;
  planet.userData.rotation = rotation;

  // Make the mesh receive shadows and cast shadows
  planet.castShadow = true;
  planet.receiveShadow = true;
  // Add the planet mesh to the array
  planets.push(planet);

  // If the planet name is Saturn then add a ring to it
  if (name == "Saturn") {
    // Create the geometry and material for the mesh
    var ring_geometry = new THREE.RingGeometry(6, 10, 30, 1);
    var ring_material = new THREE.MeshLambertMaterial({
      color: new THREE.Color(colour),
      side: THREE.DoubleSide
    })
    // Create the ring mesh
    var ring_mesh = new THREE.Mesh(ring_geometry, ring_material);
    // Rotate the ring so it's angled
    ring_mesh.rotation.x = 1;
    ring_mesh.rotation.y = 0.75;

    // Make the ring receive shadows and cast shadows
    ring_mesh.castShadow = true;
    ring_mesh.receiveShadow = true;
    // Disable rotation for saturn so that ring won't spin
    planet.userData.rotation = 0;
    // Add the ring to the mesh
    planet.add(ring_mesh);
  }
  // Add the mesh to the scene
  scene.add(planet);
}
