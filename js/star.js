// Function to create new stars and add them to the scene, currently only supports one Star
var createStar = function(name, description, category, radius, colour, texture, luminosity) {
  // Create the geometry with the given radius and material with a map of the given texture needed for the mesh
  var geometry = new THREE.SphereGeometry(radius, 32, 32);
  var material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../img/textures/'+texture+'')
  });
  // Create the mesh
  var star = new THREE.Mesh(geometry, material);

  // Store star properties in userdata
  star.userData.name = name;
  star.userData.desc = description;
  star.userData.category = category;
  star.userData.colour = colour;

  // Create a point light with the given colour and of the given intensity
  var light = new THREE.PointLight(new THREE.Color(colour), luminosity);
  // Allow the light to cast shadows
  light.castShadow = true;;
  // Store the light in the star's userdata
  star.userData.light = light;
  // Add the point light to the star
  star.add(light);
  // Add the star to the array
  stars.push(star);
  // Add the star to the scene
  scene.add(star);
}
