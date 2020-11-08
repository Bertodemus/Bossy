module.exports = {

    viewD: function (connection) {
        connection.query("SELECT * FROM departments", function(err, res) {
            if (err) throw err;
            console.table(res);
            connection.end();
        });
    },
    viewR: function (connection) {
        connection.query("SELECT roles.id, roles.role, departments.department FROM roles INNER JOIN departments ON roles.department_id = departments.id", function(err, res) {
            if (err) throw err;
            console.table(res);
            connection.end();
        });
    },
    viewE: function (connection) {
        connection.query("SELECT employees.id, employees.first_name, employees.last_name, roles.role, departments.department, roles.salary FROM ((employees INNER JOIN roles ON employees.role_id = roles.id) INNER JOIN departments ON roles.department_id = departments.id)", function(err, res) {
            if (err) throw err;
            console.table(res);
            connection.end();
        });
      }

};