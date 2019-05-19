var planets = [];
var moons = [];
var stars = [];
var sun_mesh
var light;

function generatePlanets() {
  //Create Sun (Currently only supports placing one sun)
  createStar("Sun", 10, "rgb(255, 153, 100)", 1);

  //Create Planets
  createPlanet("Mercury", 0.5, "rgb(128,128,128)", 20.81, 4);
  createPlanet("Venus", 2, "rgb(255,255,224)", 38.83, 3.5);
  createPlanet("Earth", 2, "rgb(0,119,190)", 53.72, 3);
  createPlanet("Mars", 1, "rgb(255,99,71)", 81.84, 2.5);
  createPlanet("Jupiter", 5, "rgb(244,164,96)", 279.52, 2);
  createPlanet("Saturn", 4, "rgb(255,222,173)", 512.6, 1.5);
  createPlanet("Uranus", 3, "rgb(135,206,250)", 631.07, 1);
  createPlanet("Neptune", 4, "rgb(65,105,225)", 700, 0.5);

  //Create Moons
  createMoon("Moon", 0.25, "rgb(220,220,220)", 10, 8, "Earth");
}
