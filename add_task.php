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
    </form>
</main>



</body>
</html>