function generatePlanets() {
  var material_box = new THREE.MeshLambertMaterial();
  material_box.color=  new THREE.Color(0.7,0.7,0.7);
  var geometry_box = new THREE.BoxGeometry(100,0.1,100,32,1,32);
  var BoxMesh = new THREE.Mesh(geometry_box,material_box);
  BoxMesh.position.y = -10;
  //scene.add(BoxMesh);

  var sun_color = new THREE.Color("rgb(255, 153, 51)");
  var sun_geometry = new THREE.SphereGeometry(10, 32, 32);
  var sun_material = new THREE.MeshLambertMaterial();
  sun_material.color = sun_color;
  sun_material.emissive = sun_color;
  sun_mesh = new THREE.Mesh(sun_geometry, sun_material);
  //sun_mesh.castShadow = true;
  //sun_mesh.receiveShadow = true;
  var sunlight = new THREE.PointLight(new THREE.Color(1, 1, 1), 2);
  sun_mesh.add(sunlight);
  scene.add(sun_mesh);

  sun_point = new THREE.Object3D();
  sun_mesh.add(sun_point);

  var earth_color = new THREE.Color("rgb(66, 134, 244)");
  var earth_geometry = new THREE.SphereGeometry(3, 32, 32);
  var earth_material = new THREE.MeshLambertMaterial();
  earth_material.color = earth_color;
  var earth_mesh = new THREE.Mesh(earth_geometry, earth_material);
  earth_mesh.position.set(earth_distance, 0 , 0);

  earth_point = new THREE.Object3D();
  earth_mesh.add(earth_point);

  sun_point.add(earth_mesh);

  var moon_color = new THREE.Color("rgb(166, 166, 166)");
  var moon_geometry = new THREE.SphereGeometry(1, 32, 32);
  var moon_material = new THREE.MeshLambertMaterial();
  moon_material.color = moon_color;
  var moon_mesh = new THREE.Mesh(moon_geometry, moon_material);
  moon_mesh.position.set(moon_distance, 0 , 0);

  earth_point.add(moon_mesh);
}
