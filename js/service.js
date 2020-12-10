'use strict'
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [
    { id: 0, url: './img/15.jpg', keywords: ['happy'] },
    { id: 1, url: './img/1.jpg', keywords: ['happy'] },
    { id: 2, url: './img/2.jpg', keywords: ['happy'] },
    { id: 3, url: './img/3.jpg', keywords: ['happy'] },
    { id: 4, url: './img/4.jpg', keywords: ['happy'] },
    { id: 5, url: './img/5.jpg', keywords: ['happy'] },
    { id: 6, url: './img/6.jpg', keywords: ['happy'] },
    { id: 7, url: './img/7.jpg', keywords: ['happy'] },
    { id: 8, url: './img/8.jpg', keywords: ['happy'] },
    { id: 9, url: './img/9.jpg', keywords: ['happy'] },
    { id: 10, url: './img/10.jpg', keywords: ['happy'] },
    { id: 11, url: './img/11.jpg', keywords: ['happy'] },
    { id: 12, url: './img/12.jpg', keywords: ['happy'] },
    { id: 13, url: './img/13.jpg', keywords: ['happy'] },
    { id: 14, url: './img/14.jpg', keywords: ['happy'] }
];
var gFonts = ['impact', 'arial', 'nerko one']
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        idx: 0,
        font: 0,
        txt: '',
        size: 35,
        align: 'left',
        color: 'red',
        x: 250,
        y: 75,
        isSelected: true
    }, {
        idx: 1,
        font: 2,
        txt: '',
        size: 35,
        align: 'left',
        color: 'red',
        x: 250,
        y: 425,
        isSelected: false
    }]
}

function clearData() {
    gMeme.lines.forEach(function(line) {
        line.x = 250;
        line.txt = ''
        line.size = 35
        if (line.idx === 0) {
            line.y = 75
        } else { line.y = 425 }
    })
}

function findImgById(id) {
    var idx = gImgs.findIndex(function(img) {
        return img.id === id
    })
    return idx
}

function addTxt(txt) {
    gMeme.lines[gSelectedLine].txt = txt
    gMeme.selectedImgId = gChosenImg
    return txt
}