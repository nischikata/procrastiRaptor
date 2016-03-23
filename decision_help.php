<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>ProcrastiRaptor - Where to start? Let's make a decision.</title>
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
</head>
<body>
<form class="decision_form">
    <fieldset>

            <select id="categories">
                <option value="1">all categories</option>
                <option value="2">work</option>
                <option value="3">sport</option>
                <option value="4">chores</option>
            </select>
            <label for="timelimit">time limit</label>
            <input type="time" id="timelimit">
    </fieldset>
</form>
<ul>

    <li class="task cat_sport">
        <div class="task_content">
            <div class="task_head">

                <div class="task_title">Swim 2.5km</div>
            </div>
            <div class="task_body hide">
                <div class="task_p_difficulty"><i class="fa fa-trophy"></i><i class="fa fa-minus"></i><i class="fa fa-minus"></i><i class="fa fa-minus"></i><i class="fa fa-minus"></i></div>
                <div class="task_p_satisfaction"><i class="fa fa-thumbs-up"></i><i class="fa fa-thumbs-up"></i><i class="fa fa-thumbs-up"></i><i class="fa fa-thumbs-up"></i><i class="fa fa-thumbs-up"></i></div>
                <div class="task_p_effort">0/50m</div>
            </div>
        </div>
        <div class="task_buttons">
            <a class="btn btn-large" href="#"><i class="fa fa-clock-o fa-2x"></i></a>
            <a class="btn btn-large" href="#"><i class="fa fa-check fa-2x"></i></a>
        </div>
    </li>

    <li class="task cat_work">
        <div class="task_content">
            <div class="task_head">

                <div class="task_title">write dummy text</div>
            </div>
            <div class="task_body hide">
                <div class="task_p_difficulty"><i class="fa fa-minus"></i><i class="fa fa-minus"></i><i class="fa fa-minus"></i><i class="fa fa-minus"></i><i class="fa fa-minus"></i></div>
                <div class="task_p_satisfaction"><i class="fa fa-thumbs-up"></i><i class="fa fa-thumbs-o-up"></i><i class="fa fa-thumbs-o-up"></i><i class="fa fa-thumbs-o-up"></i><i class="fa fa-thumbs-o-up"></i></div>
                <div class="task_p_effort">0/10m</div>
            </div>
        </div>
        <div class="task_buttons">
            <a class="btn btn-large" href="#"><i class="fa fa-clock-o fa-2x"></i></a>
            <a class="btn btn-large" href="#"><i class="fa fa-check fa-2x"></i></a>
        </div>
    </li>

    <li class="task cat_work">
        <div class="task_content">
            <div class="task_head">

                <div class="task_title">Find suitable color scheme</div>
            </div>
            <div class="task_body hide">
                <div class="task_p_difficulty"><i class="fa fa-trophy"></i><i class="fa fa-trophy"></i><i class="fa fa-trophy"></i><i class="fa fa-minus"></i><i class="fa fa-minus"></i></div>
                <div class="task_p_satisfaction"><i class="fa fa-thumbs-up"></i><i class="fa fa-thumbs-up"></i><i class="fa fa-thumbs-up"></i><i class="fa fa-thumbs-up"></i><i class="fa fa-thumbs-up"></i></div>
                <div class="task_p_effort">0/2h</div>
            </div>
        </div>
        <div class="task_buttons">
            <a class="btn btn-large" href="#"><i class="fa fa-clock-o fa-2x"></i></a>
            <a class="btn btn-large" href="#"><i class="fa fa-check fa-2x"></i></a>
        </div>
    </li>
</ul>

</body>
</html>