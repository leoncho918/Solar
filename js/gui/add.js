function addStarGui(properties, folder, name, value, isColour, min, max) {
  switch(name) {
    case "colour":
      folder.addColor(properties, name, min, max).onChange(function(val) {
        value.material.color.setHex(val);
        value.material.emissive.setHex(val);
        value.children[0].color.setHex(val);
      });
      break;
    case "size":
      folder.add(properties, name, min, max).onChange(function(val) {
        value.scale.set(val, val, val);
      });
      break;
    case "luminosity":
      folder.add(properties, name, min, max).onChange(function(val) {
        value.userData.light.intensity = val;
      })
      break;
  }
}
  
  function addItemGui(properties, folder, name, value, isMoon, min, max) {
    switch(name) {
      case "colour":
        folder.addColor(properties, name, min, max).onChange(function(val) {
          value.material.color.setHex(val);
        });
        break;
      case "size":
        folder.add(properties, name, min, max).onChange(function(val) {
          value.scale.set(val, val, val);
        });
        break;
      case "orbit":
        folder.add(properties, name, min, max).onChange(function(val)
        {
          value.userData.orbit = val;
          if (path_on) {
            if (path!=undefined)
              if (isMoon)
                value.userData.centreMass.remove(path);
              else
                scene.remove(path);
            path = drawPath(val);
            if (isMoon)
              value.userData.centreMass.add(path);
            else
              scene.add(path);
          }
        });
        break;
      case "speed":
        folder.add(properties, name, min, max).onChange(function(val) {
          value.userData.speed = val;
        });
        break;
    }
  }

  function addButton(properties, folder, name) {
    return folder.add(properties, name);
  }

  function refreshPlanets() {
    for (var index=0;index<planets.length-1;index++) {
      planets_gui.removeFolder(planets[index].userData.folder);
    }
    buildPlanetsGui();
  }

  function refreshMoons() {
    for (var index=0;index<moons.length-1;index++) {
      moons_gui.removeFolder(moons[index].userData.folder);
    }
    buildMoonsGui();
  }

  function buildAddGui() {
    var add_params = {
      item: ""
    }
  
    var custom_planet = ["Pluto", 2, new THREE.Color("rgb(0,119,190)"), 800, 2];
  
    var planet_params = {
      name: "Pluto",
      radius: 2,
      colour: new THREE.Color("rgb(0,119,190)").getHex(),
      orbit: 800,
      speed: 2,
      add: function() {
        if (nameFree(custom_planet[0], true)) {
          createPlanet(custom_planet[0], custom_planet[1], custom_planet[2], custom_planet[3], custom_planet[4]);
          refreshPlanets();
          planets_gui.open();
          planets[planets.length-1].userData.folder.open();
          add_gui.close();
          removePlanet("");
        }
      }
    }
  
    var custom_moon = ["Titan", 0.25, new THREE.Color("rgb(165,129,0)"), 10, 8, "Jupiter"];
  
    var moon_params = {
      name: "Titan",
      radius: 0.25,
      colour: new THREE.Color("rgb(165,129,0)").getHex(),
      orbit: 10,
      speed: 8,
      orbiting: "Jupiter",
      add: function() {
        if (nameFree(custom_moon[0], false)) {
          createMoon(custom_moon[0], custom_moon[1], custom_moon[2], custom_moon[3], custom_moon[4], custom_moon[5]);
          refreshMoons();
          moons_gui.open();
          moons[moons.length-1].userData.folder.open();
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