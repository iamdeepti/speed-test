var textOriginal = document.querySelector(".textOriginal").innerHTML;
var textArea = document.querySelector("textarea");
var timer = document.querySelector(".timer");
var resetButton = document.querySelector(".reset");
var theTimer = [0,0,0,0];
var interval;
var timerRunning = false;

function runTheTimer(){
    theTimer[3]++;
    theTimer[0] = Math.floor((theTimer[3]/100)/60);
    theTimer[1] = Math.floor((theTimer[3]/100 - theTimer[0]*60 )) ;
    theTimer[2] = Math.floor(theTimer[3] - theTimer[1]*100 - theTimer[0]*6000) ;
    
    let time = leadingZero(theTimer[0]) + ":" + leadingZero(theTimer[1]) + ':' + leadingZero(theTimer[2]);
    timer.innerHTML = time;
}

function leadingZero(time){
    if(time <= 9)
        time = "0" + time ;
    return time;
}
function start(){
    let textEnteredLength = textArea.value.length ;
     
    if(textEnteredLength === 0 && !timerRunning){
       timerRunning = true;
        interval = setInterval(runTheTimer, 10);
       
   }
     
}
function spellcheck(){
    var textEntered = textArea.value;
    
    let textMatch = textOriginal.substring(0, textEntered.length);
    
    if(textOriginal === textEntered)
    {
        textArea.style.border = '5px solid green';
        clearInterval(interval);
    }
    else{
        if(textEntered === textMatch)
        {
            textArea.style.border = '5px solid blue';
        }
        else{
            textArea.style.border = '5px solid red' ;
        }
    }
}
function reset(){
    clearInterval(interval);
    interval = null;
    theTimer = [0,0,0,0];
    timerRunning = false;
    
    textArea.value = "";
    timer.innerHTML = "00:00:00"
    textArea.style.borderColor = "gray";
    console.log("reset button was pressed");
}
textArea.addEventListener("keypress", start, false);
textArea.addEventListener("keyup", spellcheck, false);
resetButton.addEventListener("click", reset, false);
