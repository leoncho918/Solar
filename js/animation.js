function showStartUp() {
    TweenMax.to($('#startMessage'), 0, {
        css: {
            display: ''
        },
        ease: Quad.easeInOut
    });
    TweenMax.to($('#border'), 0, {
        css: {
            display: '',
            opacity: 1,
            height: '0px'
        },
        ease: Quad.easeInOut
    });
    TweenMax.to($('#startMessage'), 1, {
        css: {
            opacity: 1
        },
        ease: Quad.easeInOut,
    });
    TweenMax.to($('#border'), 0.75, {
        css: {
            height: '400px',
        },
        delay: 0.75,
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
    TweenMax.to($('#startMessage'), 0.5, {
        css: {
            display: 'none'
        },
        delay: 1,
        ease: Quad.easeInOut
    });
    TweenMax.to($('#border'), 0.5, {
        css: {
            opacity: 0
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