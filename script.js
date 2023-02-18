const DEFAULT_COLOR = "#333333"
const DEFAULT_MODE = "color"
const DEFAULT_SIZE = 16


let current_color = DEFAULT_COLOR
let current_mode = DEFAULT_MODE
let current_size = DEFAULT_SIZE


function setCurrentColor(newColor){
    current_color = newColor
}

function setCurrentMode(newMode){
    activateButton(newMode)
    current_mode = newMode
}
function setCurrentSize(newSize){
    setupGrid(newSize)
    current_size = newSize
}


const colorPicker = document.getElementById("colorPicker")
const colorButton = document.getElementById("colorButton")
const rainbowButton = document.getElementById("rainbowButton")
const eraserButton = document.getElementById("eraserButton")
const clearButton = document.getElementById("clearButton")
const slider = document.getElementById("sizeSlider")
const sizeValue = document.getElementById("sizeValue")
const grid = document.getElementById('grid')



colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorButton.onclick = () => setCurrentMode("color")
rainbowButton.onclick = () => setCurrentMode("rainbow")
eraserButton.onclick = () => setCurrentMode("eraser")
clearButton.onclick = () => reloadGrid()
slider.onmousemove = (e)=> updateSizeValue(e.target.value)
slider.onchange = (e)=> changeSize(e.target.value)

function updateSizeValue(value){
    sizeValue.innerHTML = `${value} x ${value}`
}

function changeSize(value){
  setCurrentSize(value)
  updateSizeValue(value)
  reloadGrid()
}

function activateButton(current_mode){
  if (current_mode === "color"){
    colorButton.classList.add("active")
    rainbowButton.classList.remove("active")
    eraserButton.classList.remove("active")
  } else if(current_mode === "rainbow") {
    rainbowButton.classList.add("active")
    colorButton.classList.remove("active")
    eraserButton.classList.remove("active")
  } else if (current_mode === "eraser"){
    rainbowButton.classList.remove("active")
    colorButton.classList.remove("active")
    eraserButton.classList.add("active")
  }
}

function reloadGrid(){
  clearGrid()
  setupGrid(current_size)
}

function clearGrid(){
  grid.innerHTML = ""
}

// setup grid
function setupGrid(size){
  grid.style.display = "grid"
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

  for (let i =0; i<size * size; i++){
    const gridElement = document.createElement("div")
    gridElement.classList.add("grid-element")
    gridElement.addEventListener("mouseover", changeColor)
    gridElement.addEventListener("mousedown", changeColor)

    grid.append(gridElement)
  }
}

let clicked = false
document.body.onmousedown = () => clicked = true
document.body.onmouseup = () => clicked = false
function randomColor(){
  let color = "#"
  let values = "fa1234567890"
  for(let i = 0; i< 6; i++){
    color += values[Math.floor(Math.random()*values.length)]
  }

  return color
}

randomColor()

function changeColor(e) {
    if(e.type === "mouseover" && !clicked) return
    if (current_mode == "color"){
        e.target.style.backgroundColor = current_color
    } else if(current_mode === "rainbow"){
      e.target.style.backgroundColor = randomColor()
    } else if(current_mode === "eraser"){
      e.target.style.backgroundColor = "#fff"
    }
}


window.onload = () => {
  setupGrid(DEFAULT_SIZE)
  activateButton(DEFAULT_MODE)
}















