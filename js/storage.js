/* indexeddb stuff*/

const DB_NAME = "RaptorTasks";
const DB_VERSION = 1;
const DB_STORE_NAME = 'tasks';

var db;

function openDb() {
    console.log("openDb ...");
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
        db = this.result;
        console.log("openDb DONE");

        updateTaskListView();

    };
    req.onerror = function (evt) {
        console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
        console.log("openDb.onupgradeneeded");
        var store = evt.currentTarget.result.createObjectStore(DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });

        store.createIndex('title', 'title', { unique: false });
        store.createIndex('category', 'category', { unique: false });
        store.createIndex('p_time_effort', 'p_time_effort', { unique: false });
    };

}

/**
 * @param {string} store_name
 * @param {string} mode either "readonly" or "readwrite"
 */
function getObjectStore(store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
}



function addTask(title, notes, category, duedate, difficulty, satisfaction, p_time_effort, invested_time, priority){


    var task = { title: title, notes: notes, category: category, duedate: duedate,
        p_difficulty:  difficulty, p_satisfaction:  satisfaction, p_time_effort: p_time_effort, priority: priority, ranking: null,
        a_difficulty: null, a_satisfaction: null, a_time_effort: invested_time, done: false };

    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req;

    try {
        req = store.add(task);
    } catch (error) {
        displayActionFailure(this.error);
    }

    req.onsuccess = function (event) {

        //reset form
        resetAddTaskForm();

        displayActionSuccess("New Task \'" + title + "\' added successfully.");
        updateTaskListView();
    }

    req.onerror = function() {
        displayActionFailure(this.error);
    };
}

function displayActionFailure(message) {
    $("#form_fail").text(message);
    $("#form_fail").show().delay(7000).queue(function(n) {
        $(this).hide(); n();
    });
}

function displayActionSuccess(message) {
    $("#form_success").text(message);
    $("#form_success").show().delay(6000).queue(function(n) {
        $(this).hide(); n();
    });
}

function clearObjectStore(store_name) {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req = store.clear();
    req.onsuccess = function(evt) {
        displayActionSuccess("Store cleared");
    };
    req.onerror = function (evt) {
        console.error("clearObjectStore:", evt.target.errorCode);
        displayActionFailure(this.error);
    };
}


function getTask2(key, store, success_callback) {
    var req = store.get(key);
    req.onsuccess = function(evt) {
        var value = evt.target.result;
        if (value) {
            //TODO:
            //success_callback(value.xyz);
        }
    };
}


/**
 * @param {number} key
 * @param {array} updatedElems
 */
function updateTaskElems(key, updatedElems) {
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');

    console.log("this is the key in updateTaskElems: ", key);
    var request = store.get(key);
    request.onerror = function(event) {
        return false;
    };
    request.onsuccess = function(event) {

        // Get the old value that we want to update
        var data = request.result;

        for(var index in updatedElems)
        {
            data[index] = updatedElems[index];
        }

        // update the value(s) in the object that you want to change


        // Put this updated object back into the database.
        var requestUpdate = store.put(data);
        requestUpdate.onerror = function(event) {
            // Do something with the error
            return false;
        };
        requestUpdate.onsuccess = function(event) {
            // Success - the data is updated!
            return true;
        };
    };

}


/**
 * @param {number} key
 * @param {IDBObjectStore=} store
 */
function removeTask(key, store) {

    if (key == undefined)
    return;

    if (typeof store == 'undefined')
        store = getObjectStore(DB_STORE_NAME, 'readwrite');

    // As per spec http://www.w3.org/TR/IndexedDB/#object-store-deletion-operation
    // the result of the Object Store Deletion Operation algorithm is
    // undefined, so it's not possible to know if some records were actually
    // deleted by looking at the request result.
    var req = store.get(key);
    req.onsuccess = function(evt) {
        var task = evt.target.result;
        if (typeof task == 'undefined') {
            displayActionFailure("No matching record found");
            return;
        }
        // Warning: The exact same key used for creation needs to be passed for
        // the deletion. If the key was a Number for creation, then it needs to
        // be a Number for deletion.
        req = store.delete(key);
        req.onsuccess = function(evt) {

            displayActionSuccess("Deletion successful");
            updateTaskListView(store);
        };
        req.onerror = function (evt) {
            console.error("delete task:", evt.target.errorCode);
        };
    };
    req.onerror = function (evt) {
        console.error("delete task:", evt.target.errorCode);
    };
}

function addEventListeners(){

    $("div[name='add-task-button']").click(function(evt) {
        var title = $('#f_title').val();
        var category = $('#f_category').val();

        var date = $('#f_duedatetime').val();
        var difficulty = $("#f_p_difficulty").data("difficulty");

        var satisfaction = $( "input:radio[name=f_p_satisfaction]:checked" ).val();
        if (!title) {
            console.log("Required field(s) missing");
            displayActionFailure("Required field(s) missing");
            return;
        }

        var time_effort = $('#f_duration').data("seconds");
        var invested_time = $('#f_a_duration').data("seconds");


        var priority = $( "input:radio[name=f_priority]:checked" ).val();

        //TODO VALIDATION

        var notes = "none";

        addTask(title, notes, category, date, difficulty, satisfaction, time_effort, invested_time, priority);

    });

    $("div[name='reset-task-button']").click(function(evt) {
        resetAddTaskForm();
    });

    $("div[name='reset-rate-task-form']").click(function(evt) {
        resetFinishTaskForm();
    });

    $("div[name='save-edit']").click(function(evt) {
        saveEdits();
    });

    $("div[name='rate-task-button']").click(function(evt) {
    saveRatings();


    });



}

function saveRatings() {
    var updatedElems = {};
    updatedElems["done"] = true;
    updatedElems["a_satisfaction"] = $( "input:radio[name=f_a_satisfaction]:checked" ).val();
    updatedElems["a_difficulty"] = $("#f_a_difficulty").data("difficulty");
    updatedElems["a_time_effort"] = $('#f_a_duration2').data("seconds");

    var key = $("#edit_task_view").data('key');

    $.when(updateTaskElems(key, updatedElems)).then(function (result) {

        displayActionSuccess("Task DONE!");
        // TODO: only update this one list element!
        updateTaskListView();
    });
}

function saveEdits() {
    var updatedElems = {};
    var title = $('#e_title').val();
    if (!title) {
        console.log("Required field(s) missing");
        displayActionFailure("Required field(s) missing");
        return;
    } else {
        updatedElems["title"] = title;
    }
    var category = $('#e_category').val();
    updatedElems["category"] = category;

    var date = $('#e_duedatetime').val();
    updatedElems["duedate"] = date;

    var p_difficulty = $("#e_p_difficulty").data("difficulty");
    var a_difficulty = $("#e_a_difficulty").data("difficulty");
    updatedElems["p_difficulty"] = p_difficulty;
    updatedElems["a_difficulty"] = a_difficulty;

    var p_satisfaction = $( "input:radio[name=e_p_satisfaction]:checked" ).val();
    var a_satisfaction = $( "input:radio[name=e_a_satisfaction]:checked" ).val();
    updatedElems["p_satisfaction"] = p_satisfaction;
    updatedElems["a_satisfaction"] = a_satisfaction;

    var time_effort = $('#e_p_duration').data("seconds");
    var invested_time = $('#e_a_duration').data("seconds");
    updatedElems["p_time_effort"] = time_effort;
    updatedElems["a_time_effort"] = invested_time;


    var priority = $( "input:radio[name=e_priority]:checked" ).val();
    updatedElems["priority"] = priority;

    var done = $('#e_done').prop( "checked" )
    updatedElems["done"] = done;
    var key = $("#edit_task_view").data('key');
    updateTaskElems(key, updatedElems);
    updateTaskListView();

}

function getTaskListElement(value, key) {

    var list_item = $('<li class="task"></li>');
    if (value.category != "")
        list_item.addClass(value.category);

    if (value.done) {
        list_item.addClass("done");
    }
    list_item.data("key", key);

    // TOP ROW

    var due = value.duedate;
    if (due == undefined || due == '') {
        due = "any time";
    }

    var top_row = $('<div class="top_row"><div class="duetime">' +
    '<div>'+ due +'</div><div class="description">due</div></div>' +
    '<div class="task_title"><h2>' + value.title +
    '</h2></div></div>');
    list_item.append(top_row);

    var p_time_effort = toDurationString(value.p_time_effort);
    var a_time_effort = toDurationString(value.a_time_effort);

    // BOTTOM ROW
    var bottom_row = $('<div class="bottom_row">' +
    '<div class="difficulty"><div class="trapez trapez_1 grey"></div><div class="trapez trapez_2 grey"></div><div class="trapez trapez_3"></div><div class="trapez trapez_4"></div><div class="trapez trapez_5"></div>' +
    '<div class="description">difficulty</div></div>' +
    '<div class="satisfaction"><div class="' + value.p_satisfaction +
    '"></div><span class="description">satisfaction</span></div><div class="effort"><div class="invested right"><span>' + a_time_effort + '</span><div class="description right">invested</div></div>' +
    '<div class="predicted"><span>&nbsp;'+ p_time_effort + '</span><div class="description">&nbsp;predicted</div></div></div>' +
    '</div>');

    list_item.append(bottom_row);

    var trapezes = bottom_row.find(".trapez");
    draw_difficulty_pyramid(trapezes, value.p_difficulty);


    // TOUCH EVENTS HAMMER TIME !
    var native_li = list_item.get( 0 );
    var hammer_manager = new Hammer(native_li);

    hammer_manager.on("panleft swipeleft", function(e){
        var width = $( native_li ).width();
        native_li.style.transform = 'translateX(' + e.deltaX + 'px)';

        if (width < -2 * e.deltaX) {
            native_li.style.backgroundColor = 'rgba(220, 23, 26, 0.20)';
            native_li.style.borderColor = 'rgba(220, 23, 26, 0.9)';
        }
    });

    hammer_manager.on("panright swiperight", function(e){
        var width = $( document ).width();
        native_li.style.transform = 'translateX(' + e.deltaX + 'px)';

        if (width < 2 * e.deltaX && !value.done) {
            native_li.style.backgroundColor = 'rgba(67, 221, 54, 0.4)';
            native_li.style.borderColor = 'rgba(67, 221, 54, 0.8)';
        }
    });

    hammer_manager.on("swipeend panend", function(e){
        var width = $( document ).width();

        if (width < -2 * e.deltaX && e.overallVelocityX > -1.0) { // swipe left, delete Task
            $(native_li).fadeOut("slow", function() {
                hammer_manager.remove("pan");
                hammer_manager.stop();
                hammer_manager.destroy();
                removeTask(key);});

        } else if (!value.done && width < 2 * e.deltaX && e.overallVelocityX < 1.0) { // swipe right, mark Task DONE
            hammer_manager.remove("pan swipe");

            finishTask(key, value);
            $(native_li).fadeOut("fast", function() { $(native_li).css("transform", "").css("background-color", "").css("border-color", "").fadeIn('fast'); });

        } else {
            // reset otherwise
            $(native_li).fadeOut("fast", function() { $(native_li).css("transform", "").css("background-color", "").css("border-color", "").fadeIn('fast'); });

        }
    });

// TOGGLE BOTTOM ROW ON TAP

    hammer_manager.on("tap", function(e) {
        list_item.find(".bottom_row").toggle(500);
    });


    // EDIT VIEW ON PreSS

    var press = hammer_manager.get('press');
    press.set({ time: 1000}); // set minimum press time in ms

    hammer_manager.on("press", function(e){
        var width = $( document ).width();
        if (width > Math.abs(3 * e.deltaX)) {
            editTask(key, value);

// TODO check whether update was done or not, result is undefined - need to fix this
            /*$.when(updateTask(key, "title", "entry updated.")).then(function(result){

                displayActionSuccess("Task updated successfully.");
                // TODO: only update this one list element!
                updateTaskListView()
            });*/

        }
    });

    return list_item;
}


function editTask(key, task) {
    if (key == undefined)
        return;

    var view_to_show = $("#edit_task_view");
    $("#edit_task_view").data('key', key);

    $("#add-task-footer").hide(100);
    $(".view:visible").hide(250);
    view_to_show.show(200);


    $('#e_title').val(task.title);
    // predicted and actual difficulty
    var p_trapezes = $('#e_p_difficulty').find(".trapez");
    draw_difficulty_pyramid(p_trapezes, task.p_difficulty);
    $('#e_p_difficulty').data("difficulty", task.p_difficulty);

    var a_trapezes = $('#e_a_difficulty').find(".trapez");
    console.log("edit task, a difficulty :" + task.a_difficulty);
    draw_difficulty_pyramid(a_trapezes, task.a_difficulty);
    $('#e_a_difficulty').data("difficulty", task.a_difficulty);
    // predicted satisfaction
    $("input[name='e_p_satisfaction']").val([task.p_satisfaction]);
    $("input[name='e_a_satisfaction']").val([task.a_satisfaction]);


    var p_time_effort = $('#e_p_duration');
    p_time_effort.val(toDurationString(task.p_time_effort));
    p_time_effort.data('seconds', task.p_time_effort);

    var a_time_effort = $('#e_a_duration');
    a_time_effort.val(toDurationString(task.a_time_effort));
    a_time_effort.data('seconds', task.a_time_effort);

    $('#e_duedatetime').val(task.duedate);

    var priority= $("input[name='e_priority']").val([task.priority]);

    $('#e_category').val([task.category]);

    if (task.done) {
        $('#e_done').val([true]);
    }
}




// once a task is swiped right to mark it as done
// the user can rate his experience
function finishTask(key, task) {
    if (key == undefined)
        return;
    resetFinishTaskForm();
    $("#form_rate_task").data('key', key);
    $("#rate_task_title").text("'" + task.title + "'");
    var view_to_show = $("#rate_and_check_task");
    $("#add-task-footer").hide(100);
    $(".view:visible").hide(250);
    view_to_show.show(200);
    var a_time_effort = $('#f_a_duration2');
    a_time_effort.val(toDurationString(task.a_time_effort));
    a_time_effort.data('seconds', task.a_time_effort);
    console.log(task);


    var a_trapezes = $('#f_a_difficulty').find(".trapez");
    console.log("actual difficulty is: " + task.a_difficulty);
    draw_difficulty_pyramid(a_trapezes, task.a_difficulty);
    $('#f_a_difficulty').data("difficulty", task.a_difficulty);
    // predicted satisfaction

    $("input[name='f_a_satisfaction']").val([task.a_satisfaction]);
}

function resetFinishTaskForm(){

    document.getElementById('form_rate_task').reset();
    var duration_field = $("#f_a_duration2");
    duration_field.val("");
    duration_field.data("seconds", 0);
    //draw_difficulty_pyramid($("#f_a_difficulty").find(".trapez"), 0);
}

function resetAddTaskForm(){

    document.getElementById('form_add_task').reset();
    var duration_field = $("#f_duration");
    duration_field.val("");
    duration_field.data("seconds", 0);
    var duration_field2 = $("#f_a_duration");
    duration_field2.val("");
    duration_field2.data("seconds", 0);
    draw_difficulty_pyramid($("#f_p_difficulty").find(".trapez"), 0);
}

function updateTaskListView(store) {

    if (typeof store == 'undefined') {
        store = getObjectStore(DB_STORE_NAME, 'readonly');
    }

    // get list and empty list to remove previous content
    var ul_tasks = $('#ul_tasks');
    ul_tasks.empty();


    var i = 0;
    var req;
    req = store.count();
    req.onsuccess = function(evt) {
        // console.log('There are' + evt.target.result + ' record(s) in the object store.');
    };

    req = store.openCursor();
    req.onsuccess = function(evt) {
        var cursor = evt.target.result;
        // If the cursor is pointing at something, ask for the data
        if (cursor) {
           // console.log("updateTaskListView cursor:", cursor);
            req = store.get(cursor.key);
            req.onsuccess = function (evt) {
                var key = cursor.key;
                var value = evt.target.result;

                var list_item = getTaskListElement(value, key);

                ul_tasks.append(list_item);
            };

            // Move on to the next object in store
            cursor.continue();

            // This counter serves only to create distinct ids
            i++;
        } else {
           // console.log("No more entries");
        }
    };

    getMostImportantTasks();
}

function getMostImportantTasks(){
    var store = getObjectStore(DB_STORE_NAME, 'readonly');


    // get list and empty list to remove previous content
    var ul_tasks = $('#ul_startview_tasks');
    ul_tasks.empty();


    var allTasks = [];
    var req = store.openCursor();
    req.onsuccess = function(evt) {
        var cursor = evt.target.result;
        if (cursor) {
            var key = cursor.key;
            var task = cursor.value;
            if (!task.done) { // only add unfinished tasks to top priority
                var obj = { key: key, task: task };
                allTasks.push(obj);
            }
            cursor.continue();

        } else {
            // now all tasks are in the array, lets sort them
            // by priority,
            //and add those 3 like this:\

            if (allTasks.length > 0) { // there are tasks to show

                var sortedArray = allTasks.sort(comparePriority);


                for (var i = 0; i < 3 && i < sortedArray.length; ++i) {
                    var key = sortedArray[i].key;
                    var task = sortedArray[i].task;
                    var list_item = getTaskListElement(task, key);
                    ul_tasks.append(list_item);
                }
            } else {

                var task = { title: "Add a new task", notes: "", category: "default", duedate: "",
                    p_difficulty:  1, p_satisfaction:  "laughing", p_time_effort: 60, priority: 2, ranking: null,
                    a_difficulty: null, a_satisfaction: null, a_time_effort: 0, done: false };


                var empty_list_item = getTaskListElement(task, undefined);
                ul_tasks.append(empty_list_item);
            }
        }


    }



}

function comparePriority (a, b) {
    console.log("sorting: " + a.task.title + "  vs " + b.task.title);
    return a.task.priority > b.task.priority;

}

function compareDueness (a, b) {

    return a.task.duedate > b.task.duedate;

}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function getRandomTasks(){

    var store = getObjectStore(DB_STORE_NAME, 'readonly');


    // get list and empty list to remove previous content
    var ul_tasks = $('#ul_startview_tasks');
    ul_tasks.empty();


    var allTasks = [];
    var req = store.openCursor();
    req.onsuccess = function(evt) {
        var cursor = evt.target.result;
        if (cursor) {
            var key = cursor.key;
            var task = cursor.value;
            if (!task.done) { // only add unfinished tasks to top priority
                var obj = { key: key, task: task };
                allTasks.push(obj);
            }
            cursor.continue();

        } else {
            // now all tasks are in the array, lets sort them
            // by priority,
            //and add those 3 like this:\

            if (allTasks.length > 0) { // there are tasks to show

                var sortedArray = shuffleArray(allTasks);


                for (var i = 0; i < 3 && i < sortedArray.length; ++i) {
                    var key = sortedArray[i].key;
                    var task = sortedArray[i].task;
                    var list_item = getTaskListElement(task, key);
                    ul_tasks.append(list_item);
                }
            } else {
                var task = { title: "Add a new task", notes: "", category: "default", duedate: "",
                    p_difficulty:  3, p_satisfaction:  "pirate", p_time_effort: 60, priority: 0, ranking: null,
                    a_difficulty: null, a_satisfaction: null, a_time_effort: 0, done: false };


                var empty_list_item = getTaskListElement(task, undefined);
                ul_tasks.append(empty_list_item);
            }
        }


    }

}

function getTasksByCategory(category){
    var store = getObjectStore(DB_STORE_NAME, 'readonly');


    // get list and empty list to remove previous content
    var ul_tasks = $('#ul_startview_tasks');
    ul_tasks.empty();


    var allTasks = [];
    var req = store.openCursor();
    req.onsuccess = function(evt) {
        var cursor = evt.target.result;
        if (cursor) {
            var key = cursor.key;
            var task = cursor.value;
            if (!task.done && task.category == category) { // only add unfinished tasks to top priority
                var obj = { key: key, task: task };
                allTasks.push(obj);
            }
            cursor.continue();

        } else {
            // now all tasks are in the array, lets sort them
            // by priority,
            //and add those 3 like this:\

            if (allTasks.length > 0) { // there are tasks to show

                var sortedArray = allTasks.sort(comparePriority);


                for (var i = 0; i < 3 && i < sortedArray.length; ++i) {
                    var key = sortedArray[i].key;
                    var task = sortedArray[i].task;
                    var list_item = getTaskListElement(task, key);
                    ul_tasks.append(list_item);
                }
            } else {

                var task = { title: "Add a new task", notes: "", category: category, duedate: "",
                    p_difficulty:  1, p_satisfaction:  "laughing", p_time_effort: 60, priority: 2, ranking: null,
                    a_difficulty: null, a_satisfaction: null, a_time_effort: 0, done: false };


                var empty_list_item = getTaskListElement(task, undefined);
                ul_tasks.append(empty_list_item);
            }
        }


    }



}

openDb();
addEventListeners();
