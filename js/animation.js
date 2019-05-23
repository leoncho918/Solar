var info, d_name, d_category, d_desc;

function showStartUp() {
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
    TweenMax.to($('#startMessage'), 1, {
        css: {
            opacity: 1
        },
        ease: Quad.easeInOut,
    });
    TweenMax.to($('#border'), 0.5, {
        css: {
            height: '400px',
        },
        delay: 0.5,
        ease: Quad.easeInOut,
    });
}

function hideStartUp() {
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

function showInfo(info_name, info_category, info_desc, colour) {
    hideStartUp();
    hideInfo();
    switch(info_name) {
        case "Sun"||"Moon":
            d_name.innerHTML = "The <span id='name_keyword'>" + info_name + "</span>";
            d_desc.innerHTML = "The <span id='desc_keyword'>" + info_name + "</span>" + " " + info_desc;
            break;
        case "Saturn":
            d_name.innerHTML = "<span id='name_keyword'>" + info_name + "</span>";
            var sat_name = info_name;
            var index = info_desc.indexOf(".") + 1
            var sat_desc1 = info_desc.slice(0, index);
            var sat_desc2 = info_desc.slice(index, info_desc.length);
            d_desc.innerHTML = "<span id='desc_keyword'>" + sat_name + "</span> " + sat_desc1 + " <span id='desc_keyword2'>" + sat_name + "</span> " + sat_desc2;
            break;
        default:
            d_name.innerHTML = "<span id='name_keyword'>" + info_name + "</span>";
            if (info_desc=="")
                d_desc.innerHTML = "";
            else
                d_desc.innerHTML = "<span id='desc_keyword'>" + info_name + "</span>" + " " + info_desc;
            break;
    }
    switch(info_category) {
        case "Terrestrial Planet":
            d_category.innerHTML = "<span id='category_keyword'>Terrestrial</span> Planet";
            break;
        case "Gas Giant":
            d_category.innerHTML = "Gas <span id='category_keyword'>Giant</span>";
            break;
        case "Yellow Dwarf":
            d_category.innerHTML = "<span id='category_keyword'>Yellow</span> Dwarf";
            break;
        case "Natural Satellite":
            d_category.innerHTML = "<span id='category_keyword'>Natural</span> Satellite";
            break;
        default:
        d_category.innerHTML = "";
            break;
    }
    var item_name = document.getElementById('name_keyword');
    item_name.style.color = colour;
    item_name.style.fontWeight = 800;
    var item_category = document.getElementById('category_keyword');
    if (item_category!=null) {
        item_category.style.color = colour;
        item_category.style.fontWeight = 800;
    }
    var item_desc = document.getElementById('desc_keyword');
    if (item_desc!=null) {
        item_desc.style.color = colour;
        item_desc.style.fontWeight = 800;
    }
    var item_desc2 = document.getElementById('desc_keyword2');
    if (item_desc2!=null) {
        item_desc2.style.color = colour;
        item_desc2.style.fontWeight = 800;
    }

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

function hideInfo() {
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