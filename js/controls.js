// Function to activate the movement controls
function activateControls() {
  // Get the div element that is the blocker
  var blocker = document.getElementById('blocker');
  // Get the element that contains game instructions
  var instructions = document.getElementById('instructions');
  // Check if the browser being used supports locking the pointer
  var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
  // If the browser supports pointer locking
  if ( havePointerLock ) {
    // Get the document body
    var docBody = document.body;
    // Store the state of the pointer lock
    var pointerLockStateChange = function ( event ) {
      // If the pointer is locked, then enable the controls, hide the welcome and info text and remove hide buttons in the folders
      if ( document.pointerLockElement === docBody || document.mozPointerLockElement === docBody || document.webkitPointerLockElement === docBody ) {
        controlsEnabled = true;
        controls.enabled = true;
        hideStartUp();
        hideInfo();
        removeHide();
      }
      // If the pointer is no longer locked, then disable the controls, make the blocker visible and show the startup message
      else {
        controls.enabled = false;
        controlsEnabled = false;
        blocker.style.display = '-webkit-box';
        blocker.style.display = '-moz-box';
        blocker.style.display = 'box';
        showStartUp();
      }
    };
    // Add event listeners for when the pointer lock state changes
    document.addEventListener( 'pointerlockchange', pointerLockStateChange, false );
    document.addEventListener( 'mozpointerlockchange', pointerLockStateChange, false );
    document.addEventListener( 'webkitpointerlockchange', pointerLockStateChange, false );
    // If the mouse clicks the blocker div element, then enable controls, hide startup and info text and remove hide from all folder
    blocker.addEventListener( 'click', function ( event ) {
      controlsEnabled = true;
      hideStartUp();
      hideInfo();
      removeHide();
      // Request the pointer to be locked
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

  // Function variable called when a key is pressed
  var onKeyDown = function ( event ) {
    // Switch statement to determine what key is being pressed
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

      case 32: // space
        moveUp = true;
        break;

      case 16: // shift
        moveDown = true;
        break;

    }

  };

  // Function variable called when key is released
  var onKeyUp = function ( event ) {
    // Switch statement to determine what key is being released
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

      case 32: // space
        moveUp = false;
        break;

      case 16: // shift
        moveDown = false;
        break;

    }
  };

  // Add event listeners for when keys are pressed and released
  document.addEventListener( 'keydown', onKeyDown, false );
  document.addEventListener( 'keyup', onKeyUp, false );
}
