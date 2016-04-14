<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>ProcrastiRaptor - Welcome !</title>
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <link href="css/form.css" rel="stylesheet" type="text/css">

</head>
<body>
<nav>
    <ul>
        <a href="index.html"><li id="home"></li></a>
        <a href="tasklist.html"><li id="tasklist"></li></a>
        <a href="calendar.php"><li id="calendar"></li></a>
        <a href="stats.php"><li id="stats"></li></a>
        <a href="user.php"><li style="float:right" id="user" class="active"></li></a>
    </ul>
</nav>

<header><div id="bubble"><div id="filler"></div><div id="greeting">
            <h1>What's up <a href="#">Michonne</a>?</h1>
            <p>Do you want to change your <a href="#">screen name</a>, <a href="#">email-address</a> or <a href="#">password</a>?</p>
            <p>Check out the settings below to adjust the app experience to your preferences.</p>
        </div></div>
</header>

<main>
    <table>
        <tr>
            <td>Daily TODO list via e-mail</td><td>
                <div class="onoffswitch">
                    <input type="checkbox" name="dailymail" class="onoffswitch-checkbox" id="dailymail" checked>
                    <label class="onoffswitch-label" for="dailymail">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                    </label>
                </div>

            </td>
        </tr>
        <tr>
            <td>Notifications for upcoming high priority tasks</td><td>
                <div class="onoffswitch">
                    <input type="checkbox" name="notify" class="onoffswitch-checkbox" id="notify">
                    <label class="onoffswitch-label" for="notify">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                    </label>
                </div>
            </td>
        </tr>
        <tr>
            <td>Sound</td><td>
                <div class="onoffswitch">
                    <input type="checkbox" name="sound" class="onoffswitch-checkbox" id="sound">
                    <label class="onoffswitch-label" for="sound">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                    </label>
                </div>
            </td>
        </tr>
        <tr>
            <td>Due time</td><td>display due date | display remaining time</td>
        </tr>
        <tr>
            <td>Default snooze time</td><td><a href="#">10 minutes</a></td>
        </tr>
        <tr>
            <td>Delete completed task after</td><td>1 day | 1 week | 1 month | 2 months | never</td>
        </tr>
        <tr>
            <td>Delete overdue task after</td><td>1 week | 1 month | 2 months | never</td>
        </tr>
        <tr>
            <td>Language</td><td>English | Deutsch | Portuguese </td>
        </tr>

    </table>
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