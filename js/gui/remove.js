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
    if (remove_planet!=null) {
      remove_gui.remove(remove_planet);
      remove_gui.remove(remove_button);
      remove_planet = remove_gui.add(remove_params, 'planet', getPlanets()).listen();
      remove_button = remove_gui.add(remove_params, 'remove');
    }
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
    if (remove_moon!=null) {
      remove_params.moon = "";
      remove_gui.remove(remove_moon);
      remove_gui.remove(remove_button);
      remove_moon = remove_gui.add(remove_params, 'moon', getMoons()).listen();
      remove_button = remove_gui.add(remove_params, 'remove');
    }
  }