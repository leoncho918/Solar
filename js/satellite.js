//Creates a type of satellite with .obj models
var createSatellite = function(object, orbit, speed, centreMass) {

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath( "models/"+object+"/" );
    mtlLoader.setPath( "models/"+object+"/" );

    mtlLoader.load( object+".mtl", function(satellite_material)
    {
      satellite_material.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setPath( "models/"+object+"/" );
      objLoader.setMaterials(satellite_material);

      objLoader.load(object+".obj", function(satellite)
      {
        var centerBounding;
        var sizeBounding;
        satellite.traverse(function(child)
        {
          if (child instanceof THREE.Mesh)
          {
            var satellite_geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
            satellite_geometry.computeBoundingBox();
            child.material.color= new THREE.Color(0.7,0.7,0.7);
            centerBounding = satellite_geometry.boundingBox.getCenter();
            sizeBounding = satellite_geometry.boundingBox.getSize();
          }
        });
        scene.add(satellite);

        var sca = new THREE.Matrix4();
        var tra = new THREE.Matrix4();
        var rot = new THREE.Matrix4();
        var combined = new THREE.Matrix4();

        if (object == "satellite"){
          objScale = 0.06;
        } else if (object == "satellite_v2") {
          objScale = 0.5;
        } else if (object == "satellite_v3") {
          objScale = 0.06;
        }

        sca.makeScale(objScale/sizeBounding.length(),objScale/sizeBounding.length(),objScale/sizeBounding.length());
        satellite.applyMatrix(sca);

        satellite.userData.orbit = orbit;
        satellite.userData.speed = speed;

        satellite.castShadow = true;
        satellite.receiveShadow = true;

        planets.forEach(function(planet) {
          if (planet.userData.name == centreMass) {
            satellite.userData.centreMass = planet;
            planet.add(satellite);
          }
        })

    satellites.push(satellite);

   });
  });

}
