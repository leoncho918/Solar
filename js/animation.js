// Variables to store the elements containing text
var info, d_name, d_category, d_desc;

// Function to show the startup message
function showStartUp() {
    // Set the startup message and boarder to visible
    TweenMax.to($('#startMessage'), 0, {
        css: {
            display: ''
        },
        delay: 0.25,
        ease: Quad.easeInOut
    });
    TweenMax.to($('#border'), 0, {
        css: {
            display: '',
            opacity: 1,
            height: '0px'
        },
        delay: 0.25,
        ease: Quad.easeInOut
    });
    // Animate the startup message fade in and boarder to grow in height
    TweenMax.to($('#startMessage'), 1, {
        css: {
            opacity: 1
        },
        ease: Quad.easeInOut,
    });
    // Animation for the white boarder
    TweenMax.to($('#border'), 0.5, {
        css: {
            height: '400px',
        },
        delay: 0.5,
        ease: Quad.easeInOut,
    });
}

// Function to hide the startup message
function hideStartUp() {
    // Make the startup message and boarder fade out
    TweenMax.to($('#startMessage'), 0.5, {
        css: {
            opacity: 0
        },
        ease: Quad.easeInOut
    });
    TweenMax.to($('#border'), 0.5, {
        css: {
            opacity: 0
        },
        ease: Quad.easeInOut
    });
    // Make the display of the startup message and boarder none
    TweenMax.to($('#startMessage'), 0.5, {
        css: {
            display: 'none'
        },
        ease: Quad.easeInOut
    });
    TweenMax.to($('#border'), 0.5, {
        css: {
            display: 'none'
        },
        ease: Quad.easeInOut
    });
}

// Function to show the info of the object
function showInfo(info_name, info_category, info_desc, colour) {
    // Function call to hide the startup message
    hideStartUp();
    // Function call to hide the info messages
    hideInfo();
    // Switch statement to determine what object is being passed in
    switch(info_name) {
        // If the object is the Sun or Moon then set the element text to their respective data
        case "Sun":
        case "Moon":
            d_name.innerHTML = "The <span id='name_keyword'>" + info_name + "</span>";
            d_desc.innerHTML = "The <span id='desc_keyword'>" + info_name + "</span>" + " " + info_desc;
            break;
        // If the object is Saturn then set the element text to their respective data
        case "Saturn":
            d_name.innerHTML = "<span id='name_keyword'>" + info_name + "</span>";
            // Editing the innerHtml of the description so that Saturn is in coloured text
            var sat_name = info_name;
            var index = info_desc.indexOf(".") + 1
            var sat_desc1 = info_desc.slice(0, index);
            var sat_desc2 = info_desc.slice(index, info_desc.length);
            d_desc.innerHTML = "<span id='desc_keyword'>" + sat_name + "</span> " + sat_desc1 + " <span id='desc_keyword2'>" + sat_name + "</span> " + sat_desc2;
            break;
        // If object is anything else then set the element text to their respective data
        default:
            d_name.innerHTML = "<span id='name_keyword'>" + info_name + "</span>";
            if (info_desc=="")
                d_desc.innerHTML = "";
            else
                d_desc.innerHTML = "<span id='desc_keyword'>" + info_name + "</span>" + " " + info_desc;
            break;
    }
    // Switch statement to determine what type of item it is
    switch(info_category) {
        // Print terrestrial in colour
        case "Terrestrial Planet":
            d_category.innerHTML = "<span id='category_keyword'>Terrestrial</span> Planet";
            break;
        // Print giant in colour
        case "Gas Giant":
            d_category.innerHTML = "Gas <span id='category_keyword'>Giant</span>";
            break;
        // Print yellow in colour
        case "Yellow Dwarf":
            d_category.innerHTML = "<span id='category_keyword'>Yellow</span> Dwarf";
            break;
        // Print  natural in colour
        case "Natural Satellite":
            d_category.innerHTML = "<span id='category_keyword'>Natural</span> Satellite";
            break;
        // If anything else set the innerHtml to nothing
        default:
        d_category.innerHTML = "";
            break;
    }
    // Get the element that has the id name_keyword and change it's colour and font weight
    var item_name = document.getElementById('name_keyword');
    item_name.style.color = colour;
    item_name.style.fontWeight = 800;
    // Get the element that has the id category_keyword, make sure it exists and change its colour and font weight
    var item_category = document.getElementById('category_keyword');
    if (item_category!=null) {
        item_category.style.color = colour;
        item_category.style.fontWeight = 800;
    }
    // Get the element that has the id desc_keyword, make sure it exists and change its colour and font weight
    var item_desc = document.getElementById('desc_keyword');
    if (item_desc!=null) {
        item_desc.style.color = colour;
        item_desc.style.fontWeight = 800;
    }
    // Get the element that has the id desc_keyword2, make sure it exists and change its colour and font weight
    var item_desc2 = document.getElementById('desc_keyword2');
    if (item_desc2!=null) {
        item_desc2.style.color = colour;
        item_desc2.style.fontWeight = 800;
    }
    // Make the info text and boarder visible
    TweenMax.to($('#info'), 0, {
        css: {
            opacity: 1,
            display: 'block'
        },
        delay: 0.2,
        ease: Quad.easeInOut
    });
    TweenMax.to($('#border'), 0, {
        css: {
            opacity: 1,
            display: 'block',
            height: '0px'
        },
        delay: 0.2,
        ease: Quad.easeInOut
    });
    // Animate the info text to slide in and boarder to grow in height
    TweenMax.from($('#info'), 0.5, {
        css: {
            left: '-500px'
        },
        delay: 0.25,
        ease: Quad.easeInOut
    });
    TweenMax.to($('#border'), 0.5, {
        css: {
            height: '400px'
        },
        delay: 0.75,
        ease: Quad.easeInOut
    });
}

// Function to hide the info text
function hideInfo() {
    // Animate the info text to fade out and set it's display to none
    TweenMax.to($('#info'), 0.25, {
        css: {
            display: 'none',
            opacity: 0
        },
        ease: Quad.easeInOut
    });
    TweenMax.to($('#border'), 0.25, {
        css: {
            display: 'none',
            opacity: 0
        },
        ease: Quad.easeInOut
    });
}