var displayDateTime = $("#currentDay");
var divTimeBlockContainer =$("#container");
//var workSchedule= $("#schedule");
var workHour=8;
var workDescription="adsdsa";

// moment().format("h:mm");
var startTime=8;
var workingHourInDay=10;

var workSchedule = {
    hour: "",
    description:""
};

displayDateTime.text(moment().format("dddd MMMM Do, YYYY"));


$("#displayTime").text(startTime);

if (startTime>="9:45")
{
    console.log("true");
}

function generateSchedule(){
    var timeBlockTable= $("<table>")
        .attr("id","schedule")
        timeBlockTable.addClass("col-12");

    var storageWorkSchedule = JSON.parse(localStorage.getItem("workSch"));
    if (storageWorkSchedule !==null)
    {
        console.log("enter hogaya");
        workSchedule=storageWorkSchedule;
    }

    for(var i=0; i<workingHourInDay; i++)
    {
        var newRow = $('<tr>')
            .addClass("row");
    
        var time=(startTime+i) + ":00";
        workHour = moment(time,"hh:mm").format("hh:mm a");
        var newRowTime = $('<td>')
            .addClass("hour time-block col-2")
            .attr("id","displayTime")
            .text(workHour);
            

        // var desc = workSchedule.find(desc => desc.hour === workHour);

        var newRowDetail = $('<td>')
            .addClass("description past col-8");
            
        var description = $("<textarea>")
            // .text(desc.description)
            .addClass("work");

                newRowDetail.append(description);

        var newRowDetailButton = $('<td>')
            .addClass("col-2 saveBtn saveBtn1");
            
        var button = $("<button>")
            .addClass("btn saveBtn");
        
            var buttonImage = $("<i>")
            .addClass("fas fa-save");

            button.append(buttonImage);
            newRowDetailButton.append(button);

        newRow.append(newRowTime,newRowDetail,newRowDetailButton);
        timeBlockTable.append(newRow);
        divTimeBlockContainer.append(timeBlockTable);
        
    }
    
}

divTimeBlockContainer.on('click','.saveBtn1',alter);

function alter(event){
    var t = $(event.target);
    var thirdRow=t.parent(0);

    console.log(thirdRow);
      // Save related form data as an object
    var currentRow=$(this).closest("tr"); 
         
    var col1=currentRow.find("td:eq(0)").text();
    var col2=currentRow.find("td:eq(1)").html();
    //var data = $(this).parent().prev("td").find("textarea").val();     
    var data =$(this).closest('tr').find('textarea').val();
    alert(data); 

    console.log(col1 + "    " + col2 +   "     ");

    var workSchedule = {
        hour: "a",
        description:"a"
    };
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("workSch", JSON.stringify(workSchedule));
  
}
generateSchedule();