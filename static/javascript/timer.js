$(function() {
    var timeleft = 30 -1;
    const timer = $("#timer");
    var downloadTimer = setInterval(function(){
    if(timeleft >= 0){
        timer.html(timeleft);
    }
    timeleft -= 1;
    }, 1000);
});
