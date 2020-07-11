// \\\\
var interval;
var hr = 00;
var min = 00;
var sec = 00;
var msec = 00;
var hrDoc = document.getElementById("hr");
var minDoc = document.getElementById("min");
var secDoc = document.getElementById("sec");
var msecDoc = document.getElementById("msec");

function stopwatch() {
    msec++;
    if (msec < 10)
        msecDoc.innerHTML = '0' + msec;
    else
        msecDoc.innerHTML = msec;
    
    if (msec > 99) 
    {
        msec = 00;
        msecDoc.innerHTML = msec;
        sec++;
        (sec < 10) ? (secDoc.innerHTML = '0' + sec) : (secDoc.innerHTML = sec);
    }    
    
    else if (sec > 59) 
    {
        sec = 00;
        secDoc.innerHTML = '0' + sec;
        min++;
        (min < 10) ? (minDoc.innerHTML = '0' + min) : (minDoc.innerHTML = min);
    }    
    
    else if (min > 59) 
    {
        min = 00;
        minDoc.innerHTML = '0' + min;
        hr++;
        (hr < 10) ? (hrDoc.innerHTML = '0' + hr) : (hrDoc.innerHTML = hr);
    }    
}

function start() {
    interval = setInterval(stopwatch, 10);
    hideBtn('start');
    hideBtn('resume');
    showBtn('reset');
    showBtn('pause');
    showBtn('lap');
}

function pause() {
    clearInterval(interval);
    hideBtn('pause');
    showBtn('lap');
    showBtn('resume');
    showBtn('reset');
}

var lapsDoc = document.getElementById('laps');
var lastLap = {hr: 0, min: 0, sec: 0, msec: 0};
var diffMsec = 0; 
var diffSec = 0; 
var diffMin = 0;
var diffHr = 0;

function lap() {
    // var to use in lastlap to prevent overwrite 
    var newMsec = msec;
    var newSec = sec;
    var newMin = min;
    var newHr = hr;

    if (min < lastLap.min)
    {
        min = min + 60;
        hr = hr - 1;
    }if (msec < lastLap.msec)
    {
        msec = msec + 100;
        sec = sec - 1;
    }
    if (sec < lastLap.sec)
    {
        sec = sec + 60;
        min = min - 1;
    }
    if (msec < lastLap.msec)
    {
        msec = msec + 100;
        sec = sec - 1;
    }
    diffMsec = msec - lastLap.msec;
    diffSec = sec - lastLap.sec;
    diffMin = min - lastLap.min;
    diffHr = hr - lastLap.hr;
    lastLap = {hr: newHr, min: newMin, sec: newSec, msec: newMsec};
    lapsDoc.innerHTML += "<li>" + hrDoc.innerHTML + ":" + minDoc.innerHTML + ":" + secDoc.innerHTML + ":" + msecDoc.innerHTML + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + leftPad(diffHr) + ":" + leftPad(diffMin) + ":" + leftPad(diffSec) + ":" + leftPad(diffMsec) + "</li>"; 
}


function reset() {
    clearInterval(interval);
    msec = 00;
    sec = 00;
    min = 00;
    hr = 00;
    msecDoc.innerHTML = '0'.concat(msec);
    secDoc.innerHTML = '0'.concat(sec);
    minDoc.innerHTML = '0'.concat(min);
    hrDoc.innerHTML = '0'.concat(hr);
    document.getElementById('laps').innerHTML = '';
    showBtn('start');
    hideBtn('pause');
    hideBtn('lap');
    hideBtn('resume');
    hideBtn('reset');
}

function leftPad(value) {
    return value < 10 ? ('0' + value) : value;
}

function hideBtn(btnId) {
    var hide = document.getElementById(btnId);
    hide.style.display = "none";
}

function showBtn(btnId) {
    var show = document.getElementById(btnId);
    show.style.display = "inline-block";
}