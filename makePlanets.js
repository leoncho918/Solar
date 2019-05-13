function generatePlanets() {

  var earth_distance = 100;
  var moon_distance = 15;
  var earthSpeed = 0.01;
  var moonSpeed = 0.03;
  var planets = [];

  var sunObj = new Planet("rgb(255, 153, 51)", 10);
  sunObj.setEmissive();
  var sun = sunObj.getPlanet();
  var sunlight = new THREE.PointLight(new THREE.Color(1, 1, 1), 2);
  sun.add(sunlight);
  scene.add(sun);

  //Earth
  var earthObj = new Planet("rgb(66, 134, 244)", 3);
  var earth = earthObj.getPlanet();
  sunObj.addOrbit(earth, earthSpeed), earth_distance;

  //Moon
  var moonObj = new Planet("rgb(166, 166, 166)", 1);
  var moon = moonObj.getPlanet();
  earthObj.addOrbit(moon, moonSpeed, moon_distance);
}
