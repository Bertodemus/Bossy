module.exports = {

    viewD: function (connection, runCMS, figlet) {
        connection.query("SELECT * FROM departments", function(err, res) {
            if (err) throw err;
            console.log(figlet.textSync('DEPARTMENTS', {
                font: 'Small',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width:150,
                whitespaceBreak: true
            }));
            console.table(res);
            runCMS();
        });
    },
    viewR: function (connection, runCMS, figlet) {
        connection.query("SELECT roles.id, roles.role, departments.department FROM roles INNER JOIN departments ON roles.department_id = departments.id", function(err, res) {
            if (err) throw err;
            console.log(figlet.textSync('ROLES', {
                font: 'Small',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width:150,
                whitespaceBreak: true
            }));
            console.table(res);
            runCMS();
        });
    },
    viewE: function (connection, runCMS, figlet) {
        connection.query("SELECT employees.id, employees.first_name, employees.last_name, roles.role, departments.department, roles.salary, CONCAT(s.first_name, ' ', s.last_name) AS Manager FROM (((employees INNER JOIN roles ON employees.role_id = roles.id) INNER JOIN departments ON roles.department_id = departments.id) LEFT JOIN employees s ON s.id = employees.manager_id)", function(err, res) {
            if (err) throw err;
            console.log(figlet.textSync('EMPLOYEES', {
                font: 'Small',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width:150,
                whitespaceBreak: true
            }));
            console.table(res);
            runCMS();
        });
      }

};



