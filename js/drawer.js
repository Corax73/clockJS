const canv = document.getElementById('canvas');
const ctx = canv.getContext('2d');
let isMouseDown = false;
let coords = [];
let radius = 5;
let headColor = document.getElementById('head');
let colorForDraw;

const clearBtn = document.getElementById('btn-clear');
const repeatBtn = document.getElementById('btn-repeat');
const expandBtn = document.getElementById('btn-expand');

canv.width = 500;
canv.height = 500;

/**
 * getting the user-selected color
 */
function getColor() {
    
    headColor.addEventListener('change', function() {

        colorForDraw = headColor.value;
        ctx.strokeStyle = colorForDraw;
        ctx.fillStyle = colorForDraw;
    
    });

}
/**
 * drawing lines and saving to an array
 */
function draw() {
    
    ctx.strokeStyle = colorForDraw;
    ctx.fillStyle = colorForDraw;
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
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    
}

/**
 * replay drawing and clear storage
 */
function replay() {

    ctx.strokeStyle = colorForDraw;
    ctx.fillStyle = colorForDraw;
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
 * resizing the drawing area and reassigning line thickness
 */
function expand() {

    if (canv.width == 1500) {

        canv.width = 500;
        ctx.lineWidth = radius * 2;

    } else {

        canv.width = 1500;
        ctx.lineWidth = radius * 2;

    }
    
}

/**
 * buttons handler
 */
function btnHandler() {

    clearBtn.addEventListener('click', function() {

        clear();

    });

    repeatBtn.addEventListener('click', function() {

        replay();

    });

    expandBtn.addEventListener('click', function() {

        expand();

    });
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
    getColor();
    btnHandler();

}

init();