var textures = ["mercury_texture.jpg", "venus_texture.jpg",
                       "earth_texture.jpg", "mars_texture.jpg", "jupiter_texture.jpg",
                       "saturn_texture.jpg", "uranus_texture.jpg", "neptune_texture.jpg",
                       "ceres_texture.jpg", "eris_texture.jpg", "haumea_texture.jpg",
                       "makemake_texture.jpg", "pluto_texture.jpg", "moon_texture.jpg"];

var texture_names = ["Mercury Texture", "Venus Texture",
                            "Earth Texture", "Mars Texture", "Jupiter Texture",
                            "Saturn Texture", "Uranus Texture", "Neptune Texture",
                            "Ceres Texture", "Eris Texture", "Haumea Texture",
                            "Makemake Texture", "Pluto Texture", "Moon Texture"];

var objects = ["satellite", "satellite_v2", "satellite_v3"];

var object_names = ["Satellite V1", "Satellite V2", "Satellite V3"];

function addStarGui(properties, folder, name, value, min, max) {
  switch(name) {
    case "colour":
      folder.addColor(properties, name, min, max).onChange(function(val) {
        var colour = new THREE.Color(val);
        value.material.color = colour;
        value.userData.colour = convertRGB(value.material.color);
        value.children[0].color = colour;
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
          var colour = new THREE.Color(val);
          value.material.color = colour;
          value.userData.colour = convertRGB(value.material.color);
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

    var custom_planet = ["Pluto", "", "", 2, "rgb(0,119,190)", "pluto_texture.jpg", 800, 2, 0.01];

    var planet_params = {
      name: "Pluto",
      radius: 2,
      colour: "rgb(0,119,190)",
      texture: "Pluto Texture",
      orbit: 800,
      speed: 2,
      add: function() {
        if (nameFree(custom_planet[0], true)) {
          createPlanet(custom_planet[0], custom_planet[1], custom_planet[2], custom_planet[3], custom_planet[4], custom_planet[5], custom_planet[6], custom_planet[7], custom_planet[8]);
          refreshPlanets();
          planets_gui.open();
          planets[planets.length-1].userData.folder.open();
          add_gui.close();
          removePlanet("");
        }
      }
    }

    var custom_moon = ["Titan", "", "", 0.25, "rgb(165,129,0)", "moon_texture.jpg", 10, 8, "Jupiter"];

    var moon_params = {
      name: "Titan",
      radius: 0.25,
      colour: "rgb(165,129,0)",
      texture: "Moon Texture",
      orbit: 10,
      speed: 8,
      orbiting: "Jupiter",
      add: function() {
        if (nameFree(custom_moon[0], false)) {
          createMoon(custom_moon[0], custom_moon[1], custom_moon[2], custom_moon[3], custom_moon[4], custom_moon[5], custom_moon[6], custom_moon[7], custom_moon[8]);
          refreshMoons();
          moons_gui.open();
          moons[moons.length-1].userData.folder.open();
          add_gui.close();
          removeMoon("");
        }
      }
    }

    var objType;

    var satellite_params = {
      type: "Satellite",
      add: function() {
          if (objType == "satellite_v3") {
            objSpeed = 6;
          } else {
            objSpeed = 8;
          }
          createSatellite(objType, 3, objSpeed, "Earth");
      }
    }

    var planet_folder, moon_folder;
    var planet = false;
    var moon = false;

    add_gui = gui.addFolder("Add");
    add_gui.add(add_params, 'item', [ 'Planet', 'Moon', 'Satellite']).onChange(function(val) {
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
            custom_planet[3] = val;
          })
          planet_folder.add(planet_params, 'texture', texture_names).onChange(function(val) {
            custom_planet[5] = textures[texture_names.indexOf(val)];
          })
          planet_folder.add(planet_params, 'orbit', 15, 1000).onChange(function(val) {
            custom_planet[6] = val;
          })
          planet_folder.add(planet_params, 'speed', 1, 100).onChange(function(val) {
            custom_planet[7] = val
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
            custom_moon[3] = val;
          })
          moon_folder.add(moon_params, 'texture', texture_names).onChange(function(val) {
            custom_moon[5] = textures[texture_names.indexOf(val)];
          })
          moon_folder.add(moon_params, 'orbit', 5, 20).onChange(function(val) {
            custom_moon[6] = val;
          })
          moon_folder.add(moon_params, 'speed', 1, 20).onChange(function(val) {
            custom_moon[7] = val;
          })
          moon_folder.add(moon_params, 'orbiting', getPlanets()).onChange(function(val) {
            custom_moon[8] = val;
          });
          moon_folder.add(moon_params, 'add');
        }
      }
      //Satellite
      if (val == "Satellite") {
        if (planet)
          add_gui.removeFolder(planet_folder);
        planet = false;
        moon = false;
        satellite = true;
        if (satellite) {
          satellite_folder = add_gui.addFolder('Add Satellite');

          satellite_folder.add(satellite_params, 'type', object_names).onChange(function(val) {
            objType = objects[object_names.indexOf(val)];
          })

          satellite_folder.add(satellite_params, 'add');
        }
      }
    });
  }

  function convertRGB(colour) {
    var r = colour.r*255;
    var g = colour.g*255;
    var b = colour.b*255;

    return "rgb("+r+","+g+","+b+")";
  }
