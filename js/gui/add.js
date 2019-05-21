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

  function addButton(properties, folder, name) {
    folder.add(properties, name);
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
        if (nameFree(custom_planet[0], true)) {
          createPlanet(custom_planet[0], custom_planet[1], custom_planet[2], custom_planet[3], custom_planet[4]);
          var planet_folder = planets_gui.addFolder(custom_planet[0]);
          planet_properties.colour = planets[planets.length-1].material.color.getHex();
          addItemGui(planet_properties, planet_folder, 'colour', planets[planets.length-1], true, false, 0, 0.1);
          addItemGui(planet_properties, planet_folder, 'size', planets[planets.length-1], false, true, 0.1, 10);
          addItemGui(planet_properties, planet_folder, 'orbit', planets[planets.length-1], false, false, 0, 1000);
          addItemGui(planet_properties, planet_folder, 'speed', planets[planets.length-1], false, false, 0, 100);
          addButton(planet_properties, planet_folder, 'go');
          planets[planets.length-1].userData.folder = planet_folder;
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
        if (nameFree(custom_moon[0], false)) {
          createMoon(custom_moon[0], custom_moon[1], custom_moon[2], custom_moon[3], custom_moon[4], custom_moon[5]);
          var moon_folder = moons_gui.addFolder(custom_moon[0]);
          moon_properties.colour = moons[moons.length-1].material.color.getHex();
          addItemGui(moon_properties, moon_folder, 'colour', moons[moons.length-1], true, false, 0, 0.1);
          addItemGui(moon_properties, moon_folder, 'size', moons[moons.length-1], false, true, 0.1, 5);
          addItemGui(moon_properties, moon_folder, 'orbit', moons[moons.length-1], false, false, 0, 50);
          addItemGui(moon_properties, moon_folder, 'speed', moons[moons.length-1], false, false, 0, 100);
          moons[moons.length-1].userData.folder = moon_folder;
          moons_gui.open();
          moon_folder.open();
          add_gui.close();
          removeMoon("");
        }
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