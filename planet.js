var planet_mesh, planet_point, planet_material, planet_geometry, planet_colour;

class Planet {
  constructor(colour, radius) {
    planet_colour = new THREE.Color(colour);
    planet_geometry = new THREE.SphereGeometry(radius, 32, 32);
    planet_material = new THREE.MeshLambertMaterial();
    planet_material.color = planet_colour;
    planet_mesh = new THREE.Mesh(planet_geometry, planet_material);
    planet_point = new THREE.Object3D();
    planet_mesh.add(planet_point);
  }

  getPlanet() {
    return planet_mesh;
  }

  addOrbit(planet, rotation, distance) {
    planet_point.add(planet);
    planet_point.rotation.y += rotation;
    planet_mesh.position.set(distance, 0, 0);
  }

  setEmissive() {
    planet_material.emissive = planet_colour;
  }
}
