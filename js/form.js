
// source: http://jsfiddle.net/davesag/qgCrk/6/

function to_seconds(dd,hh,mm) {
    d = parseInt(dd);
    h = parseInt(hh);
    m = parseInt(mm);
    if (isNaN(d)) d = 0;
    if (isNaN(h)) h = 0;
    if (isNaN(m)) m = 0;

    t = d * 24 * 60 * 60 +
    h * 60 * 60 +
    m * 60;
    return t;
}

// expects 1d 11h 11m, or 1d 11h,
// or 11h 11m, or 11h, or 11m, or 1d
// returns a number of seconds.
function parseDuration(sDuration) {
    if (sDuration == null || sDuration === '') return 0;
    mrx = new RegExp(/([0-9][0-9]?)[ ]?m/);
    hrx = new RegExp(/([0-9][0-9]?)[ ]?h/);
    drx = new RegExp(/([0-9])[ ]?d/);
    days = 0;
    hours = 0;
    minutes = 0;
    if (mrx.test(sDuration)) {
        minutes = mrx.exec(sDuration)[1];
    }
    if (hrx.test(sDuration)) {
        hours = hrx.exec(sDuration)[1];
    }
    if (drx.test(sDuration)) {
        days = drx.exec(sDuration)[1];
    }

    return to_seconds(days, hours, minutes);
}

// outputs a duration string based on
// the number of seconds provided.
// rounded off to the nearest 1 minute.
function toDurationString(iDuration) {
    if (iDuration <= 0) return '0m';
    var m = Math.floor((iDuration/60)%60);
    var h = Math.floor((iDuration/3600)%24);
    var d = Math.floor(iDuration/86400);
    result = '';
    if (d > 0) result = result + d + 'd ';
    if (h > 0) result  = result + h + 'h ';
    if (m > 0) result  = result + m + 'm ';
    return result.substring(0, result.length - 1);
}

$(function() {

// DURATION / TIME EFFORT

    $("form input.duration").change(function(event, ui) {
        console.log("changed. " + event);
        event.preventDefault();
        var field = $(this);
        var sd = field.val();
        seconds = parseDuration(sd);
        console.log("sd is: "+sd +"  seconds are: " + seconds);
        if (sd !== '' && seconds === 0) {
            field.addClass('error');
            field.focus();
            $(this).data("seconds", 0);
        } else {
            field.removeClass('error');
            field.val(toDurationString(seconds));
            $(this).data("seconds", seconds);
        }
    });

    select_satisfaction_icon("#f_p_satisfaction_group");


 });

function select_satisfaction_icon(id){

    var emos = $(id).find("div[name='f_p_satisfaction_emo']");

    emos.click(function(){
        if ($(this).hasClass("grey")){
            //
            emos.not(".grey").each(function(){
                $(this).addClass("grey")
            });
            $(this).removeClass("grey");
        }
    });



}

function reset_satisfaction_fields(id) {
    var emos = $(id).find("div[name='f_p_satisfaction_emo']");
    emos.each(function(){
        $(this).addClass("grey")
    });
}