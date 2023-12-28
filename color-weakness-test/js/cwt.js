// var playing = True;
// a.length = 0 => Initialize array a.
var w = document.body.offsetWidth;
var h = document.body.offsetHeight;
var title = document.createElement("div");
var titleName = document.createElement("h2");
let timeRemain = document.createElement('div');
let start = false;
let timeCounting = false;
let timer;
let gameTime = 60;
let timeCounter = gameTime;
var bodyZone = document.createElement("div");
var playZone = document.createElement("div");
let optionZone = document.createElement('div');
let timeResult = document.createElement('div');
let inputDiv = document.createElement('div');
let inputLabel = document.createElement('label');
let inputBox = document.createElement('input');
let inputConfirm = document.createElement('div');
let replayInOption = document.createElement('div');
let pauseZone = document.createElement('div');
let pauseText = document.createElement('div');
let rankZone = document.createElement('div');
let rankReplay = document.createElement('div');
let rank = [];
var playGrids = [];
var colorNumber = "rgb(255, 255, 255)";
var colorDifferent = "rgb(255, 255, 255)";
var gridSideAmounts = 1;
var difficult = 128 / gridSideAmounts;
var s = gridSideAmounts * gridSideAmounts;
var pw = (playZone.offsetWidth - 24) / gridSideAmounts + "px";
var differentColorGridNumber = 0;
let score = 0;
let highest = 0;
let scoreDiv = document.createElement('div');
let scoreZone = document.createElement('div');
let highestDiv = document.createElement('div');
let pauseDiv = document.createElement('div');

function creategrid(gridWidth, gridColor, gridPass) {
    var p = document.createElement("div");
    p.className = "grid";
    p.gridPass = gridPass;
    p.style.padding = "2px";
    p.style.borderRadius = "10px";
    p.style.width = gridWidth;
    p.style.height = gridWidth;
    p.style.backgroundColor = gridColor;
    p.style.zIndex = 1;
    p.style.boxSizing = "border-box";
    p.addEventListener("click", function () {
        var grids = document.getElementsByClassName('grid');

        while (grids.length > 0) {
            playZone.removeChild(grids[0]);
        }

        if (gridPass == false) {
            if (start == true) {
                failed();
            }
            else {
                alert('請點擊顏色不同方塊');
                init();
            }
        }
        else {
            //計時開始
            if (timeCounting == false) {
                timeCounting = true;
                timeRemain.innerHTML = '剩餘時間' + timeCounter;
                timer = setInterval(function () {
                    timeCounter--;
                    timeRemain.innerHTML = '剩餘時間' + timeCounter;
                    if (timeCounter < 1) {
                        clearInterval(timer);
                        failed();
                    }
                }, 1000);
                start = true;
            }
            //進階
            score = score + 1;
            if (score >= highest) {
                highest = score;
                highestDiv.innerHTML = 'highest：' + highest;
            }
            scoreDiv.innerHTML = 'score：' + score;
            getRandomColor();
            playZoneAppendGrids();
        }
    });
    playGrids.push(p);
}

function playZoneAppendGrids() {
    if (gridSideAmounts < 8) {
        gridSideAmounts += 1;
    };

    playGrids = [];

    s = gridSideAmounts * gridSideAmounts;
    pw = (playZone.offsetWidth - 24) / gridSideAmounts + "px";

    differentColorGridNumber = Math.floor(Math.random() * s);

    for (let i = 0; i < s; i++) {
        if (i == differentColorGridNumber) {
            creategrid(pw, colorDifferent, true);
        }
        else {
            creategrid(pw, colorNumber, false);
        }
    }
    for (var i = 0; i < s; i++) {
        playZone.appendChild(playGrids[i]);
    }
}

//initialize

getRandomColor();

document.body.style.boxSizing = "border-box";
document.body.style.margin = "0px";
document.body.style.padding = "0px";
document.body.display = 'flex';
document.body.flexDirection = 'column';
document.body.justifyContent = 'space-between';


title.style.width = "100vw";
title.style.height = "10vh";
title.style.backgroundColor = "red";
title.style.display = "flex";
title.style.justifyContent = "space-evenly";
title.style.alignItems = "Center";
document.body.appendChild(title);

titleName.innerHTML = "色弱測試";
titleName.style.color = "white";
titleName.style.margin = '0px 50px';
title.appendChild(titleName);

timeRemain.innerHTML = '請按下不同顏色方塊';
timeRemain.style.color = 'white';
timeRemain.style.margin = '0px 50px';
timeRemain.style.width = '150px';
title.appendChild(timeRemain);

bodyZone.style.width = "100vw";
bodyZone.style.height = "80vh";
bodyZone.style.backgroundColor = "black";
bodyZone.style.display = "flex";
bodyZone.style.flexDirection = 'column';
bodyZone.style.justifyContent = "Center";
bodyZone.style.alignItems = "Center";
document.body.appendChild(bodyZone);

w = document.body.offsetWidth;
h = document.body.offsetHeight;
if (h >= w) {
    playZone.style.width = "80vw";
    playZone.style.height = "80vw";
}
else {
    playZone.style.width = "80vh";
    playZone.style.height = "80vh";
}
playZone.style.backgroundColor = "black";
playZone.id = "playZone";
playZone.style.display = "flex";
playZone.style.justifyContent = "space-evenly";
playZone.style.flexWrap = "wrap";
playZone.style.alignItems = "center";
bodyZone.appendChild(playZone);

w = document.body.offsetWidth;
h = document.body.offsetHeight;
if (h >= w) {
    optionZone.style.width = "80vw";
    optionZone.style.height = "80vw";
}
else {
    optionZone.style.width = "80vh";
    optionZone.style.height = "80vh";
}
optionZone.style.backgroundColor = "white";
optionZone.style.display = "flex";
optionZone.style.justifyContent = "space-evenly";
optionZone.style.flexDirection = 'column';
optionZone.style.alignItems = "center";
optionZone.style.display = 'none';
optionZone.style.borderRadius = '10px';

pauseZone = optionZone.cloneNode(true);

scoreZone.style.width = '100vw';
scoreZone.style.height = '10vh';
scoreZone.style.backgroundColor = 'gray';
scoreZone.style.display = 'flex';
scoreZone.style.flexDirection = 'row';
scoreZone.style.justifyContent = 'space-evenly';
scoreZone.style.alignItems = 'center';
document.body.appendChild(scoreZone);

scoreDiv.style.width = '150px';
scoreDiv.style.height = '60px';
scoreDiv.style.backgroundColor = 'blue';
scoreDiv.style.color = 'white';
scoreDiv.innerHTML = 'score：' + score;
scoreDiv.style.display = 'flex';
scoreDiv.style.justifyContent = 'center';
scoreDiv.style.alignItems = 'center';
scoreDiv.style.fontSize = '25px';
scoreDiv.style.border = '1px solid black';
scoreDiv.style.borderRadius = '15px';
scoreZone.appendChild(scoreDiv);

highestDiv.style.width = '150px';
highestDiv.style.height = '60px';
highestDiv.style.backgroundColor = 'blue';
highestDiv.style.color = 'white';
highestDiv.style.display = 'flex';
highestDiv.style.justifyContent = 'center';
highestDiv.style.alignItems = 'center';
highestDiv.style.fontSize = '25px';
scoreZone.appendChild(highestDiv);
highestDiv.innerHTML = 'highest：' + highest;
highestDiv.style.border = '1px solid black';
highestDiv.style.borderRadius = '15px';

pauseDiv.style.width = '150px';
pauseDiv.style.height = '60px';
pauseDiv.style.backgroundColor = 'blue';
pauseDiv.style.color = 'white';
pauseDiv.style.display = 'flex';
pauseDiv.style.justifyContent = 'center';
pauseDiv.style.alignItems = 'center';
pauseDiv.innerHTML = 'Pause';
pauseDiv.style.border = '1px solid black';
pauseDiv.style.borderRadius = '15px';
pauseDiv.style.fontSize = '25px';
pauseDiv.addEventListener('click', pause);
scoreZone.appendChild(pauseDiv);

replayInOption = pauseDiv.cloneNode(true);
replayInOption.innerHTML = 'Replay';
replayInOption.style.width = '80%';
replayInOption.addEventListener('click', init);

timeResult = pauseDiv.cloneNode(true);
timeResult.style.color = 'black';
timeResult.style.backgroundColor = 'unset';
timeResult.style.width = '80%';
timeResult.style.height = 'auto';

inputBox.type = 'text';
inputBox.id = 'newRank';
inputLabel.for = 'newRank';
inputLabel.innerHTML = '請輸入姓名：';
inputDiv = timeResult.cloneNode(true);
inputConfirm = pauseDiv.cloneNode(true);
inputConfirm.innerHTML = '確定';
inputConfirm.style.width = '54px';
inputConfirm.style.height = '34px';
inputConfirm.style.padding = '2px';
inputConfirm.style.backgroundColor = 'blue';
inputConfirm.style.fontSize = '20px';
inputConfirm.addEventListener('click',inputRank);
inputDiv.style.justifyContent = 'space-evenly';
inputDiv.style.flexDirection = 'row';
inputDiv.innerHTML = '';
inputDiv.style.padding = '5px';
inputDiv.appendChild(inputLabel);
inputDiv.appendChild(inputBox);
inputDiv.appendChild(inputConfirm);

optionZone.appendChild(timeResult);
optionZone.appendChild(inputDiv);
optionZone.appendChild(replayInOption);
bodyZone.appendChild(optionZone);

pauseText = timeResult.cloneNode(true);
pauseZone.appendChild(pauseText);
bodyZone.appendChild(pauseZone);

rankReplay = replayInOption.cloneNode(true);
rankReplay.addEventListener('click', init);
rankZone = pauseZone.cloneNode(true);
rankZone.style.fontSize = '30px';
rankZone.appendChild(rankReplay);
bodyZone.appendChild(rankZone);

//初始化grids

playZoneAppendGrids();

//處理畫面改變時，更新playZone大小跟grid大小

window.onresize = function () {
    w = document.body.offsetWidth;
    h = document.body.offsetHeight;
    if (h >= w) {
        playZone.style.width = "80vw";
        playZone.style.height = "80vw";
    }
    else {
        playZone.style.width = "80vh";
        playZone.style.height = "80vh";
    }

    pw = 0;
    pw = (playZone.offsetWidth - 24) / gridSideAmounts + "px";
    playGrids = document.getElementsByClassName('grid');

    for (let i = 0; i < playGrids.length; i++) {
        playGrids[i].style.width = pw;
        playGrids[i].style.height = pw;
    }
}

function getRandomColor() {
    difficult = Math.round(128 / (score + 1));

    let redNumber = Math.floor(Math.random() * 256);
    let greenNumber = Math.floor(Math.random() * 256);
    let blueNumber = Math.floor(Math.random() * 256);
    let differentPlace = Math.random() * 3;

    if (differentPlace >= 2) {
        // blueNumber = blueNumber + difficult;
        // blueNumber = blueNumber - (difficult / 2) ;

        colorDifferent = "rgb(" + redNumber + ", " + greenNumber + ", " + (blueNumber) + ")";

        blueNumber = ((blueNumber - difficult) < 0) ? (blueNumber + difficult) : (blueNumber - difficult);
    } else if (differentPlace >= 1) {
        // greenNumber = greenNumber + difficult;
        // greenNumber = greenNumber - (difficult / 2) ;

        colorDifferent = "rgb(" + redNumber + ", " + (greenNumber) + ", " + blueNumber + ")";

        greenNumber = ((greenNumber - difficult) < 0) ? (greenNumber + difficult) : (greenNumber - difficult);
    } else {
        // redNumber = redNumber + difficult;
        // redNumber = redNumber - (difficult / 2) ;

        colorDifferent = "rgb(" + (redNumber) + ", " + greenNumber + ", " + blueNumber + ")";

        redNumber = ((redNumber - difficult) < 0) ? (redNumber + difficult) : (redNumber - difficult);
    }
    colorNumber = "rgb(" + redNumber + ", " + greenNumber + ", " + blueNumber + ")";
    // console.log(difficult); //確認難度系數
}

function swapOption() {
    if (playZone.style.display == 'flex') {
        playZone.style.display = 'none';
        optionZone.style.display = 'flex';
        rankZone.style.display = 'none';
    }
    else {
        playZone.style.display = 'flex';
        optionZone.style.display = 'none';
        rankZone.style.display = 'none';
    }
}

function init() {
    timeRemain.innerHTML = '請按下不同顏色方塊';
    if (playZone.style.display == 'none') {
        swapOption();
    }

    let grids = document.getElementsByClassName('grid');

    while (grids.length > 0) {
        playZone.removeChild(grids[0]);
    }
    score = 0;
    // highest = 0;
    gridSideAmounts = 1;
    // highestDiv.innerHTML = 'highest：' + highest;
    scoreDiv.innerHTML = 'score：' + score;

    clearInterval(timer);
    timeCounting = false;
    timeCounter = gameTime;
    getRandomColor();
    playZoneAppendGrids();

}

function failed() {
    if (playZone.style.display == 'flex') {
        swapOption();
    }
    start = false;
    clearInterval(timer);
    timeCounting = false;
    timeResult.innerHTML = '剩餘時間：' + String(timeCounter) + '秒</br>score：' + score + '</br>highest：' + highest;
    timeRemain.innerHTML = '遊戲結束';
}

function pause() {
    if (timeCounting == true) {
        playZone.style.display = 'none';
        pauseZone.style.display = 'flex';
        pauseDiv.innerHTML = 'Continue';
        clearInterval(timer);
        timeCounting = false;
        timeRemain.innerHTML = '暫停中';
    }
    else if (start == true) {
        pauseZone.style.display = 'none';
        playZone.style.display = 'flex';
        pauseDiv.innerHTML = 'Pause';
        timeCounting = true;
        timeRemain.innerHTML = '剩餘時間' + timeCounter;
        timer = setInterval(function () {
            timeCounter--;
            timeRemain.innerHTML = '剩餘時間' + timeCounter;
            if (timeCounter < 1) {
                clearInterval(timer);
                failed();
            }
        }, 1000);
    }
    else {
        alert('請點擊方塊');
    }
}

class rankNode {
    constructor( score , name = 'AAA') {
        this.name = name;
        this.score = score;
    }
}

function inputRank() {
    let name = inputBox.value;
    let newRank = new rankNode(score);
    if ( name != "") {
        newRank.name = name;
    }
    rank.push(newRank);
    rankSort();
    if( rank.length > 10 ){
        rank.pop();
    }

    playZone.style.display = 'none';
    optionZone.style.display = 'none';
    rankZone.style.display = 'flex';
    rankZone.innerHTML = '';
    for (let i = 0 ; i < 10 ; i++ ){
        if( i < rank.length ){
            rankZone.innerHTML += (i+1) + '. '+ rank[i].name + ' ' + rank[i].score + '</br>';
        }
        else{
            rankZone.innerHTML += (i+1) + '. '+ '</br>';
        }
    }
    rankZone.appendChild(rankReplay);
}

function rankSort() {
    for (let i = 0 ; i < rank.length ; i++ ){
        for(let j = (rank.length-1); j > i; j--){
            if (rank[j].score > rank[j-1].score){
                let temp = rank[j-1];
                rank[j-1] = rank[j];
                rank[j] = temp;
            }
        }
    }
}