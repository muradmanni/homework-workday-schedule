var displayDateTime = $("#currentDay");
var divTimeBlockContainer =$("#container");
//var workSchedule= $("#schedule");
var workHour="";
var workDescription="";

// moment().format("h:mm");
var startTime=8;
var workingHourInDay=10;

var timeDisplayInRow;
var currentHour= moment().format("H");
var colorRow;

var workScheduleArray = new Array();

displayDateTime.text(moment().format("dddd MMMM Do, YYYY"));

function generateSchedule(){
    //alert(moment().format("hh:mm a"));
    var timeBlockTable= $("<table>")
        .attr("id","schedule")
        timeBlockTable.addClass("col-12");

    var storageWorkSchedule = JSON.parse(localStorage.getItem("localStorageWorkSchedule"));
    if (storageWorkSchedule !==null)
    {
        workScheduleArray=storageWorkSchedule;
    }

    for(var i=0; i<workingHourInDay; i++)
    {
        timeDisplayInRow=(startTime+i) + ":00";
        workHour = moment(timeDisplayInRow,"hh:mm").format("hh:mm a");  //Changing the format using moment to display time.
        currentHour= parseInt(moment().format("H"));  //Getting value of current hour in order to compare and set color for row (past, present or future)
        
        // Condition to check if the CurrentHour is present, past or future and set the class accordingly
        //used a variable to change the value depending on the hour
        
        if (currentHour === (startTime+i))
        {
            colorRow="present";
        }
        else if(currentHour > (startTime+i))
        {
            colorRow="past";
        }
        else{
            colorRow="future";
        }

        
        var newRow = $('<tr>')
            .addClass("row ");
    
        var newRowTime = $('<td>')
            .addClass("hour time-block col-2 ")
            .attr("id","displayTime")
            .text(workHour);
        
        var newRowDescription = $('<td>')
            .addClass("col-8 "  + colorRow);
        
        //Finding the time in the workScheduleArray and getting the value or description related to that time and then display.
        workDescription = workScheduleArray.find((desc) => desc.hour === workHour)
        var description = $("<textarea>")
            .text(workDescription.description)
            .addClass("work");

            newRowDescription.append(description);

        var newRowDetailButton = $('<td>')
            .addClass("col-2 saveBtn saveBtn1");
            
        var button = $("<button>")
            .addClass("btn saveBtn");
        
            var buttonImage = $("<i>")
            .addClass("fas fa-save");

            button.append(buttonImage);
            newRowDetailButton.append(button);

        newRow.append(newRowTime,newRowDescription,newRowDetailButton);
        timeBlockTable.append(newRow);
        divTimeBlockContainer.append(timeBlockTable);
        
    }
    
}

divTimeBlockContainer.on('click','.saveBtn1',alter);

function alter(event){
    var t = $(event.target);
    var currentRow=$(this).closest("tr"); 
    var time=currentRow.find("td:eq(0)").text();   
    var description =$(this).closest('tr').find('textarea').val();

    saveToLocalStorage(time, description);  //Passing time and description value to the function
}

function saveToLocalStorage(workHour, workDescription){

    workScheduleArray = JSON.parse(localStorage.getItem("localStorageWorkSchedule"));
    
    var index = workScheduleArray.findIndex(desc => desc.hour === workHour);
    workScheduleArray[index].description=workDescription;
    
    localStorage.setItem("localStorageWorkSchedule", JSON.stringify(workScheduleArray));
    
}

// Function which will run in the start to check if localstorage is emoty or not.
function saveEmptyToLocalStorage(){
    var storageWorkSchedule = JSON.parse(localStorage.getItem("localStorageWorkSchedule"));
    
    if (storageWorkSchedule ===null)
    {
        for(var i=0; i<workingHourInDay; i++)
        {
            var time=(startTime+i) + ":00";
            workHour = moment(time,"hh:mm").format("hh:mm a");
            workScheduleArray.push({hour:workHour, description:""});
        }
        localStorage.setItem("localStorageWorkSchedule", JSON.stringify(workScheduleArray));   
    }
}

function init(){
    saveEmptyToLocalStorage();
    generateSchedule();
}

init();