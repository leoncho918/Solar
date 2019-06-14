var createPlanet = function(name, description, category, radius, colour, texture, orbit, speed, rotation) {

  var geometry = new THREE.SphereGeometry(radius, 32, 32);
  var material = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('img/textures/'+texture+''),
    shininess: 0
  });

  var planet = new THREE.Mesh(geometry, material);

  planet.userData.orbit = orbit;
  planet.userData.speed = speed;
  planet.userData.name = name;
  planet.userData.desc = description;
  planet.userData.category = category;
  planet.userData.colour = colour;
  planet.userData.rotation = rotation;

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

    ring_mesh.castShadow = true;
    ring_mesh.receiveShadow = true;

    planet.userData.rotation = 0;

    planet.add(ring_mesh);
  }

  scene.add(planet);
}
