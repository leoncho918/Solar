// Create global variables to store gui elements
var gui, planet_properties, moon_properties, add_gui, planets_gui, moons_gui, remove_gui, remove_params, remove_planet, remove_moon, remove_button, camera_position, path, path_on;

// Function call to build the GUI
function buildGui() {
  // Assign gui variable with a new dat gui object
  gui = new dat.GUI();

  // Add a folder into the gui called Stars
  var stars_gui = gui.addFolder("Stars");
  // Add a folder for each star in the array into the gui
  stars.forEach(function(star)
  {
    //Properties for each star that will form the gui options for each star
    var star_properties = {
      size: star.scale.x,
      colour: star.userData.colour,
      luminosity: star.userData.light.intensity,
      // Button to show the star's information, hide previous info and remove the path of the previous planet/moon if there was any
      view: function() {
        // Function call to remove the hide button in all other gui folders except the current folder
        removeHide();
        // Remove the path from the scene if it was defined
        if (path!=undefined)
          scene.remove(path);
        // Set variable to false to indicate the path isn't on the scene
        path_on = false;
        // Remove the view button from the gui
        star_folder.remove(star.userData.add_button);
        // Set userdata storing the view button to undefined
        star.userData.add_button = undefined;
        // Assign userdata variable to store the remove button in the gui
        star.userData.remove_button = addButton(this, star_folder, 'hide');
        // Function call to clear the screen of info text
        hideInfo();
        // Function call to show info for the current star
        showInfo(star.userData.name, star.userData.category, star.userData.desc, star.userData.colour);
      },
      // Button to hide the current star's information
      hide: function() {
        // Function call to clear screen of info text
        hideInfo();
        // Function call to show the starting message
        showStartUp();
        // Remove hide button from the gui
        star_folder.remove(star.userData.remove_button);
        // Set the remove button in user data to undefined
        star.userData.remove_button = undefined;
        // Assign userdata variable to store the add button in the gui
        star.userData.add_button = addButton(this, star_folder, 'view');
      }
    }

    // Add a new folder to the gui for the current star
    var star_folder = stars_gui.addFolder(star.userData.name);
    // Store the star's gui folder in userdata
    star.userData.folder = star_folder;
    // Store the star gui properties in userdata
    star.userData.properties = star_properties;

    // Add gui objects for the star's colour, size, brightness
    addStarGui(star_properties, star_folder, 'colour', star, 0, 0.1);
    addStarGui(star_properties, star_folder, 'size', star, 0.1, 10);
    addStarGui(star_properties, star_folder, 'luminosity', star, 0, 4);
    // Add a button to show the star's info and store it in userdata
    star.userData.add_button = addButton(star_properties, star_folder, 'view');

  });

  // Create a folder in gui to store planets
  planets_gui = gui.addFolder("Planets");
  // Function call to build planet gui
  buildPlanetsGui();

  // Create a folder in gui to store moons
  moons_gui = gui.addFolder("Moons");
  // Function call to build the moon gui
  buildMoonsGui();

  // Function call to build the gui folder to add new planets and moons
  buildAddGui();

  // Function call to build the gui folder to remove planets and moons
  buildRemoveGui();
}

// Function to build the gui each planet
function buildPlanetsGui() {
  // Add a new folder into the gui for each planet in the array
  planets.forEach(function(planet)
  {
    // Properties for each planet that can be edited by the gui
    planet_properties = {
      size: planet.scale.x,
      colour: planet.userData.colour,
      orbit: planet.userData.orbit,
      speed: planet.userData.speed,
      // Button to show the planet's orbit path and information
      view: function() {
        // Function call to remove the hide button from all folders except current folder
        removeHide();
        // Remove the planet's path outline from the scene if it is in the scene
        if (path!=undefined)
          scene.remove(path);
        // Function call that draws the path of the current planet orbit and stores it in path
        path = drawPath(planet.userData.orbit);
        // Store the path in the planet's user data
        planet.userData.path = path;
        // Add the path into the scene
        scene.add(path);
        // Set variable to true to indicate a path is in the scene
        path_on = true;
        // Remove the view button from the current folder
        planet_folder.remove(planet.userData.add_button);
        // Set the user data button to undefined
        planet.userData.add_button = undefined;
        // Add the hide button to the gui and store it in the planet's user data
        planet.userData.remove_button = addButton(this, planet_folder, 'hide');
        // Function call to clear the screen of info text
        hideInfo();
        // Function call to show the current planet's info
        showInfo(planet.userData.name, planet.userData.category, planet.userData.desc, planet.userData.colour);
      },
      // Button to hide the planet's orbit path and infomation
      hide: function() {
        // Function call to clear the screen of info text
        hideInfo();
        // Function call to show the welcome menu
        showStartUp();
        // Remove path from the scene
        scene.remove(path);
        // Set variable to false to indicate that there is no path in the scene
        path_on = false;
        // Assign variable to the current planet's path
        path = drawPath(planet.userData.orbit);
        // Store path in planet's user data
        planet.userData.path = path;
        // Remove the hide button from the gui
        planet_folder.remove(planet.userData.remove_button);
        // Set the remove button in user data to undefined
        planet.userData.remove_button = undefined;
        // Add the view button and store the button in planet's user data
        planet.userData.add_button = addButton(this, planet_folder, 'view');
      }
    }

    // Add a new folder for the current planet
    var planet_folder = planets_gui.addFolder(planet.userData.name);
    // Store the folder in the planet's userdata
    planet.userData.folder = planet_folder;
    // Store the planet gui properties in userdata
    planet.userData.properties = planet_properties;

    // Add gui items to control the planet's colour, size, orbit and speed
    addItemGui(planet_properties, planet_folder, 'colour', planet, false, 0, 0.1);
    addItemGui(planet_properties, planet_folder, 'size', planet, false, 0.1, 10);
    addItemGui(planet_properties, planet_folder, 'orbit', planet, false, 0, 1000);
    addItemGui(planet_properties, planet_folder, 'speed', planet, false, 0, 100);
    // Add button to view the planet's orbit and info and store it in userdata
    planet.userData.add_button = addButton(planet_properties, planet_folder, 'view');
  });
}

// Function to build the moon gui
function buildMoonsGui() {
  // Build the gui for each moon in the array
  moons.forEach(function(moon)
  {
    // Properties for each moon that can be edited by the gui
    moon_properties = {
      size: moon.scale.x,
      colour: moon.userData.colour,
      orbit: moon.userData.orbit,
      speed: moon.userData.speed,
      // Button to show the moon's orbit path and information
      view: function() {
        // Function call to remove the hide button from all folders except current folder
        removeHide();
        // Remove the moon's path outline from the scene if it is in the scene
        if (path!=undefined)
            scene.remove(path);
        // Function call that draws the path of the current moon orbit and stores it in path
        path = drawPath(moon.userData.orbit)
        // Store the path in the moon's user data
        moon.userData.path = path;
        // Add the path onto the moon's center planet
        moon.userData.centreMass.add(path);
        // Set variable to true to indicate a path is in the scene
        path_on = true;
        // Remove the view button from the current folder
        moon_folder.remove(moon.userData.add_button);
        // Set the user data button to undefined
        moon.userData.add_button = undefined;
        // Add the hide button to the gui and store it in the moon's user data
        moon.userData.remove_button = addButton(this, moon_folder, 'hide');
        // Function call to clear the screen of info text
        hideInfo();
        // Function call to show the current moon's info
        showInfo(moon.userData.name, moon.userData.category, moon.userData.desc, moon.userData.colour);
      },
      // Button to hide the moon's orbit path and infomation
      hide: function() {
        // Function call to clear the screen of info text
        hideInfo();
        // Function call to show the welcome menu
        showStartUp();
        // Remove path from the moon's center planet
        moon.userData.centreMass.remove(path);
        // Set variable to false to indicate that there is no path in the scene
        path_on = false;
        // Assign variable to the current moon's path
        path = drawPath(moon.userData.orbit);
        // Store path in planet's user data
        moon.userData.path = path;
        // Remove the hide button from the gui
        moon_folder.remove(moon.userData.remove_button);
        // Set the remove button in user data to undefined
        moon.userData.remove_button = undefined;
        // Add the view button and store the button in moon's user data
        moon.userData.add_button = addButton(this, moon_folder, 'view');
      }
    }

    // Add a new folder for the current moon
    var moon_folder = moons_gui.addFolder(moon.userData.name);
    // Store the folder in the moon's userdata
    moon.userData.folder = moon_folder;
    // Store the moon gui properties in userdata
    moon.userData.properties = moon_properties;

    // Add gui items to control the moon's colour, size, orbit and speed
    addItemGui(moon_properties, moon_folder, 'colour', moon, true, 0, 0.1);
    addItemGui(moon_properties, moon_folder, 'size', moon, true, 0.1, 5);
    addItemGui(moon_properties, moon_folder, 'orbit', moon, true, 0, 50);
    addItemGui(moon_properties, moon_folder, 'speed', moon, true, 0, 100);
    // Add button to view the moon's orbit and info and store it in userdata
    moon.userData.add_button = addButton(moon_properties, moon_folder, 'view');
  });
}

// Function to get an array storing the names of all the planets in the scene
function getPlanets() {
  var planet_names = [];
  planets.forEach(function(planet) {
    planet_names.push(planet.userData.name);
  })
  return planet_names;
}

// Function to get an array storing the names of all the moons in the scene
function getMoons() {
  var moon_names = [];
  moons.forEach(function(moon) {
    moon_names.push(moon.userData.name);
  })
  return moon_names;
}

// Function that returns true if the planet/moon name is already in use.
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

// Function to remove the hide buttons in all folders in the gui
function removeHide() {
  // Remove the hide button from each planet folder if it exists and add the view button into the gui if it's not in the folder
  planets.forEach(function(planet) {
    if (planet.userData.remove_button!=undefined) {
      planet.userData.folder.remove(planet.userData.remove_button);
      planet.userData.remove_button = undefined;
    }
    if (planet.userData.add_button==undefined)
      planet.userData.add_button = addButton(planet.userData.properties, planet.userData.folder, 'view');
  });
  // Remove the hide button from each moon folder
  // if it exists and add the view button into the gui if it's not in the folder
  // and remove the path of each moon if it's in the scene
  moons.forEach(function(moon) {
    if (path!=undefined)
      moon.userData.centreMass.remove(path);
    if (moon.userData.remove_button!=undefined) {
      moon.userData.folder.remove(moon.userData.remove_button);
      moon.userData.remove_button = undefined;
    }
    if (moon.userData.add_button==undefined)
      moon.userData.add_button = addButton(moon.userData.properties, moon.userData.folder, 'view');
    if (path_on) {
      scene.remove(path);
      moon.userData.centreMass.remove(path);
      path_on = false;
    }
  });
  // Remove the hide button from each star folder if it exists and add the view button into the gui if it's not in the folder
  stars.forEach(function(star) {
    if (star.userData.remove_button!=undefined) {
      star.userData.folder.remove(star.userData.remove_button);
      star.userData.remove_button = undefined;
    }
    if (star.userData.add_button==undefined)
      star.userData.add_button = addButton(star.userData.properties, star.userData.folder, 'view');
  })
}

// Function to draw and return the path of the given orbit
function drawPath(orbit) {
  var shape = new THREE.Shape();
  shape.moveTo(orbit, 0);
  shape.absarc(0, 0, orbit, 0, 2 * Math.PI, false);

  var spacedPoints = shape.createSpacedPointsGeometry(128);
  spacedPoints.rotateX(THREE.Math.degToRad(-90));
  return new THREE.Line(spacedPoints, new THREE.LineBasicMaterial({
    color: "white"
  }));
}