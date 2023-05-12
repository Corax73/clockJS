const keys = document.querySelectorAll('#calculator span');
const operators = ['+', '-', 'x', '÷'];

let decimalAdded = false;

/**
 * handle the event,
 * calculation of equations
 */
function counting() {

    for(let i = 0; i < keys.length; i++) {
    
        keys[i].onclick = function(e) {
    
            let input = document.querySelector('.screen');
            let inputValue = input.innerHTML;
            let btnValue = this.innerHTML;
            
            if(btnValue == 'C') {
    
                input.innerHTML = '';
                decimalAdded = false;
    
            } else if (input.innerHTML == 'Деление на 0') {
                
                input.innerHTML = btnValue;
            
            } else if(btnValue == '=') {
    
                let equation = inputValue;
                let lastChar = equation[equation.length - 1];
                
                equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
                
                if(operators.includes(lastChar) || lastChar == '.') {
                    
                    equation = equation.replace(/.$/, '');
                
                }
                
                if(equation) {
    
                    if (eval(equation) == Infinity || eval(equation) == - Infinity) {
                        
                        input.innerHTML = 'Деление на 0';
                    
                    } else {
                        
                        input.innerHTML = eval(equation);
                    
                    }
                
                }
                    
                decimalAdded = false;
    
            } else if(operators.includes(btnValue)) {
    
                let lastChar = inputValue[inputValue.length - 1];
    
                if(inputValue != '' && !operators.includes(lastChar)) {
                    
                    input.innerHTML += btnValue;
    
                } else if(inputValue == '' && btnValue == '-') {
                    
                    input.innerHTML += btnValue;
    
                }
                
                if(operators.includes(lastChar) && inputValue.length > 1) {
    
                    input.innerHTML = inputValue.replace(/.$/, btnValue);
    
                }
                
                decimalAdded = false;
    
            } else if(btnValue == '.') {
                
                if(!decimalAdded) {
    
                    input.innerHTML += btnValue;
                    decimalAdded = true;
    
                }
    
            } else {
    
                input.innerHTML += btnValue;
    
            }
            
            e.preventDefault();
    
        }
    
    }

}

/**
 * script initialization
 */
function init() {

    counting();

}

init();