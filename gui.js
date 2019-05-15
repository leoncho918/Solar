var gui;

function buildGui() {
  gui = new dat.GUI();

  var stars_gui = gui.addFolder("Stars");
  stars.forEach(function(star)
  {
    var star_properties = {
      size: star.scale.x,
      colour: star.material.color.getHex()
    }

    var star_folder = gui.addFolder(star.userData.name);

    star_folder.addColor(star_properties, 'colour', 0, 0.1).onChange(function(val)
    {
      star.material.color.setHex(val);
      star.material.emissive.setHex(val);
      star.children[0].color.setHex(val);
    });

    star_folder.add(star_properties, 'size', 0.1, 10).onChange(function(val)
    {
      star.scale.set(val, val, val);
    });
  });

  var planets_gui = gui.addFolder("Planets");
  planets.forEach(function(planet)
  {
    var planet_properties = {
      size: planet.scale.x,
      colour: planet.material.color.getHex(),
      orbit: planet.userData.orbit,
      speed: planet.userData.speed
    }

    var planet_folder = gui.addFolder(planet.userData.name);
  })
}
