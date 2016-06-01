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

function getTask(key, store, success_callback) {
    var req = store.get(key);
    req.onsuccess = function(evt) {
        var value = evt.target.result;
        if (value) {
            //TODO:
            //success_callback(value.xyz);
        }
    };
}

function addTask(title, notes, category, duedate, difficulty, satisfaction, time_effort, priority){

    console.log("add Task arguments:", arguments);

    var task = { title: title, notes: notes, category: category, duedate: duedate,
        p_difficulty:  difficulty, p_satisfaction:  satisfaction, p_time_effort: time_effort, priority: priority, ranking: null,
        a_difficulty: null, a_satisfaction: null, a_time_effort: 0, done: false };

    var store = getObjectStore(DB_STORE_NAME, 'readwrite');
    var req;

    try {
        req = store.add(task);
    } catch (error) {
        displayActionFailure(this.error);
    }

    req.onsuccess = function (event) {

        //reset form
        document.getElementById('form_add_task').reset();
        var duration_field = $("#f_duration");
        duration_field.val("");
        duration_field.data("seconds", 0);
        duration_field.css('background-color', 'white');

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

/**
 * @param {number} key
 * @param {IDBObjectStore=} store
 * @param {string} name
 * @param value
 */
function updateTask(key, name, value, store){
    console.log("update Task: ", arguments);
    if (typeof store == 'undefined') {
        store = getObjectStore(DB_STORE_NAME, 'readwrite');
    }

    var request = store.get(key);
    request.onerror = function(event) {
        // Handle errors!
    };
    request.onsuccess = function(event) {
        // Get the old value that we want to update
        var data = request.result;

        // update the value(s) in the object that you want to change
        console.log("data name: " + data[name]);
        data[name] = value;

        // Put this updated object back into the database.
        var requestUpdate = store.put(data);
        requestUpdate.onerror = function(event) {
            // Do something with the error
        };
        requestUpdate.onsuccess = function(event) {
            // Success - the data is updated!
            displayActionSuccess("Task updated successfully.");
            // TODO: only update this one list element!
            updateTaskListView();
        };
    };
}


/**
 * @param {number} key
 * @param {IDBObjectStore=} store
 */
function removeTask(key, store) {
    console.log("delete Task:", arguments);

    if (typeof store == 'undefined')
        store = getObjectStore(DB_STORE_NAME, 'readwrite');

    // As per spec http://www.w3.org/TR/IndexedDB/#object-store-deletion-operation
    // the result of the Object Store Deletion Operation algorithm is
    // undefined, so it's not possible to know if some records were actually
    // deleted by looking at the request result.
    var req = store.get(key);
    req.onsuccess = function(evt) {
        var task = evt.target.result;
        console.log("Task:", task);
        if (typeof task == 'undefined') {
            displayActionFailure("No matching record found");
            return;
        }
        // Warning: The exact same key used for creation needs to be passed for
        // the deletion. If the key was a Number for creation, then it needs to
        // be a Number for deletion.
        req = store.delete(key);
        req.onsuccess = function(evt) {
            console.log("evt:", evt);
            console.log("evt.target:", evt.target);
            console.log("evt.target.result:", evt.target.result);
            console.log("delete successful");
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

    $('#add-task-button').click(function(evt) {
        console.log("add ...");
        var title = $('#f_title').val();
        var category = $('#f_category').val();
        console.log("category? " + category);
        if (!category) {
            console.log("no category selected");
        }

        var date = $('#f_duedatetime').val();
        console.log("date: " + date);

        var difficulty = $('#f_pdifficulty').val();
        console.log("diff: " + difficulty);

        var satisfaction = $( "input:radio[name=f_psatisfaction]:checked" ).val();
        if (!title) {
            console.log("Required field(s) missing");
            displayActionFailure("Required field(s) missing");
            return;
        }

        var time_effort = $('#f_duration').data("seconds");
        console.log("time duration: " + time_effort);

        var priority = $('#f_priority').val();

        //TODO add rest + validation

        var notes = "none";

        addTask(title, notes, category, date, difficulty, satisfaction, time_effort, priority);

    });


}

function getTaskListElement(value, key) {
    console.log("task content: ", arguments);
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
    '<div>'+ due +'</div><div class="description">due on</div></div>' +
    '<div class="task_title"><h2>' + value.title +
    '</h2></div></div>');
    list_item.append(top_row);

    var p_time_effort = toDurationString(value.p_time_effort);
    var a_time_effort = toDurationString(value.a_time_effort);
    console.log("p time: " + p_time_effort);
    console.log("a time: " + a_time_effort);

    // BOTTOM ROW
    var bottom_row = $('<div class="bottom_row">' +
    '<div class="difficulty"><div class="trapez trapez_1 grey"></div><div class="trapez trapez_2 grey"></div><div class="trapez trapez_3"></div><div class="trapez trapez_4"></div><div class="trapez trapez_5"></div>' +
    '<div class="description">difficulty</div></div>' +
    '<div class="satisfaction"><div class="laughing"></div><span class="description">satisfaction</span></div><div class="effort"><div class="invested right"><span>' + a_time_effort + '</span><div class="description right">invested</div></div>' +
    '<div class="predicted"><span>&nbsp;'+ p_time_effort + '</span><div class="description">&nbsp;predicted</div></div></div>' +
    '</div>');

    list_item.append(bottom_row);


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
        console.log("delta X:   " + e.deltaX + "  window: " + width);

        if (width < 2 * e.deltaX && !value.done) {
            native_li.style.backgroundColor = 'rgba(67, 221, 54, 0.4)';
            native_li.style.borderColor = 'rgba(67, 221, 54, 0.8)';
        }
    });

    hammer_manager.on("swipeend panend", function(e){
        var width = $( document ).width();
        console.log(e);
        console.log("DIRECTION:  " + e.direction);
        console.log("lef is:" + Hammer.DIRECTION_LEFT + " and right is  " + Hammer.DIRECTION_RIGHT);
        console.log("delta x is: " + e.deltaX);


        if (width < -2 * e.deltaX && e.overallVelocityX > -1.0) { // swipe left, delete Task
            $(native_li).fadeOut("slow", function() {
                hammer_manager.remove("pan");
                hammer_manager.stop();
                hammer_manager.destroy();
                removeTask(key);});

        } else if (!value.done && width < 2 * e.deltaX && e.overallVelocityX < 1.0) { // swipe right, mark Task DONE
            hammer_manager.remove("pan swipe");
            updateTask(key, "done", true);
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
            updateTask(key, "title", "entry updated.");
        }
    });

    return list_item;
}

function updateTaskListView(store) {
    console.log("display task list");
    if (typeof store == 'undefined') {
        store = getObjectStore(DB_STORE_NAME, 'readonly');
        console.log(store);
    } else {
        console.log("not undefined");
        console.log(store);
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
}

openDb();
addEventListeners();
