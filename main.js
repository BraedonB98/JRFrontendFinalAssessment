class Activities{
    constructor(type,accomplishText,timeMin,timeSec)
    {
        this.type = type
        this.accomplishText =accomplishText;
        this.timeMin = timeMin;
        this.timeSec = timeSec;
    }
    get totalTime()
    {
        var totalTimeVal = (this.timeMin*60)+this.timeSec;
        return(totalTimeVal);
    }
}

function startTimer()
{
    var activitySelectChecker = "";
    if(document.getElementById("study").checked)
    {
        activitySelectChecker = "study";
    }
    else if(document.getElementById("meditate").checked)
    {
        activitySelectChecker = "meditate";
    }
    else if(document.getElementById("exercise").checked)
    {
        activitySelectChecker = "exercise";
    }

    var event = new Activities(activitySelectChecker, document.getElementById("accomplish").value, document.getElementById("minutes").value , document.getElementById("seconds"));
    console.log(event);
    console.log(event.totalTime);
    setTimeout(markComplete,event.totalTime);
    console.log("starting timer");

    //change pages as needed
}
function markComplete()
{

}
function saveToStorage()
{
    //create class for activities
    //
}

document.querySelector("#startActivity").addEventListener("click", loginSubmit);