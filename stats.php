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
        <a href="calendar.php"><li id="calendar"></li></a>
        <a href="stats.php"><li id="stats" class="active"></li></a>
        <a href="user.php"><li style="float:right" id="user"></li></a>
    </ul>
</nav>

<header><h1>Stats</h1>
</header>

<main style="margin-left: 14px;">
    <h3>Time management</h3>
    <figure id="pie-chart-3colors"><svg width="100" height="100"><circle r="24.5" cx="50" cy="50" fill="none" stroke="#67cddc" stroke-width="50" stroke-dasharray="158 158" /><circle r="25" cx="50" cy="50" fill="none" stroke="white" stroke-width="50" stroke-dasharray="32 158" /></svg></figure>
    <div><span style="background-color: #67cddc; width: 5px; height: 5px;"> &nbsp; </span> &nbsp; finished on time</div>
    <div><span style="background-color: white; width: 5px; height: 5px;"> &nbsp; </span> &nbsp; finished late</div>
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