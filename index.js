var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');
var figlet = require('figlet');
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
  console.log(figlet.textSync('BOSSY CMS', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width:150,
    whitespaceBreak: true
}));
  runCMS();
});

function runCMS() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees by Departments",
            "View All Employees by Roles",
            "View All Employees by Manager",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Exit"
        ]
    })
    .then( function(answer) {
        switch (answer.action) {

        case "View All Employees by Departments":
            viewit.viewD(connection, runCMS, figlet);
            break;

        case "View All Employees by Roles":
            viewit.viewR(connection, runCMS, figlet);
            break;

        case "View All Employees":
            viewit.viewE(connection, runCMS, figlet);
            break;

        case "View All Employees by Manager":
            viewit.viewM(connection, runCMS, figlet);
            break;          

        case "Add Department":
            inquirer.prompt({
                name: "department",
                type: "input",
                message: "What department would you like to add?"
            }).then(function(answer){
                let department = answer.department;
                addin.addD(department, connection, runCMS, figlet);
            });
            break;

        case "Add Role":
            var deps = [];
            connection.query("SELECT * FROM departments", function(err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    deps.push(res[i].department);
                }
                inquirer.prompt([
                    {
                        name: "role",
                        type: "input",
                        message: "What role would you like to add?"
                    },
                    {
                        name: "salary",
                        type: "input",
                        message: "What salary will this role have?"              
                    },
                    {
                        name: "department",
                        type: "list",
                        message: "What department does this role belong to?",
                        choices: deps,
                    }
                    ]).then(function(answer){
                        res.forEach(function(val, i){
                            if (res[i].department === answer.department) {
                                answer.department = res[i].id;
                            }
                        });
                        addin.addR(answer, connection, runCMS, figlet);
                    });
            });           
            break;

        case "Add Employee":
            var roles = [];

            connection.query("SELECT * FROM roles", function(err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    roles.push(res[i].role);
                }
                inquirer.prompt([
                    {
                        name: "first_name",
                        type: "input",
                        message: "Employee's First Name:"
                    },
                    {
                        name: "last_name",
                        type: "input",
                        message: "Employee's Last Name:"
                    },
                    {
                        name: "role",
                        type: "list",
                        message: "What role will they have in their department?",
                        choices: roles,
                    }
                    ]).then(function(answer){
                        res.forEach(function(val, i){
                            if (res[i].role === answer.role) {
                                answer.role = res[i].id;
                            }
                        });
                        addin.addE(answer, connection, runCMS, figlet);
                    });
    
        });            
            break;

        case "Update Employee Role":
            var roles = [];
            var roleList = [];
            var emps = [];            
            connection.query("SELECT * FROM roles", function(err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    roles.push(res[i].role);
                    roleList.push(res[i]);
                }
                connection.query("SELECT * FROM employees", function(err, res) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                        emps.push(res[i].first_name+ " " + res[i].last_name);
                    }

                inquirer.prompt([
                    {
                        name: "employee",
                        type: "list",
                        message: "Which employee would you like to update?",
                        choices: emps,
                    },
                    {
                        name: "role",
                        type: "list",
                        message: "What role would you like to assign?",
                        choices: roles,
                    }
                    ]).then(function(answer){
                        roles.forEach(function(val, i){
                            if (roleList[i].role === answer.role) {
                                answer.role = roleList[i].id;
                            }
                        var str = answer.employee;
                        var array = str.split(" ");
                        answer.first = array[0];
                        answer.last = array[1];
                        });
                        upd.upRole(answer, connection, runCMS, figlet);
                    });
                });
        });            
            break;

            case "Update Employee Manager":
                var empsList = []; 
                var emps = [];            
                    connection.query("SELECT * FROM employees", function(err, res) {
                        if (err) throw err;
                        for (var i = 0; i < res.length; i++) {
                            emps.push(res[i].first_name+ " " + res[i].last_name);
                            empsList.push(res[i]);
                        }
    
                    inquirer.prompt([
                        {
                            name: "employee",
                            type: "list",
                            message: "Which employee would you like to update?",
                            choices: emps,
                        },
                        {
                            name: "manager",
                            type: "list",
                            message: "Who would you like to assign as their manager?",
                            choices: emps,
                        }
                        ]).then(function(answer){
                            var am = answer.manager;
                            var arrayM = am.split(" ");
                            
                            empsList.forEach(function(val, i){
                                if (empsList[i].first_name === arrayM[0] && empsList[i].last_name === arrayM[1] ) {
                                    answer.manager = empsList[i].id;
                                }

                            var ae = answer.employee;
                            var arrayE = ae.split(" ");
                            answer.first = arrayE[0];
                            answer.last = arrayE[1];
                            });
                            console.log(answer);
                            upd.upManager(answer, connection, runCMS, figlet);
                        });
                    });         
                break;

        case "Exit":
console.log(
`


Thank you for using`
);

            console.log(figlet.textSync('BOSSY CMS', {
                font: 'ANSI Shadow',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width:150,
                whitespaceBreak: true
            }));
            connection.end();
            break;
        }
    });
}