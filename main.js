var memStorage = window.sessionStorage;
var locStorage = window.localStorage;
var activitiesArray = []
locStorage.setItem("activities",JSON.stringify(activitiesArray));
class Activities{
    constructor(type,accomplishText,timeMin,timeSec)
    {
        this.type = type
        this.accomplishText =accomplishText;
        this.timeMin = timeMin;
        this.timeSec = timeSec;
        this.completed = false;
        this.id = "";
    }
    get totalTime()
    {
        var totalTimeVal = ((this.timeMin*60)+this.timeSec);
        return(totalTimeVal);
    }

}
function startTimer()
{
    event.preventDefault();
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

    let activ = new Activities(activitySelectChecker, document.getElementById("accomplish").value, document.getElementById("minutes").value , document.getElementById("seconds").value);
    var timeoutTime = setTimeout(markComplete(activ),activ.totalTime*1000);3
    //I could create a function that calls a time out for 1 second that calls itself until the total seconds have been reached but it seems like an overly complicated and load heavy solution
    console.log("starting timer");

    //change pages as needed
}
function markComplete(activ)
{
    activ.completed=true;
    saveToStorage(activ);
}
function saveToStorage(activ)
{
    //create class for activities
    var array = JSON.parse(locStorage.getItem("activities"));
    array.push(activ);
    console.log("saving to storage");
    console.log(array);
    locStorage.setItem("activities",JSON.stringify(array));
}

document.querySelector("#startActivity").addEventListener("click", startTimer);