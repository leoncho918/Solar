var gui, planet_properties, moon_properties, add_gui, planets_gui, moons_gui;

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

  planets_gui = gui.addFolder("Planets");
  planets.forEach(function(planet)
  {
    planet_properties = {
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

  moons_gui = gui.addFolder("Moons");
  moons.forEach(function(moon)
  {
    moon_properties = {
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

  var add_params = {
    item: ""
  }

  var custom_planet = ["Planet", 2, new THREE.Color("rgb(0,119,190)"), 800, 5];

  var planet_params = {
    name: "Planet",
    radius: 2,
    colour: new THREE.Color("rgb(0,119,190)").getHex(),
    orbit: 800,
    speed: 5,
    add: function() {
      createPlanet(custom_planet[0], custom_planet[1], custom_planet[2], custom_planet[3], custom_planet[4]);
      var planet_folder = planets_gui.addFolder(custom_planet[0]);
      planet_properties.colour = planets[planets.length-1].material.color.getHex();
      addItemGui(planet_properties, planet_folder, 'colour', planets[planets.length-1], true, false, 0, 0.1);
      addItemGui(planet_properties, planet_folder, 'size', planets[planets.length-1], false, true, 0.1, 10);
      addItemGui(planet_properties, planet_folder, 'orbit', planets[planets.length-1], false, false, 0, 1000);
      addItemGui(planet_properties, planet_folder, 'speed', planets[planets.length-1], false, false, 0, 100);
      planets_gui.open();
      planet_folder.open();
      add_gui.close();
    }
  }

  var moon_params = {

  }

  add_gui = gui.addFolder("Add");
  add_gui.add(add_params, 'item', [ 'Planet', 'Moon' ]).onChange(function(val) {
    if (val == "Planet") {
      var planet_folder = add_gui.addFolder('Add Planet');
      planet_folder.add(planet_params, 'name').onChange(function(val) {
        custom_planet[0] = val;
      })
      planet_folder.add(planet_params, 'radius', 0.1, 5).onChange(function(val) {
        custom_planet[1] = val;
      })
      planet_folder.addColor(planet_params, 'colour').onChange(function(val) {
        custom_planet[2].setHex(val);
      })
      planet_folder.add(planet_params, 'orbit', 0, 1000).onChange(function(val) {
        custom_planet[3] = val;
      })
      planet_folder.add(planet_params, 'speed', 0, 100).onChange(function(val) {
        custom_planet[4] = val
      })
      planet_folder.add(planet_params, 'add');
    }
  });
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
