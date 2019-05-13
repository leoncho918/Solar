function Planet(radius, colour) {
  this.type = "Planet";

  this.geometry = new THREE.SphereGeometry(radius, 32, 32);
  this.material = new THREE.MeshLambertMaterial()
  var planet_color = new THREE.Color(colour);

  this.material.color = planet_color;

  THREE.Mesh.call(this, this.geometry, this.material);
}

Planet.prototype = Object.create(THREE.Mesh.prototype);
Planet.prototype.constructor = Planet;

Planet.prototype.getMesh = function() {
  return this.mesh;
}
