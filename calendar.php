<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>ProcrastiRaptor - Welcome !</title>
    <link href="css/style.css" rel="stylesheet" type="text/css">
</head>
<body>
<nav>
    <ul>
        <a href="index.html"><li id="home"></li></a>
        <a href="tasklist.html"><li id="tasklist"></li></a>
        <a href="calendar.php"><li id="calendar" class="active"></li></a>
        <a href="stats.php"><li id="stats"></li></a>
        <a href="user.php"><li style="float:right" id="user"></li></a>
    </ul>
</nav>

<header><h1>Calendar</h1>
</header>

<main style="margin-left: 14px;">

</main>
<footer>

    <a href="add_task.php">
        <div class=" task task_title add">
            <h2>add a new task</h2>
        </div>
    </a>
</footer>

<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="js/tasklist.js"></script>
</body>
</html>