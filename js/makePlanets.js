var planets = [];
var moons = [];
var stars = [];
var sun_mesh
var light;

function generatePlanets() {
  //Sun Description
  var sun_desc = "is the star at the centre of our solar system and is responsible for the Earth’s climate and weather.";

  //Create Sun (Currently only supports placing one sun)
  createStar("Sun", sun_desc, "Yellow Dwarf", 10, "rgb(255, 230, 100)","star_texture.jpg", 1);

  //Planet Descriptions
  var mercury_desc = " is the closest planet to the Sun and due to its proximity it is not easily seen except during twilight."
  var venus_desc = "is the second planet from the Sun and is the second brightest object in the night sky after the Moon.";
  var earth_desc = "is the third planet from the Sun and is the largest of the terrestrial planets.";
  var mars_desc = "is the fourth planet from the Sun and is the second smallest planet in the solar system.";
  var jupiter_desc = "is the fifth planet out from the Sun, and is two and a half times more massive than all the other planets in the solar system combined.";
  var saturn_desc = "is the sixth planet from the Sun and the most distant that can be seen with the naked eye.is the second largest planet and is best known for its fabulous ring system that was first observed in 1610 by the astronomer Galileo Galilei.";
  var uranus_desc = "is the seventh planet from the Sun. While being visible to the naked eye, it was not recognised as a planet due to its dimness and slow orbit.";
  var neptune_desc = "is the eighth planet from the Sun making it the most distant in the solar system.";

  //Create Planets
  createPlanet("Mercury", mercury_desc, "Terrestrial Planet", 0.5, "rgb(128,128,128)", "mercury_texture.jpg", 20.81, 4);
  createPlanet("Venus", venus_desc, "Terrestrial Planet", 2, "rgb(255,255,224)", "venus_texture.jpg", 38.83, 3.5);
  createPlanet("Earth", earth_desc, "Terrestrial Planet", 2, "rgb(0,119,190)", "earth_texture.png", 53.72, 3);
  createPlanet("Mars", mars_desc, "Terrestrial Planet", 1, "rgb(255,99,71)", "mars_texture.png", 81.84, 2.5);
  createPlanet("Jupiter", jupiter_desc, "Gas Giant", 5, "rgb(244,164,96)", "jupiter_texture.jpg", 279.52, 2);
  createPlanet("Saturn", saturn_desc, "Gas Giant", 4, "rgb(255,222,173)", "saturn_texture.png", 512.6, 1.5);
  createPlanet("Uranus", uranus_desc, "Gas Giant", 3, "rgb(135,206,250)", "uranus_texture.jpg", 631.07, 1);
  createPlanet("Neptune", neptune_desc, "Gas Giant", 4, "rgb(65,105,225)", "neptune_texture.jpg", 700, 0.5);

  //Moon Descriptions
  var moon_desc = "is the Earth’s only natural satellite and was formed 4.6 billion years ago around some 30–50 million years after the formation of the solar system."

  //Create Moons
  createMoon("Moon", moon_desc, "Natural Satellite", 0.25, "rgb(220,220,220)", "moon_texture.png", 10, 8, "Earth");
}
