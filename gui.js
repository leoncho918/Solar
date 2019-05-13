var gui;

function buildGui() {
  gui = new dat.GUI();

  var sun_prop = {
    size: planets[0].scale.x,
    colour: planets[0].material.color.getHex()
  }

  var sun = gui.addFolder("Sun");
  sun.addColor(sun_prop, 'colour', 0, 0.1).onChange(function(val)
  {
    planets[0].material.color.setHex(val);
    planets[0].material.emissive.setHex(val);
    light.color.setHex(val);
  });
  sun.add(sun_prop, 'size', 0.1, 20).onChange(function(val)
  {
    planets[0].scale.set(val, val, val);
  });
  sun.open();
}
