const stext = document.getElementById('body1');
const fitalic = document.getElementById('italicFont');
const fbold = document.getElementById('boldFont');
const family = document.getElementsByName('fontFamily');
const fsize = document.getElementById('fontSize');
const fcolor = document.getElementById('fontColor');
const tfamily = document.getElementById('A');
const tstyle = document.getElementById('B');
const tsize = document.getElementById('C');
const tcolor = document.getElementById('D');

/**
 * handle the event
 */
function setHandlers() {
    
    fitalic.addEventListener('change', getStyle);
    
    fbold.onchange=getStyle;
    
    for(let k = 0; k < family.length; k++) {
        
        family[k].addEventListener('change', getFamily);
    
    }
    
    fsize.addEventListener('change', getSize);
    
    fcolor.onchange = function() {
        
        getColor();

    }

}

/**
 * setting and displaying styles
 */
function getStyle() {
    
    let txt = '';
    
    if(fbold.checked) {
        
        stext.style.fontWeight = 'bold';        
        txt += ' жирный';
    
    } else {
        
        stext.style.fontWeight = 'normal';
    
    }
    
    if(fitalic.checked) {
        
        stext.style.fontStyle = 'italic';
        txt += ' курсивный';
    
    } else {
        
        stext.style.fontStyle = 'normal';
    
    }
    
    if(txt == '') {
        
        txt = ' обычный';
    
    }
    
    tstyle.innerHTML = txt;

}

/**
 * installation and output of fonts
 * @returns 
 */
function getFamily() {
    
    for(let k = 0; k < family.length; k++) {
        
        if(family[k].checked) {
            
            stext.style.fontFamily = family[k].value;
            tfamily.innerHTML = family[k].value;
            
            return;
        
        }

    }

}

/**
 * setting and displaying font sizes
 */
function getSize() {
    
    stext.style.fontSize = fsize.value+'pt';
    tsize.innerHTML = fsize.value;

}

/**
 * setting and displaying colors
 */
function getColor() {
    
    stext.style.color = fcolor.value;
    tcolor.innerHTML = translationColor(fcolor.value);

}

/**
 * translation string 'color'
 * @param {string} color 
 * @returns 
 */
function translationColor(color) {
    
    if(color == 'red') return 'красный';
    if(color == 'blue') return 'синий';
    if(color == 'green') return 'зеленый';

}

/**
 * script initialization
 */
function init() {
    
    fitalic.checked = false;
    fbold.checked = false;
    family[0].checked = true;
    fsize[0].selected = true;
    fcolor[0].selected = true;
    setHandlers();
    getStyle();
    getFamily();
    getSize();
    getColor();

}

init();