canvas = document.getElementById("canvas")
aspectratio = document.getElementById("aspect-ratio")
context = canvas.getContext("2d")

var clicks = []
var drawing

function addClick(x, y, dragging) {
  clicks.push([x,y,dragging])
}

function paint(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)

  context.strokeStyle = "#000000"
  context.lineJoin = "round"
  context.lineWidth = 4

  for(var i=0; i < clicks.length; i++) {
    context.beginPath()
    if(clicks[i][2]/*dragging*/ && i != 0){
      context.moveTo(clicks[i-1][0], clicks[i-1][1])
    } else {
      context.moveTo(clicks[i][0], clicks[i][1])
    }
    context.lineTo(clicks[i][0], clicks[i][1])
    context.closePath()
    context.stroke()
  }
}

function startDrawing(x,y) {
  console.log(x, y)

  drawing = true
  addClick(x, y, false)
  paint()
}

function continueDrawing(x,y){
  if(drawing){
    addClick(x, y, true)
    paint()
  }
}

function stopDrawing() {
  drawing = false
}

function passPosMouse(func){
  return function(e) {
    x = e.layerX*canvas.width/canvas.offsetWidth
    y = e.layerY*canvas.height/canvas.offsetHeight
    func(x,y)
  }
}

function passPosTouch(func){
  return function(e) {
    x = (e.touches[0].pageX - aspectratio.offsetLeft)*canvas.width/canvas.offsetWidth
    y = (e.touches[0].pageY - aspectratio.offsetTop) *canvas.width/canvas.offsetWidth
    func(x,y)
  }
}

canvas.addEventListener('mousedown', passPosMouse(startDrawing))
canvas.addEventListener('touchstart', passPosTouch(startDrawing))

canvas.addEventListener('mousemove', passPosMouse(continueDrawing))
canvas.addEventListener('touchmove', passPosTouch(continueDrawing))

canvas.addEventListener('mouseup', stopDrawing)
canvas.addEventListener('touchend', stopDrawing)
canvas.addEventListener('mouseout', stopDrawing)
canvas.addEventListener('touchcancel', stopDrawing)


function upload() {
  let img = canvas.toDataURL("image/png")
  xhttp = new XMLHttpRequest()
  xhttp.open("POST", "upload", true)
  xhttp.send(img)
}
