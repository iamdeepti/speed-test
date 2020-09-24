var textOriginal = document.querySelector(".textOriginal");
var textArea = document.querySelector("textarea");
var timer = document.querySelector(".timer");
var result = document.querySelector(".result");
var resetButton = document.querySelector(".reset");
var theTimer = [0,0,0,0];
var sentences = document.querySelector(".lines>input");
var interval;
var timerRunning = false;
window.onload = function(){
    generatePara();
}
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
async function generatePara(){
    var noOfSentences = sentences.value;
    
    textOriginal.innerHTML = 'Please wait loading data ....';
    var res = await axios.get(`https://baconipsum.com/api/?type=meat&sentences=${noOfSentences}&format=text`);
    // console.log('res'+res.data);
    textOriginal.innerHTML = res.data;
}
function spellcheck(){
    var textEntered = textArea.value;
    
    let textMatch = textOriginal.innerHTML.substring(0, textEntered.length);
    
    if(textOriginal.innerHTML === textEntered)
    {
        textArea.style.border = '5px solid green';
        var str = textEntered;
        str = str.replace(/(^\s*)|(\s*$)/gi,"");
        str = str.replace(/[ ]{2,}/gi," ");
        str = str.replace(/\n /,"\n");
        var words = str.split(' ').length;
        console.log(words);
        var speed = (words/(theTimer[0]*60+theTimer[1]))*60;
        speed = Math.floor(speed);
        
        var result_string = ('Your typing speed is <strong>' + speed + ' words per minute </strong>');
        result.innerHTML = result_string;
        result.style.display = 'block';
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
    timer.innerHTML = "00:00:00";
    result.innerHTML = "";
    result.style.display = 'none';
    generatePara();
    textArea.style.borderColor = "gray";
    // console.log("reset button was pressed");
}
textArea.addEventListener("keypress", start, false);
textArea.addEventListener("keyup", spellcheck, false);
resetButton.addEventListener("click", reset, false);
