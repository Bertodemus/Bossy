var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
var viewit = require('./lib/view');
var addin = require('./lib/add');
var remout = require('./lib/remove');
var upd = require('./lib/update');

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
    inquirer.prompt({
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
    .then( function(answer) {
        switch (answer.action) {

        case "View Departments":
            viewit.viewD(connection);
            break;

        case "View Roles":
            viewit.viewR(connection);
            break;

        case "View Employees":
            viewit.viewE(connection);
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