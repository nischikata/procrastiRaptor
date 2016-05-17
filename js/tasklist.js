$( document ).ready(function() {

    // TODO: delete this once this is attached to all dynamically added tasks
    $(".task:not(add)").click(function(){ // expand / hide predictions
        $(this).find(".bottom_row").toggle(500);
    });

});
