$( document ).ready(function() {


    $(".task:not(add)").click(function(){ // expand / hide predictions
        $(this).find(".bottom_row").toggle(500);
    });

});
