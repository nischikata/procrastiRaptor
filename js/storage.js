/* indexeddb stuff*/

const DB_NAME = "RaptorTasks";
const DB_VERSION = 1;
const DB_STORE_NAME = 'tasks';

var db;

// this is what the data looks like
const taskList = [
    { title: "Do 50 pushups.", notes: "none",
      p_difficulty:  4, p_satisfaction:  3, p_time_effort: 40, priority: 'C', ranking: 5,
      a_difficulty: -1, a_satisfaction: -1, a_time_effort: -1, done: false },
    { title: "Find b-day present for best friend", notes: "T-Shirt?",
        p_difficulty:  5, p_satisfaction:  4, p_time_effort: 90, priority: 'A', ranking: 1,
        a_difficulty: -1, a_satisfaction: -1, a_time_effort: -1, done: false },
];


function openDb() {
    console.log("openDb ...");
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
        db = this.result;
        console.log("openDb DONE");
    };
    req.onerror = function (evt) {
        console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
        console.log("openDb.onupgradeneeded");
        var store = evt.currentTarget.result.createObjectStore(
            DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });

        store.createIndex('title', 'title', { unique: false });
        store.createIndex('category', 'category', { unique: false });
        store.createIndex('done', 'done', { unique: false });
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

function addTask(title, difficulty, satisfaction, time_effort, priority){}

function updateTask(){}

function removeTask(){}



function addEventListeners(){

    $('#add-button').click(function(evt) {
        console.log("add ...");
        var title = $('#title').val();
        var p_diff = $('#p_diff').val();
        if (!title) {
            console.log("Required field(s) missing");
            return;
        }

        //TODO add rest + validation

        //TODO time needs to be converted to minutes

        addTask(title, p_diff);

    });
    //

}