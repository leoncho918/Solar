// Array string texture file names
var textures = ["mercury_texture.jpg", "venus_texture.jpg",
                       "earth_texture.jpg", "mars_texture.jpg", "jupiter_texture.jpg",
                       "saturn_texture.jpg", "uranus_texture.jpg", "neptune_texture.jpg",
                       "ceres_texture.jpg", "eris_texture.jpg", "haumea_texture.jpg",
                       "makemake_texture.jpg", "pluto_texture.jpg", "moon_texture.jpg"];
// Array storing texture names
var texture_names = ["Mercury Texture", "Venus Texture",
                            "Earth Texture", "Mars Texture", "Jupiter Texture",
                            "Saturn Texture", "Uranus Texture", "Neptune Texture",
                            "Ceres Texture", "Eris Texture", "Haumea Texture",
                            "Makemake Texture", "Pluto Texture", "Moon Texture"];
// Array to store satellite files names
var objects = ["satellite", "satellite_v2", "satellite_v3"];
// Array to store satellite names
var object_names = ["Satellite V1", "Satellite V2", "Satellite V3"];

// Function to build the gui for it star properties
function addStarGui(properties, folder, name, value, min, max) {
  // Switch statment to find out what gui item needs to be added and can be changed
  switch(name) {
    // If name of property is colour then add gui for colour that changes the colour of the star's material and it's light.
    case "colour":
      folder.addColor(properties, name, min, max).onChange(function(val) {
        var colour = new THREE.Color(val);
        value.material.color = colour;
        value.userData.colour = convertRGB(value.material.color);
        value.children[0].color = colour;
      });
      break;
    // If name of property is size then add gui to change the scale of the star
    case "size":
      folder.add(properties, name, min, max).onChange(function(val) {
        value.scale.set(val, val, val);
      });
      break;
    // If name of property is luminosity then add gui to change the intensity of the light
    case "luminosity":
      folder.add(properties, name, min, max).onChange(function(val) {
        value.userData.light.intensity = val;
      })
      break;
  }
}
// Function to build the gui for planet and moon properties
  function addItemGui(properties, folder, name, value, isMoon, min, max) {
    // Switch statment to find out what gui item needs to be added and can be changed
    switch(name) {
      // If property is colour then add gui item to change the material colour of the object
      case "colour":
        folder.addColor(properties, name, min, max).onChange(function(val) {
          var colour = new THREE.Color(val);
          value.material.color = colour;
          value.userData.colour = convertRGB(value.material.color);
        });
        break;
      // If property is size then add gui item to change the scale of the object
      case "size":
        folder.add(properties, name, min, max).onChange(function(val) {
          value.scale.set(val, val, val);
        });
        break;
      // If property is orbit then add gui item that changes the orbit value stored in user data and the path size.
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
      // If property is speed then add gui item to change the speed value stored in user data
      case "speed":
        folder.add(properties, name, min, max).onChange(function(val) {
          value.userData.speed = val;
        });
        break;
    }
  }

  // Function to add a button to the given gui folder with the given name
  function addButton(properties, folder, name) {
    return folder.add(properties, name);
  }

  // Function to update the planets folder
  function refreshPlanets() {
    for (var index=0;index<planets.length-1;index++) {
      planets_gui.removeFolder(planets[index].userData.folder);
    }
    buildPlanetsGui();
  }

  // Function to upate the moons folder
  function refreshMoons() {
    for (var index=0;index<moons.length-1;index++) {
      moons_gui.removeFolder(moons[index].userData.folder);
    }
    buildMoonsGui();
  }

  // Function to build the gui to add planets
  function buildAddGui() {
    // Paramaters for what items can be added
    var add_params = {
      item: ""
    }

    // Default custom planet to be added if user doesn't change properties
    var custom_planet = ["Pluto", "", "", 2, "rgb(0,119,190)", "pluto_texture.jpg", 800, 2, 0.01];

    // Custom planet parameters that can be changed
    var planet_params = {
      name: "Pluto",
      radius: 2,
      colour: "rgb(0,119,190)",
      texture: "Pluto Texture",
      orbit: 800,
      speed: 2,
      // Add button adds the new planet
      add: function() {
        // Check if the planet name is not already in use
        if (nameFree(custom_planet[0], true)) {
          // Create planet object
          createPlanet(custom_planet[0], custom_planet[1], custom_planet[2], custom_planet[3], custom_planet[4], custom_planet[5], custom_planet[6], custom_planet[7], custom_planet[8]);
          // Refresh the planets gui
          refreshPlanets();
          // Open the folder for the new planet
          planets_gui.open();
          planets[planets.length-1].userData.folder.open();
          // Close the add gui
          add_gui.close();
        }
      }
    }

    // Default custom moon to be added if user doesn't change variables
    var custom_moon = ["Titan", "", "", 0.25, "rgb(165,129,0)", "moon_texture.jpg", 10, 8, "Jupiter"];

    // Custom moon parameters that can be changed
    var moon_params = {
      name: "Titan",
      radius: 0.25,
      colour: "rgb(165,129,0)",
      texture: "Moon Texture",
      orbit: 10,
      speed: 8,
      orbiting: "Jupiter",
      // Add button adds the new planet
      add: function() {
        // Check that name is not already in use by other moons
        if (nameFree(custom_moon[0], false)) {
          // Add moon object, refresh moons gui, and open the folder for the new moon
          createMoon(custom_moon[0], custom_moon[1], custom_moon[2], custom_moon[3], custom_moon[4], custom_moon[5], custom_moon[6], custom_moon[7], custom_moon[8]);
          refreshMoons();
          moons_gui.open();
          moons[moons.length-1].userData.folder.open();
          // Close the add gui
          add_gui.close();
        }
      }
    }


    var objType;
    //Adds a satellite model from the GUI options
    var satellite_params = {
      type: "Satellite",
      add: function() {
          createSatellite(objType, 3, 8, "Earth");
      }
    }

    // Create variables to keep track of whether a moon or planet is to be created
    var planet_folder, moon_folder;
    var planet = false;
    var moon = false;

    // Add a folder to the gui called Add
    add_gui = gui.addFolder("Add");
    // Add a dropdown containing Planet, Moon and Satellite
    add_gui.add(add_params, 'item', [ 'Planet', 'Moon', 'Satellite']).onChange(function(val) {
      // If user selects planet then remove the moon folder if it exists, set the planet to true and moon to false
      if (val == "Planet") {
        if (moon)
          add_gui.removeFolder(moon_folder);
        if (satellite)
          add_gui.removeFolder(satellite_folder);
        planet = true;
        moon = false;
        satellite = false;
        // If user selected planet add a folder to add a planet and add the parameters that can be changed for the planet
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
      // If user selects moon then remove the planet folder if it exists, set the moon to true and planet to false
      if (val == "Moon") {
        if (planet)
          add_gui.removeFolder(planet_folder);
        if (satellite)
          add_gui.removeFolder(satellite_folder);
        planet = false;
        moon = true;
        satellite = false;
        // If user selected planet add a folder to add a planet and add the parameters that can be changed for the planet
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
      //Add Satellites
      if (val == "Satellite") {
        if (planet)
          add_gui.removeFolder(planet_folder);
        if (moon)
          add_gui.removeFolder(moon_folder);
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

  // Function to convert colour percentage and return a colour string
  function convertRGB(colour) {
    var r = colour.r*255;
    var g = colour.g*255;
    var b = colour.b*255;

    return "rgb("+r+","+g+","+b+")";
  }
