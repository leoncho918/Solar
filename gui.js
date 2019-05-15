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

    var star_folder = stars_gui.addFolder(star.userData.name);

    addStarGui(star_properties, star_folder, 'colour', star, true, 0, 0.1);
    addStarGui(star_properties, star_folder, 'size', star, false, 0.1, 10);


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

    var planet_folder = planets_gui.addFolder(planet.userData.name);

    addItemGui(planet_properties, planet_folder, 'colour', planet, true, false, 0, 0.1);
    addItemGui(planet_properties, planet_folder, 'size', planet, false, true, 0.1, 10);
    addItemGui(planet_properties, planet_folder, 'orbit', planet, false, false, 0, 1000);
    addItemGui(planet_properties, planet_folder, 'speed', planet, false, false, 0, 100);
  });

  var moons_gui = gui.addFolder("Moons");
  moons.forEach(function(moon)
  {
    var moon_properties = {
      size: moon.scale.x,
      colour: moon.material.color.getHex(),
      orbit: moon.userData.orbit,
      speed: moon.userData.speed
    }

    var moon_folder = moons_gui.addFolder(moon.userData.name);

    addItemGui(moon_properties, moon_folder, 'colour', moon, true, false, 0, 0.1);
    addItemGui(moon_properties, moon_folder, 'size', moon, false, true, 0.1, 5);
    addItemGui(moon_properties, moon_folder, 'orbit', moon, false, false, 0, 50);
    addItemGui(moon_properties, moon_folder, 'speed', moon, false, false, 0, 100);
  });

  var button = {
    add: function() {
      console.log("clicked");
    }
  };
  gui.add(button, 'add');
}

function addStarGui(properties, folder, name, value, isColour, min, max) {
  if (isColour) {
    folder.addColor(properties, name, min, max).onChange(function(val) {
      value.material.color.setHex(val);
      value.material.emissive.setHex(val);
      value.children[0].color.setHex(val);
    });
  }
  else {
    folder.add(properties, name, min, max).onChange(function(val) {
      value.scale.set(val, val, val);
    });
  }
}

function addItemGui(properties, folder, name, value, isColour, isSize, min, max) {
  if (isColour || isSize) {
    if (isColour) {
      folder.addColor(properties, name, min, max).onChange(function(val) {
        value.material.color.setHex(val);
      });
    }
    if (isSize) {
      folder.add(properties, name, min, max).onChange(function(val) {
        value.scale.set(val, val, val);
      });
    }
  }
  else {
    folder.add(properties, name, min, max).onChange(function(val)
      {
        if (name == 'orbit')
          value.userData.orbit = val;
        else
          value.userData.speed = val;
      });
  }
}
