var gui;

function buildGui() {
  gui = new dat.GUI();

  var sun_prop = {
    size: sun_mesh.scale.x,
    colour: sun_mesh.material.color.getHex()
  }

  var sun = gui.addFolder("Sun");
  sun.addColor(sun_prop, 'colour', 0, 0.1).onChange(function(val)
  {
    sun_mesh.material.color.setHex(val);
    sun_mesh.material.emissive.setHex(val);
    light.color.setHex(val);
  });
  sun.add(sun_prop, 'size', 0.1, 20).onChange(function(val)
  {
    sun_mesh.scale.set(val, val, val);
  });
  sun.open();
}
