var createStar = function(name, description, category, radius, colour, texture, luminosity) {

  var geometry = new THREE.SphereGeometry(radius, 32, 32);
  var material = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load('../img/textures/'+texture+''),
    emissive: new THREE.Color(colour)
  });

  var star = new THREE.Mesh(geometry, material);
  star.userData.name = name;
  star.userData.desc = description;
  star.userData.category = category;
  star.userData.colour = colour;

  var light = new THREE.PointLight(new THREE.Color(colour), luminosity);
  light.castShadow = true;;

  star.userData.light = light;

  star.add(light);

  stars.push(star);

  scene.add(star);
}
