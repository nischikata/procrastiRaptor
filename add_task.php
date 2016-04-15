<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>ProcrastiRaptor - Welcome !</title>
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
</head>
<body>
<nav>
    <ul>
        <a href="index.html"><li id="home"></li></a>
        <a href="tasklist.html"><li id="tasklist"></li></a>
        <a href="calendar.php"><li id="calendar"></li></a>
        <a href="stats.php"><li id="stats"></li></a>
        <a href="user.php"><li style="float:right" id="user"></li></a>
    </ul>
</nav>

<header>
</header>
<main>
    <form>
        <h2>Add a task to your TO DO list</h2>
        <label for="title">Title</label> <input type="text" id="title">
        <label for="categories">Category</label> <select name="categories">
            <option label=" "></option>
            <option value="health">Health</option>
            <option value="work">Work</option>
            <option value="school">School</option>
            <option value="home">Home</option>
        </select>
        <label for="duedatetime">Due</label><input type="datetime" id="duedatetime" name="duedatetime">
        <label for="pdifficulty">Predicted difficulty</label><input type="range">
        <label for="psatisfaction">Predicted satisfaction</label><select name="psatisfaction" id="psatisfaction">
            <option>bla</option>
        </select>
        <label for="duration">Predicted effort in time</label>
        <input type="text" size="10" maxlength="10" placeholder = '1d 10h 5m' class="duration"/>
        <label for="priority">Priority</label><select id="priority">
            <option>A - High Priority</option>
            <option>B - Medium Priority</option>
            <option>C - Low Priority</option>
        </select>
    </form>
</main>


<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="js/form.js"></script>
</body>
</html>