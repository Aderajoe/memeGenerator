'use strict'
var gCtx;
var gCanvas;
var text;
var gTxtLocation = { x: 250, y: 100 }
var gChosenImg
var gSelectedLine
var fontSize = 40
var gFontSelected

function init() {
    gFontSelected = 0
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
    clearInput()
}

function onChooseImg(id) {
    gChosenImg = id
    loadImg(id)
    var elEditPage = document.querySelector('.edit')
    elEditPage.style.display = 'flex'
    var elEntryPage = document.querySelector('.home-page')
    elEntryPage.style.display = 'none'
    drawTxtBox()
    drawTxtBox()
}

function onLoadPage() {
    var strHTML = ''
    var strHTML = gImgs.map(function(img) {
        return `<img class="image"src="${img.url}" onClick="onChooseImg(${img.id})" >`
    })
    var elImgPool = document.querySelector('.img-pool')
    elImgPool.innerHTML = strHTML.join('')
}

function drawText(text, x, y) {
    gCtx.lineWidth = '1.5'
    gCtx.font = 'italic small-caps 900 ' + fontSize + 'px ' + gFonts[line.font]
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
        gCtx.font = 'normal small-caps 900 ' + line.size + 'px ' + gFonts[line.font]
        gCtx.textAlign = 'center'
        gCtx.fillText(text, x, y)
        gCtx.strokeText(text, x, y)
    })
}

function clearInput() {
    var elInput = document.querySelector('input[name=memeText]')
    elInput.value = ''
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
        gCtx.font = 'normal small-caps 900 ' + line.size + 'px ' + gFonts[line.font]
        gCtx.textAlign = 'center'
        gCtx.fillText(text, x, y)
        gCtx.strokeText(text, x, y)
    })
    drawTxtBox()
}

function drawTxtBox() {
    var line = gMeme.lines[gSelectedLine]
    var x = line.x;
    var y = line.y;
    gCtx.beginPath()
    gCtx.moveTo(x - 200, y - line.size + 10)
    gCtx.lineTo(x + 200, y - line.size + 10)
    gCtx.lineTo(x + 200, y + 10)
    gCtx.lineTo(x - 200, y + 10)
    gCtx.closePath()
    gCtx.stroke()
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
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
    drawMeme()
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}

function onLineUp() {
    gMeme.lines[gSelectedLine].y += -25;
    drawMeme()
    drawTxtBox()
}

function onLineDown() {
    gMeme.lines[gSelectedLine].y += +25;
    drawMeme()
    drawTxtBox()
}

function onChangeLine() {
    var elChaneButton = document.querySelector('.change-line')
    var line = gMeme.lines
    if (gSelectedLine === 0) {
        elChaneButton.innerHTML = 'Change to first line'
        gSelectedLine = 1;
        line[0].isSelected = false
        line[1].isSelected = true
    } else {
        elChaneButton.innerHTML = 'Change to second line'
        gSelectedLine = 0;
        line[0].isSelected = true
        line[1].isSelected = false
    }
    drawMeme()
    drawTxtBox()
    clearInput()
}

function onFontIncrs() {
    var line
    if (gSelectedLine === 0) {
        line = gMeme.lines[0]
    } else {
        line = gMeme.lines[1]
    }
    line.size += 3
    drawMeme()
    drawTxtBox()
}

function onFontDecrs() {
    var line
    if (gSelectedLine === 0) {
        line = gMeme.lines[0]
    } else {
        line = gMeme.lines[1]
    }
    line.size += -3
    drawMeme()
    drawTxtBox()
}