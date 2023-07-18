let firstOperand = ''
let secondOperand = ''
let operator = null
let resetScreen = false

const numberButtons = document.querySelectorAll('[number]')
const operatorButtons = document.querySelectorAll('[operator]')
const clearBtn = document.querySelector('#clearBtn')
const backspaceBtn = document.querySelector('#backspaceBtn')
const equalsBtn = document.querySelector('#equalsBtn')
const signBtn = document.querySelector('#signBtn')
const pointBtn = document.querySelector('#pointBtn')
const eqnScreen = document.querySelector('.screen-eqn')
const opnScreen = document.querySelector('.screen-opn')

function resetScreenText() {
    opnScreen.textContent = ''
    resetScreen = false
}

window.addEventListener('keydown', handleInput)
equalsBtn.addEventListener('click', evaluate)
clearBtn.addEventListener('click', clear)
backspaceBtn.addEventListener('click', backspace)
signBtn.addEventListener('click', reverseSign)
pointBtn.addEventListener('click', appendPoint)

// Removing default nature of enter
const buttons = document.querySelectorAll('button')
buttons.forEach(button => button.setAttribute('onclick', 'this.blur()'))

numberButtons.forEach(button => 
    button.addEventListener('click', () => appendNumber(button.textContent)))

operatorButtons.forEach(button =>
    button.addEventListener('click', () => setOperator(button.textContent)))

function handleKeyDown(e) {
    console.log(e)
    if(e === 'Enter') e.preventDefault()
}

function appendNumber(number) {
    if(opnScreen.textContent === '0' || resetScreen) {
        resetScreenText()
    }
    opnScreen.textContent += number
}

function appendPoint() {
    if(resetScreen) {
        resetScreenText()
        opnScreen.textContent = '0'
    }
    if(opnScreen.textContent.includes('.')) return
    opnScreen.textContent += '.'
}

function reverseSign() {
    opnScreen.textContent = -opnScreen.textContent.toString()
}

function clear() {
    eqnScreen.textContent = ''
    opnScreen.textContent = '0'
    firstOperand = ''
    secondOperand = ''
    operator = null
}

function backspace() {
    opnScreen.textContent = opnScreen.textContent
        .toString()
        .slice(0, -1)
    if(opnScreen.textContent === '' || opnScreen.textContent === '-') {
        opnScreen.textContent = '0'
    }
}

function setOperator(opn) {
    if(operator === '÷' && opnScreen.textContent === '0') {
        alert('Can\'t divide by 0!')
        return
    }
    if(operator !== null) evaluate()
    firstOperand = opnScreen.textContent
    operator = opn
    eqnScreen.textContent = `${firstOperand} ${operator}`
    resetScreen = true
}

function round(n) {
    return Math.round(n * 1000) / 1000
}

function evaluate() {
    console.log(operator)
    if(operator === null || resetScreen) return
    if(operator === '÷' && opnScreen.textContent === '0') {
        alert('Can\'t divide by 0!')
        return
    }
    secondOperand = opnScreen.textContent
    opnScreen.textContent = round(equate(operator, firstOperand, secondOperand))
    eqnScreen.textContent = `${firstOperand} ${operator} ${secondOperand} =`
    operator = null
}

function convertOperator(key) {
    switch (key) {
        case '+' : return '+'
        case '-' : return '-'
        case '*' : return 'x'
        case '/' : return '÷'
        default : return null
    }
}

function handleInput(e) {
    // console.log(e.key)
    if(e.key === 'Backspace') backspace()
    else if(e.key === 'Delete') clear()
    else if(e.key === '.') appendPoint()
    else if(e.key >= 0 && e.key <= 9) appendNumber(e.key)
    else if(e.key === 'Enter' || e.key === '=') evaluate()
    else if(e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*'){
        setOperator(convertOperator(e.key))
    }
}

function equate(opn, a, b) {
    a = +a
    b = +b
    switch (opn) {
        case '+' : return a + b
        case '-' : return a - b
        case '÷' : return a / b
        case 'x' : return a * b
        default : return null
    }
}