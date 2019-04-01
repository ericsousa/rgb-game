var numSquares = 6
var colors 
var pickedColor
var pickedColorTone

var squares  = document.getElementsByClassName('square')
var rgbTitle = document.querySelector('#rgb-title')
var message = document.querySelector('.message')
var h1 = document.querySelector('h1')
var resetBtn = document.querySelector('#reset-button')
var modeBtns = document.querySelectorAll('.mode-button')

setResetAction()
setModeActions()
init()

function init () {
  colors = generateRandomColors()
  pickedColor = colors[pickOneRandomColor()]
  pickedColorTone = setColorTone(pickedColor)
  rgbTitle.textContent = pickedColor
  resetBtn.textContent = 'New Colors'
  message.textContent = ''

  setSquaresAction()
} 

function gameLogic (square) {
  var clickedColor = square.style.backgroundColor

  if (clickedColor === pickedColor) {
    message.textContent = 'Correct!'
    changeColorWinner(clickedColor)
    // if the winning color is light set h1 text to dark
    pickedColorTone === 'light' ? h1.style.color = '#232323' : h1.style.color = 'white'
    resetBtn.textContent = 'Play Again?'
    
  } else {
    square.style.backgroundColor = '#232323'
    message.textContent = 'Try Again'
  }
}

function setSquaresAction () {
  for (var i = 0; i < squares.length; i++) {
    // check if there's an available color to set the square
    if (colors[i]) {
      // set background color
      squares[i].style.backgroundColor = colors[i]
      // set click funcion
      squares[i].addEventListener('click', function () {
        gameLogic(this)
      })
      squares[i].style.display = 'block'
    } else {
      squares[i].style.display = 'none'
    }
  }
}

function setModeActions () {
  for (var i = 0; i < modeBtns.length; i++) {
    modeBtns[i].addEventListener('click', function () {
      modeBtns[0].classList.remove('selected')
      modeBtns[1].classList.remove('selected')
      this.classList.add('selected')
      numSquares = this.textContent === 'Easy' ? 3 : 6
      init()
    })
  }
}

function setResetAction () {
  resetBtn.addEventListener('click', function () {
    init()
  })
}

function changeColorWinner (color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color
  }
  h1.style.backgroundColor = color
}

function generateRandomRGB () {
  var r = Math.floor(Math.random() * 256)
  var g = Math.floor(Math.random() * 256)
  var b = Math.floor(Math.random() * 256)
  return 'rgb(' + r + ', ' + g + ', ' + b +')'
}

function generateRandomColors () {
  var result = []
  for (var i = 0; i < numSquares; i++) {
    result[i] = generateRandomRGB();
  }
  return result
}

function pickOneRandomColor () {
  return Math.floor(Math.random() * numSquares)
}

function setColorTone (color) {
  // separate rgb color string into arr
  var c = color.substring(color.indexOf('(') +1, color.length -1).split(', ');
  // calculate yqi formula to determine how light the color is
  var yiq = ((c[0]*299)+(c[1]*587)+(c[2]*114))/1000
  return yiq >= 160 ? 'light' : 'dark'
}