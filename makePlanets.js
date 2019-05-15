var planets = [];
var moons = [];
var stars = [];
var sun_mesh
var light;

function generatePlanets() {
  //Create Sun (Currently only supports placing one sun)
  createStar("Sun", 10, "rgb(255, 153, 100)", 1);

  //Create Planets
  createPlanet("Mercury", 0.5, "rgb(128,128,128)", 20.81, 20);
  createPlanet("Venus", 2, "rgb(255,255,224)", 38.83, 18);
  createPlanet("Earth", 2, "rgb(0,119,190)", 53.72, 16);
  createPlanet("Mars", 1, "rgb(255,99,71)", 81.84, 14);
  createPlanet("Jupiter", 5, "rgb(244,164,96)", 279.52, 12);
  createPlanet("Saturn", 4, "rgb(255,222,173)", 512.6, 10);
  createPlanet("Uranus", 3, "rgb(135,206,250)", 631.07, 8);
  createPlanet("Neptune", 4, "rgb(65,105,225)", 700, 6);

  //Create Moons
  createMoon("Moon", 0.25, "rgb(220,220,220)", 10, 30, "Earth");
}
