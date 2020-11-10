module.exports = {

    viewD: function (connection, runCMS, figlet) {
        connection.query("SELECT employees.id AS ID, employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.role AS Role, departments.department AS Department, roles.salary AS Salary, CONCAT(s.first_name, ' ', s.last_name) AS Manager FROM (((employees INNER JOIN roles ON employees.role_id = roles.id) INNER JOIN departments ON roles.department_id = departments.id) LEFT JOIN employees s ON s.id = employees.manager_id)ORDER BY departments.department ASC", function(err, res) {
            if (err) throw err;
            console.log(figlet.textSync('Department View', {
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
        connection.query("SELECT employees.id AS ID, employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.role AS Role, departments.department AS Department, roles.salary AS Salary, CONCAT(s.first_name, ' ', s.last_name) AS Manager FROM (((employees INNER JOIN roles ON employees.role_id = roles.id) INNER JOIN departments ON roles.department_id = departments.id) LEFT JOIN employees s ON s.id = employees.manager_id)ORDER BY roles.role ASC", function(err, res) {
            if (err) throw err;
            console.log(figlet.textSync('Role View', {
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
        connection.query("SELECT employees.id AS ID, employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.role AS Role, departments.department AS Department, roles.salary AS Salary, CONCAT(s.first_name, ' ', s.last_name) AS Manager FROM (((employees INNER JOIN roles ON employees.role_id = roles.id) INNER JOIN departments ON roles.department_id = departments.id) LEFT JOIN employees s ON s.id = employees.manager_id) ORDER BY employees.last_name ASC", function(err, res) {
            if (err) throw err;
            console.log(figlet.textSync('All Employees', {
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
      viewM: function (connection, runCMS, figlet) {
        connection.query("SELECT employees.id AS ID, employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.role AS Role, departments.department AS Department, roles.salary AS Salary, CONCAT(s.first_name, ' ', s.last_name) AS Manager FROM (((employees INNER JOIN roles ON employees.role_id = roles.id) INNER JOIN departments ON roles.department_id = departments.id) LEFT JOIN employees s ON s.id = employees.manager_id) ORDER BY Manager DESC", function(err, res) {
            if (err) throw err;
            console.log(figlet.textSync('Manager View', {
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



// viewR: function (connection, runCMS, figlet) {
//     connection.query("SELECT roles.id, roles.role, departments.department FROM roles INNER JOIN departments ON roles.department_id = departments.id", function(err, res) {
