var createStar = function(name, radius, colour, luminosity) {

  var geometry = new THREE.SphereGeometry(radius, 32, 32);
  var material = new THREE.MeshLambertMaterial({
    color: new THREE.Color(colour),
    emissive: new THREE.Color(colour)
  });

  var star = new THREE.Mesh(geometry, material);
  star.userData.name = name;

  var light = new THREE.PointLight(new THREE.Color(colour), luminosity);
  light.castShadow = true;;

  star.add(light);

  stars.push(star);

  scene.add(star);
}
