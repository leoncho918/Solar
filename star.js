function Star(radius, colour) {
  this.type = "Star";

  this.geometry = new THREE.SphereGeometry(radius, 32, 32);
  this.material = new THREE.MeshLambertMaterial()
  var star_color = new THREE.Color(colour);

  this.material.color = star_color;
  this.material.emissive = star_color;

  THREE.Mesh.call(this, this.geometry, this.material);
}
Star.prototype = Object.create(THREE.Mesh.prototype);
