var express = require("express");
var mysql = require("mysql");
var addin = require('./lib/add');
var remout = require('./lib/remove');
var upd = require('./lib/update')

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "My5q1_Okinawa1",
  database: "bossycms_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  runCMS();
});

function runCMS() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Departments",
                "View Roles",
                "View Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Roles",
                "exit"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
            case "View Departments":
                addin.viewD();
                break;
    
            case "View Roles":
                viewR();
                break;
    
            case "View Employees":
                viewE();
                break;

            case "Add Department":
                addD();
                break;

            case "Add Role":
                addR();
                break;

            case "Add Employee":
                addE();
                break;

            case "Update Employee Role":
                updateEmpRole();
                break;
    
            case "exit":
                connection.end();
                break;
            }
        });
    }





  // Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });

