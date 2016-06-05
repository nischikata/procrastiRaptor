
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

        event.preventDefault();
        var field = $(this);
        var sd = field.val();
        seconds = parseDuration(sd);

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

    // difficulty setups for all views
    select_difficulty("#f_p_difficulty");
    select_difficulty("#f_a_difficulty");
    select_difficulty("#e_p_difficulty");
    select_difficulty("#e_a_difficulty");

 });

function select_difficulty(id) {
    var trapezes = $(id).find(".trapez");

    trapezes.click(function(){
        var number = $(this).attr("name");
        var prev_number = $(id).data("difficulty");
        if (number == prev_number) {
            number = 0;
        }
        $(id).data("difficulty", number);
        draw_difficulty_pyramid(trapezes, number);
    });
}

function draw_difficulty_pyramid(trapezes, number) {
    if (number == undefined || number == null)
        number = 0;

    for (var i = 0; i < (5 - number); ++i) {
        $(trapezes.get(i)).addClass('grey');
    }
    while (number > 0) {
        $(trapezes.get(number*-1)).removeClass('grey');
        number -= 1;
    }
}
