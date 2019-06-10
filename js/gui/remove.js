// Function to build the remove gui
function buildRemoveGui() {
  // Parameters for the remove gui menu
    remove_params = {
      item: "",
      planet: "Mercury",
      moon: "Moon",
      // Remove button calls function to remove planet/moon
      remove: function() {
        if (isPlanet)
          removePlanet(remove_params.planet);
        else
          removeMoon(remove_params.moon);
      }
    }
    // Add a remove folder into the gui
    remove_gui = gui.addFolder("Remove");
    // Assign variables to null to determine what to remove from the scene.
    remove_planet = null;
    remove_moon = null;
    remove_button = null;
    // Create variable to check if object being removed is a planet
    var isPlanet;
    
    // Add dropdown to gui to choose whether to remove planet or moon
    remove_gui.add(remove_params, 'item', ['Planet', 'Moon']).onChange(function(val) {
      // If the remove button is in the menu then remove it
      if (remove_button != null)
        remove_gui.remove(remove_button);
      // Set variable to indicate selected item is a planet
      if (val == "Planet") {
        // Set variable to true
        isPlanet = true;
        // If moon dropdown is in the menu then remove it
        if (remove_moon != null)
          remove_gui.remove(remove_moon);
        // Add a dropdown containing all the planets for removing planets
        remove_planet = remove_gui.add(remove_params, 'planet', getPlanets()).listen();
      }
      // Else
      else {
        // Set variable to indicate selected item is a moon
        isPlanet = false;
        // If moon dropdown is in the menu then remove it
        if (remove_planet != null)
          remove_gui.remove(remove_planet);
        // Add a dropdown containing all the moons for removing moons
        remove_moon = remove_gui.add(remove_params, 'moon', getMoons()).onChange(function(val) {
          mesh_name = val;
        })
      }
      // Add the remove button to the gui and assign it to the variable
      remove_button = remove_gui.add(remove_params, 'remove');
    })
  }
  
  // Function to remove a given planet, it's path and gui folder
  function removePlanet(name) {
    // Create a variable to store the planet's index
    var index = null;
    // Find the planet with the same name and save the index
    for(var i=0;i<planets.length;i++) {
      if(planets[i].userData.name == name)
        index = i;
    }
    // If planet was found then
    // remove its folder from the gui, 
    // remove it's path from the scene,
    // remove it from the scene and remove it from the planets array
    if(index!=null) {
      var folder = planets[index].userData.folder;
      planets_gui.removeFolder(folder);
      scene.remove(planets[index].userData.path);
      scene.remove(planets[index]);
      planets.splice(index, 1);
    }
    // Refresh the remove planet dropdown so remove planet is no longer there
    remove_params.planet = "";
    if (remove_planet!=null) {
      remove_gui.remove(remove_planet);
      remove_gui.remove(remove_button);
      remove_planet = remove_gui.add(remove_params, 'planet', getPlanets()).listen();
      remove_button = remove_gui.add(remove_params, 'remove');
    }
  }
  
  // Function to remove a given moon, it's path and gui folder
  function removeMoon(name) {
    // Create a variable to store the moon's index
    var index = null;
    // Find the moon with the same name and save the index
    for(var i=0;i<moons.length;i++) {
      if(moons[i].userData.name == name)
        index = i;
    }
    // If planet was found then
    // remove its folder from the gui, 
    // remove it's path from the scene,
    // remove it from the scene and remove it from the planets array
    if(index!=null) {
      var folder = moons[index].userData.folder;
      var planet = moons[index].userData.centreMass;
      planet.remove(moons[index]);
      planet.remove(moons[index].userData.path);
      moons_gui.removeFolder(folder);
      moons.splice(index, 1);
    }
    // Refresh the remove planet dropdown so remove planet is no longer there
    if (remove_moon!=null) {
      remove_params.moon = "";
      remove_gui.remove(remove_moon);
      remove_gui.remove(remove_button);
      remove_moon = remove_gui.add(remove_params, 'moon', getMoons()).listen();
      remove_button = remove_gui.add(remove_params, 'remove');
    }
  }