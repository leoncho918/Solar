function activateControls() {
  var blocker = document.getElementById('blocker');
  var instructions = document.getElementById('instructions');
  var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
  if ( havePointerLock ) {
    var docBody = document.body;
    var pointerLockStateChange = function ( event ) {
      if ( document.pointerLockElement === docBody || document.mozPointerLockElement === docBody || document.webkitPointerLockElement === docBody ) {
        controlsEnabled = true;
        controls.enabled = true;
        blocker.style.display = 'none';
      } else {
        controls.enabled = false;
        controlsEnabled = false;
        blocker.style.display = '-webkit-box';
        blocker.style.display = '-moz-box';
        blocker.style.display = 'box';
        instructions.style.display = '';
      }
    };
    // Hook pointer lock state change events
    document.addEventListener( 'pointerlockchange', pointerLockStateChange, false );
    document.addEventListener( 'mozpointerlockchange', pointerLockStateChange, false );
    document.addEventListener( 'webkitpointerlockchange', pointerLockStateChange, false );
    instructions.addEventListener( 'click', function ( event ) {
      controlsEnabled = true;
      instructions.style.display = 'none';
      // Ask the browser to lock the pointer
      docBody.requestPointerLock = docBody.requestPointerLock || docBody.mozRequestPointerLock || docBody.webkitRequestPointerLock;
      if ( /Firefox/i.test( navigator.userAgent ) ) {
        var fullscreenchange = function ( event ) {
          if ( document.fullscreenElement === docBody || document.mozFullscreenElement === docBody || document.mozFullScreenElement === docBody ) {
            document.removeEventListener( 'fullscreenchange', fullscreenchange );
            document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
            docBody.requestPointerLock();
          }
        };
        document.addEventListener( 'fullscreenchange', fullscreenchange, false );
        document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );
        docBody.requestFullscreen = docBody.requestFullscreen || docBody.mozRequestFullscreen || docBody.mozRequestFullScreen || docBody.webkitRequestFullscreen;
        docBody.requestFullscreen();
      } else {
        docBody.requestPointerLock();
      }
    }, false );
  }

  function autoCameraMovement(){
    camera.position.set(35, 0, 50);
    scene.add(camera);
  }

  var onKeyDown = function ( event ) {

    switch ( event.keyCode ) {

      case 38: // up
      case 87: // w
        moveForward = true;
        break;

      case 37: // left
      case 65: // a
        moveLeft = true;
        break;

      case 40: // down
      case 83: // s
        moveBackward = true;
        break;

      case 39: // right
      case 68: // d
        moveRight = true;
        break;

      case 32:
        moveUp = true;
        break;

      case 16:
        moveDown = true;
        break;

      case 81:
        // PointerLockControls.enabled = false;
        // autoCameraMovement();
        camera.position.set(35, 0, 50);
        scene.add(camera);
        break;

    }

  };

  var onKeyUp = function ( event ) {

    switch( event.keyCode ) {

      case 38: // up
      case 87: // w
        moveForward = false;
        break;

      case 37: // left
      case 65: // a
        moveLeft = false;
        break;

      case 40: // down
      case 83: // s
        moveBackward = false;
        break;

      case 39: // right
      case 68: // d
        moveRight = false;
        break;

      case 32:
        moveUp = false;
        break;

      case 16:
        moveDown = false;
        break;

      case 81:
        // PointerLockControls.enabled = true;
        init();

        break;

    }
  };

  document.addEventListener( 'keydown', onKeyDown, false );
  document.addEventListener( 'keyup', onKeyUp, false );
}
