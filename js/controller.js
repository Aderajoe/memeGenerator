'use strict'
var gCtx;
var gCanvas;
var text;
var gTxtLocation = { x: 250, y: 100 }
var gChosenImg
var gSelectedLine
var fonSize = 40

function init() {
    gSelectedLine = 0
    gCanvas = document.getElementById('canvas')
    gCtx = gCanvas.getContext('2d')
    clearCanvas()
    onLoadPage()
}

function createNewMeme() {
    var elEditPage = document.querySelector('.edit')
    elEditPage.style.display = 'none'
    var elEntryPage = document.querySelector('.home-page')
    elEntryPage.style.display = 'flex'
    clearData()
}

function onChooseImg(id) {
    gChosenImg = id
    loadImg(id)
    var elEditPage = document.querySelector('.edit')
    elEditPage.style.display = 'flex'
    var elEntryPage = document.querySelector('.home-page')
    elEntryPage.style.display = 'none'
}

function onLoadPage() {
    var strHTML = ''
    var strHTML = gImgs.map(function(img) {
        return `<img class="image-pool"src="${img.url}" onClick="onChooseImg(${img.id})" >`
    })
    var elImgPool = document.getElementById('img-pool')
    elImgPool.innerHTML = strHTML.join('')

}

function drawText(text, x, y) {
    gCtx.lineWidth = '1.5'
    gCtx.font = 'italic small-caps 900 ' + fonSize + 'px serif'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    drawTxtBox()
}

function onChangeText() {
    clearCanvas()
    reDrawImg()
    changeTxt()
}

function drawMeme() {
    clearCanvas()
    reDrawImg()
    gMeme.lines.forEach(function(line) {
        text = line.txt
        gCtx.lineWidth = '1.5'
        var x = line.x
        var y = line.y
        gCtx.font = 'italic small-caps 900 ' + line.size + 'px serif'
        gCtx.textAlign = 'center'
        gCtx.fillText(text, x, y)
        gCtx.strokeText(text, x, y)
    })
}

function changeTxt() {
    gMeme.lines.forEach(function(line) {
        if (line.isSelected) {
            var elInput = document.querySelector('input[name=memeText]')
            text = addTxt(elInput.value)
        } else {
            text = line.txt
        }
        gCtx.lineWidth = '1.5'
        var x = line.x
        var y = line.y
        gCtx.font = 'italic small-caps 900 ' + line.size + 'px serif'
        gCtx.textAlign = 'center'
        gCtx.fillText(text, x, y)
        gCtx.strokeText(text, x, y)
    })
}

function drawTxtBox() {
    var x = gTxtLocation.x;
    var y = gTxtLocation.y;
    gCtx.beginPath()
    gCtx.moveTo(x - 100, y - 20)
    gCtx.lineTo(x + 100, y - 20)
    gCtx.lineTo(x + 100, y + 20)
    gCtx.lineTo(x - 100, y + 20)
    gCtx.closePath()
        //gCtx.strokeStyle = 'black'
    gCtx.stroke()
        // gCtx.fillStyle = 'black'
    gCtx.fill()
}

function reDrawImg() {
    var img = new Image();
    img.src = gImgs[gChosenImg].url;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function loadImg() {
    var img = new Image();
    img.src = gImgs[gChosenImg].url;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
    drawTxtBox()
}



function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function downloadMeme(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}

function onLineUp() {
    gMeme.lines[gSelectedLine].y += -25;
    drawMeme()
}

function onLineDown() {
    gMeme.lines[gSelectedLine].y += +25;
    drawMeme()
}

function onChangeLine() {
    var elChaneButton = document.querySelector('.change-line')
    if (gSelectedLine === 0) {
        elChaneButton.innerHTML = 'Change to first line'
        gSelectedLine = 1;
        gMeme.lines[0].isSelected = false
        gMeme.lines[1].isSelected = true
    } else {
        elChaneButton.innerHTML = 'Change to second line'
        gSelectedLine = 0;
        gMeme.lines[0].isSelected = true
        gMeme.lines[1].isSelected = false
    }
}

function onFontIncrs() {
    var line
    if (gSelectedLine === 0) {
        line = gMeme.lines[0]
    } else {
        line = gMeme.lines[1]
    }
    line.size += 3
    console.log(line.size)
}

function onFontDecrs() {
    var line
    if (gSelectedLine === 0) {
        line = gMeme.lines[0]
    } else {
        line = gMeme.lines[1]
    }
    line.size += -3
}