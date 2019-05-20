var gui, planet_properties, moon_properties, add_gui, planets_gui, moons_gui, remove_gui, remove_params, remove_planet, remove_moon, remove_button;

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

  buildPlanetsGui();

  buildMoonsGui();

  buildAddGui();

  buildRemoveGui();
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

function buildPlanetsGui() {
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
    planet.userData.folder = planet_folder;

    addItemGui(planet_properties, planet_folder, 'colour', planet, true, false, 0, 0.1);
    addItemGui(planet_properties, planet_folder, 'size', planet, false, true, 0.1, 10);
    addItemGui(planet_properties, planet_folder, 'orbit', planet, false, false, 0, 1000);
    addItemGui(planet_properties, planet_folder, 'speed', planet, false, false, 0, 100);
  });
}

function buildMoonsGui() {
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
    moon.userData.folder = moon_folder;

    addItemGui(moon_properties, moon_folder, 'colour', moon, true, false, 0, 0.1);
    addItemGui(moon_properties, moon_folder, 'size', moon, false, true, 0.1, 5);
    addItemGui(moon_properties, moon_folder, 'orbit', moon, false, false, 0, 50);
    addItemGui(moon_properties, moon_folder, 'speed', moon, false, false, 0, 100);
  });
}

function buildRemoveGui() {
  remove_params = {
    item: "",
    planet: "Mercury",
    moon: "Moon",
    remove: function() {
      if (isPlanet)
        removePlanet(remove_params.planet);
      else
        removeMoon(remove_params.moon);
    }
  }

  remove_gui = gui.addFolder("Remove");
  remove_planet = null;
  remove_moon = null;
  remove_button = null;
  var isPlanet;

  remove_gui.add(remove_params, 'item', ['Planet', 'Moon']).onChange(function(val) {
    if (remove_button != null)
      remove_gui.remove(remove_button);
    if (val == "Planet") {
      isPlanet = true;
      if (remove_moon != null)
        remove_gui.remove(remove_moon);
      remove_planet = remove_gui.add(remove_params, 'planet', getPlanets()).listen();
    }
    else {
      isPlanet = false;
      if (remove_planet != null)
        remove_gui.remove(remove_planet);
      remove_moon = remove_gui.add(remove_params, 'moon', getMoons()).onChange(function(val) {
        mesh_name = val;
      })
    }
    remove_button = remove_gui.add(remove_params, 'remove');
  })
}

function removePlanet(name) {
  var index = null;
  for(var i=0;i<planets.length;i++) {
    if(planets[i].userData.name == name)
      index = i;
  }
  if(index!=null) {
    var folder = planets[index].userData.folder;
    planets_gui.removeFolder(folder);
    scene.remove(planets[index]);
    planets.splice(index, 1);
  }
  remove_params.planet = "";
  remove_gui.remove(remove_planet);
  remove_gui.remove(remove_button);
  remove_planet = remove_gui.add(remove_params, 'planet', getPlanets()).listen();
  remove_button = remove_gui.add(remove_params, 'remove');
  
}

function removeMoon(name) {
  var index = null;
  for(var i=0;i<moons.length;i++) {
    if(moons[i].userData.name == name)
      index = i;
  }
  if(index!=null) {
    var folder = moons[index].userData.folder;
    var planet = moons[index].userData.centreMass;
    planet.remove(moons[index]);
    moons_gui.removeFolder(folder);
    moons.splice(index, 1);
  }
  remove_params.moon = "";
  remove_gui.remove(remove_moon);
  remove_gui.remove(remove_button);
  remove_moon = remove_gui.add(remove_params, 'moon', getMoons()).listen();
  remove_button = remove_gui.add(remove_params, 'remove');
}

function buildAddGui() {
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
      if (nameFree(custom_planet[0])) {
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
        removePlanet("");
      }
    }
  }

  var custom_moon = ["Moon", 0.25, new THREE.Color("rgb(165,129,0)"), 10, 8, "Jupiter"];

  var moon_params = {
    name: "Moon",
    radius: 0.25,
    colour: new THREE.Color("rgb(165,129,0)").getHex(),
    orbit: 10,
    speed: 8,
    orbiting: "Jupiter",
    add: function() {
      createMoon(custom_moon[0], custom_moon[1], custom_moon[2], custom_moon[3], custom_moon[4], custom_moon[5]);
      var moon_folder = moons_gui.addFolder(custom_moon[0]);
      moon_properties.colour = moons[moons.length-1].material.color.getHex();
      addItemGui(moon_properties, moon_folder, 'colour', moons[moons.length-1], true, false, 0, 0.1);
      addItemGui(moon_properties, moon_folder, 'size', moons[moons.length-1], false, true, 0.1, 5);
      addItemGui(moon_properties, moon_folder, 'orbit', moons[moons.length-1], false, false, 0, 50);
      addItemGui(moon_properties, moon_folder, 'speed', moons[moons.length-1], false, false, 0, 100);
      moons_gui.open();
      moon_folder.open();
      add_gui.close();
      removeMoon("");
    }
  }

  var planet_folder, moon_folder;
  var planet = false;
  var moon = false;

  add_gui = gui.addFolder("Add");
  add_gui.add(add_params, 'item', [ 'Planet', 'Moon' ]).onChange(function(val) {
    if (val == "Planet") {
      if (moon)
        add_gui.removeFolder(moon_folder);
      planet = true;
      moon = false;
      if (planet) {
        planet_folder = add_gui.addFolder('Add Planet');
        planet_folder.add(planet_params, 'name').onChange(function(val) {
          custom_planet[0] = val;
        })
        planet_folder.add(planet_params, 'radius', 0.1, 10).onChange(function(val) {
          custom_planet[1] = val;
        })
        planet_folder.addColor(planet_params, 'colour').onChange(function(val) {
          custom_planet[2].setHex(val);
        })
        planet_folder.add(planet_params, 'orbit', 15, 1000).onChange(function(val) {
          custom_planet[3] = val;
        })
        planet_folder.add(planet_params, 'speed', 1, 100).onChange(function(val) {
          custom_planet[4] = val
        })
        planet_folder.add(planet_params, 'add');
      }
    }
    if (val == "Moon") {
      if (planet)
        add_gui.removeFolder(planet_folder);
      planet = false;
      moon = true;
      if (moon) {
        moon_folder = add_gui.addFolder('Add Moon');
        moon_folder.add(moon_params, 'name').onChange(function(val) {
          custom_moon[0] = val;
        })
        moon_folder.add(moon_params, 'radius', 0.1, 2).onChange(function(val) {
          custom_moon[1] = val;
        })
        moon_folder.addColor(moon_params, 'colour').onChange(function(val) {
          custom_moon[2] = val;
        })
        moon_folder.add(moon_params, 'orbit', 5, 20).onChange(function(val) {
          custom_moon[3] = val;
        })
        moon_folder.add(moon_params, 'speed', 1, 20).onChange(function(val) {
          custom_moon[4] = val;
        })
        moon_folder.add(moon_params, 'orbiting', getPlanets()).onChange(function(val) {
          custom_moon[5] = val;
        });
        moon_folder.add(moon_params, 'add');
      }
    }
  });
}

function getPlanets() {
  var planet_names = [];
  planets.forEach(function(planet) {
    planet_names.push(planet.userData.name);
  })
  return planet_names;
}

function getMoons() {
  var moon_names = [];
  moons.forEach(function(moon) {
    moon_names.push(moon.userData.name);
  })
  return moon_names;
}

function nameFree(name) {
  for (let planet of planets)
    if (planet.userData.name == name)
      return false;
  return true;
}