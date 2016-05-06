
// NAVIGATION - hide / show views onClick
$(".add, nav ul li").each(function(){ // select all navigation elements incl. add task button
    var view_id = "#" + $(this).data("view");//string
    var view_to_show = $(view_id);

    $(this).click(function(){
        $(".view:visible").hide();
        view_to_show.show();
        $(".active").removeClass("active");
        $(this).addClass("active");


        if (view_id == "#add_task_view") {
            $("footer").hide();
        } else {
            $("footer").show();
        }

    })

});