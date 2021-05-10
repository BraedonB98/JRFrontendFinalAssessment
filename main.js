var memStorage = window.sessionStorage;
var locStorage = window.localStorage;
var activitiesArray = []
var recentActiv;
locStorage.setItem("activities",JSON.stringify(activitiesArray));
class Activities{
    constructor(type,accomplishText,timeMin,timeSec)
    {
        this.type = type
        this.accomplishText =accomplishText;
        this.timeMin = timeMin;
        this.timeSec = timeSec;
        this.completed = false;
        this.minLeft = timeMin;
        this.secLeft = timeSec;
        this.id = "";
    }
    get totalTime()
    {
        var totalTimeVal = (parseInt((this.timeMin*60))+parseInt(this.timeSec));
        return(totalTimeVal);
    }

}

function startActivity()
{
    event.preventDefault();
    document.getElementById("activeActivityScreen").classList.remove('notVisible');
    document.getElementById("entryScreen").classList.add('notVisible');
    event.preventDefault();
    var activitySelectChecker = "";
    var startButton = document.getElementById("circleStart");
    if(document.getElementById("study").checked)
    {
        activitySelectChecker = "study";
        startButton.style.borderColor = "var(--textOnCards)"
    }
    else if(document.getElementById("meditate").checked)
    {
        activitySelectChecker = "meditate";
        startButton.style.borderColor = "var(--meditate)"
    }
    else if(document.getElementById("exercise").checked)
    {
        activitySelectChecker = "exercise";
        startButton.style.borderColor = "var(--exercise)";
    }

    recentActiv = new Activities(activitySelectChecker, document.getElementById("accomplish").value, document.getElementById("minutes").value , document.getElementById("seconds").value);
    var timerDisplay = document.getElementById("timerDisplay");
    timerDisplay.innerHTML = `${recentActiv.minLeft}:${recentActiv.secLeft}`;
}

function startTimer()
{
    let activ = recentActiv;
    console.log(activ);
    var timeoutTime = setTimeout(function(){markComplete(activ)},activ.totalTime*1000);
    var start = Date.now();
    var time = 0;
    var timerDisplay = document.getElementById("timerDisplay");
    var intervalID = setInterval(function() {
        var delta = Date.now() - start; // milliseconds elapsed since start
        time = (Math.floor(delta / 1000)); // in seconds
        console.log((activ.totalTime)-time);
        activ.minLeft= Math.floor(((activ.totalTime)-time)/60);
        activ.secLeft= ((activ.totalTime)-time)%60;
        console.log(activ.minLeft + " min and " + activ.secLeft); 
        timerDisplay.innerHTML = `${activ.minLeft}:${activ.secLeft}`;
        if(activ.completed)
        {
            timerDisplay.innerHTML = `${activ.minLeft}:${activ.secLeft}`;
            clearInterval(intervalID);
        }
         //-----------------------------------------------------change pages as needed------------------------------------------
        }, 1000); // update about every second

    console.log("starting timer");
    
}
function markComplete(activ)
{
    activ.completed=true;
    recentActiv = activ;
}

function saveToStorage()
{
    var array = JSON.parse(locStorage.getItem("activities"));
    array.push(recentActiv);
    console.log("saving to storage");
    console.log(array);
    locStorage.setItem("activities",JSON.stringify(array));
}
function loadPastActiv(){
    var array = JSON.parse(locStorage.getItem("activities"));
    var activitiesDoc = document.getElementById("loggedActivitie")
    var innerHTMLInput = ""
    for(i in array)
    {
        innerHTMLInput += `<div class = "loggedCard"><H3>${array[i].type}</H3> <H3>${array[i].timeMin} Min ${array[i].timeSec} Seconds</H3> <H4>${array[i].accomplishText}</H4></div> `
    }
    console.log(innerHTMLInput);
    if(innerHTMLInput != "")
    {
        activitiesDoc.innerHTML= innerHTMLInput;
    }
}
function updateActivityScreen(timeLeft)
{

}


loadPastActiv();



document.querySelector("#circleStart").addEventListener("click", startTimer);
document.querySelector("#startActivity").addEventListener("click", startActivity);
document.querySelector("#logActivityButton").addEventListener("click", saveToStorage);