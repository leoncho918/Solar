var gui, planet_properties, moon_properties, add_gui, planets_gui, moons_gui, remove_gui, remove_params, remove_planet, remove_moon, remove_button, camera_position, path;

function buildGui() {
  gui = new dat.GUI();

  var stars_gui = gui.addFolder("Stars");
  stars.forEach(function(star)
  {
    var star_properties = {
      size: star.scale.x,
      colour: star.material.color.getHex(),
      view: function() {

      },
      hide: function() {

      }
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

function buildPlanetsGui() {
  planets_gui = gui.addFolder("Planets");
  planets.forEach(function(planet)
  {
    planet_properties = {
      size: planet.scale.x,
      colour: planet.material.color.getHex(),
      orbit: planet.userData.orbit,
      speed: planet.userData.speed,
      view: function() {
        removeHide();
        if (path!=undefined)
          scene.remove(path);
        path = planet.userData.path;
        scene.add(path);
        planet_folder.remove(planet.userData.add_button);
        planet.userData.add_button = undefined;
        planet.userData.remove_button = addButton(this, planet_folder, 'hide');
      },
      hide: function() {
        path = planet.userData.path;
        scene.remove(path);
        planet_folder.remove(planet.userData.remove_button);
        planet.userData.remove_button = undefined;
        planet.userData.add_button = addButton(this, planet_folder, 'view');
      }
    }

    var planet_folder = planets_gui.addFolder(planet.userData.name);
    planet.userData.folder = planet_folder;
    planet.userData.properties = planet_properties;

    addItemGui(planet_properties, planet_folder, 'colour', planet, true, false, 0, 0.1);
    addItemGui(planet_properties, planet_folder, 'size', planet, false, true, 0.1, 10);
    addItemGui(planet_properties, planet_folder, 'orbit', planet, false, false, 0, 1000);
    addItemGui(planet_properties, planet_folder, 'speed', planet, false, false, 0, 100);
    planet.userData.add_button = addButton(planet_properties, planet_folder, 'view');
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
      speed: moon.userData.speed,
      view: function() {
        removeHide();
        if (path!=undefined)
            scene.remove(path);
        path = moon.userData.path;
        moon.userData.centreMass.add(moon.userData.path);
        moon_folder.remove(moon.userData.add_button);
        moon.userData.add_button = undefined;
        moon.userData.remove_button = addButton(this, moon_folder, 'hide');
      },
      hide: function() {
        path = moon.userData.path;
        moon.userData.centreMass.remove(path);
        moon_folder.remove(moon.userData.remove_button);
        moon.userData.remove_button = undefined;
        moon.userData.add_button = addButton(this, moon_folder, 'view');
      }
    }

    var moon_folder = moons_gui.addFolder(moon.userData.name);
    moon.userData.folder = moon_folder;
    moon.userData.properties = moon_properties;

    addItemGui(moon_properties, moon_folder, 'colour', moon, true, false, 0, 0.1);
    addItemGui(moon_properties, moon_folder, 'size', moon, false, true, 0.1, 5);
    addItemGui(moon_properties, moon_folder, 'orbit', moon, false, false, 0, 50);
    addItemGui(moon_properties, moon_folder, 'speed', moon, false, false, 0, 100);
    moon.userData.add_button = addButton(moon_properties, moon_folder, 'view');
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

function nameFree(name, isPlanet) {
  if (isPlanet) {
    for (let planet of planets)
      if (planet.userData.name == name)
        return false;
      return true;
  }
  else {
    for (let moon of moons)
      if (moon.userData.name == name)
        return false;
      return true;
  }
}

function removeHide() {
  planets.forEach(function(planet) {
    if (planet.userData.remove_button!=undefined) {
      planet.userData.folder.remove(planet.userData.remove_button);
      planet.userData.remove_button = undefined;
    }
    if (planet.userData.add_button==undefined)
      planet.userData.add_button = addButton(planet.userData.properties, planet.userData.folder, 'view');
  });
  moons.forEach(function(moon) {
    if (path!=undefined)
      moon.userData.centreMass.remove(path);
    if (moon.userData.remove_button!=undefined) {
      moon.userData.folder.remove(moon.userData.remove_button);
      moon.userData.remove_button = undefined;
    }
    if (moon.userData.add_button==undefined)
      moon.userData.add_button = addButton(moon.userData.properties, moon.userData.folder, 'view');
  })
}