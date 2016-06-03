
// NAVIGATION - hide / show views onClick
$("[data-view]").each(function(){ // select all navigation elements incl. add task button
    var view_id = "#" + $(this).data("view");//string
    var view_to_show = $(view_id);

    $(this).click(function(){
        $(".view:visible").hide(250);
        view_to_show.show(250);
        $(".active").removeClass("active");
        $(this).addClass("active");


        if (view_id == "#add_task_view" || view_id == "#rate_and_check_task"
        || view_id == "#edit_task_view") {
            $("#add-task-footer").hide();
        } else {
            $("#add-task-footer").show();
        }

    })

});