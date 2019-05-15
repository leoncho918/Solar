var planets = [];
var moons = [];
var stars = [];
var sun_mesh
var light;

function generatePlanets() {
  //Create Sun
  createStar("Sun", 10, "rgb(255, 153, 51)", 2);

  //Create meshes
  createPlanet("Earth", 3, "rgb(66, 134, 244)", 30, 4);
  createMoon("Moon", 1, "rgb(166, 166, 166)", 10, 10, "Earth");
}
