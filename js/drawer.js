const canv = document.getElementById('canvas');
const ctx = canv.getContext('2d');
let isMouseDown = false;
let coords = [];
let radius = 5;

canv.width = window.innerWidth;
canv.height = window.innerHeight;

/**
 * drawing lines and saving to an array
 */
function draw() {
    
    canv.addEventListener('mousedown', function() {
        
        isMouseDown = true;
    
    });
    
    canv.addEventListener('mouseup', function() {
        
        isMouseDown = false;
        ctx.beginPath();
        coords.push('mouseup');
    
    });
    
    ctx.lineWidth = radius * 2;
    canv.addEventListener('mousemove', function(e) {
        
        if (isMouseDown) {
            
            coords.push([e.clientX, e.clientY]);
            
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY);
        
        }
    
    });

}

/**
 * saving to storage
 */
function save() {

    localStorage.setItem('coords', JSON.stringify(coords));

}

/**
 * cleaning the canvas area
 */
function clear() {

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.beginPath();
    ctx.fillStyle = 'black';

}

/**
 * replay drawing and clear storage
 */
function replay() {

    let timer;
    timer = setInterval(function() {

        if (!coords.length) {

            clearInterval(timer);
            ctx.beginPath();
            return;

        }

        let crd;
        crd = coords.shift();

        let e;
        e = {
            clientX: crd['0'],
            clientY: crd['1']
        };

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    
    }, 20);

    localStorage.removeItem('coords');

}

/**
 * control key response
 */
function listenerKeyboard() {
    
    document.addEventListener('keydown', function(e) {

        if (e.keyCode == 83) {
            
            save();
        
        }
        
        if (e.keyCode == 82) {
            
            replay();
        
        }
        
        if (e.keyCode == 67) {
            
            clear();
        
        }
    
    });

}


/**
 * script initialization
 */
function init() {
    
    listenerKeyboard();
    draw();

}

init();