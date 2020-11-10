module.exports = {

    addD: function (department, connection, runCMS, figlet) {
        connection.query(`INSERT INTO departments (department) VALUES ("${department}")`, function(err, res) {
            if (err) throw err;
            console.log(figlet.textSync('Department Added!', {
                font: 'Small',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width:150,
                whitespaceBreak: true
            }));
            runCMS();
        });
    },
    addR: function (answer, connection, runCMS, figlet) {
        connection.query(`INSERT INTO roles (role, salary, department_id) VALUES ("${answer.role}", ${answer.salary}, ${answer.department})`, function(err, res) {
            if (err) throw err;
            console.log(figlet.textSync('Role Added!', {
                font: 'Small',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width:150,
                whitespaceBreak: true
            }));
            runCMS();
        });
    },
    addE: function (answer, connection, runCMS, figlet) {
        connection.query(`INSERT INTO employees (first_name, last_name, role_id) VALUES ("${answer.first_name}", "${answer.last_name}", ${answer.role})`, function(err, res) {
            if (err) throw err;
            console.log(figlet.textSync('Employee Added!', {
                font: 'Small',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width:150,
                whitespaceBreak: true
            }));
            runCMS();
        });
      }

};
