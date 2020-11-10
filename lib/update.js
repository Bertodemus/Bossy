module.exports = {
  upRole: function (answer, connection, runCMS, figlet) {
    connection.query(`UPDATE employees SET role_id=${answer.role} WHERE first_name="${answer.first}" && last_name="${answer.last}"`, function(err, res) {
        if (err) throw err;
        console.log(figlet.textSync("Role Updated!", {
          font: 'Small',
          horizontalLayout: 'default',
          verticalLayout: 'default',
          width:150,
          whitespaceBreak: true
      }));
        runCMS();
    });
  },
  upManager: function (answer, connection, runCMS, figlet) {
    connection.query(`UPDATE employees SET manager_id=${answer.manager} WHERE first_name="${answer.first}" && last_name="${answer.last}"`, function(err, res) {
        if (err) throw err;
        console.log(figlet.textSync('Manager Updated!', {
          font: 'Small',
          horizontalLayout: 'default',
          verticalLayout: 'default',
          width:150,
          whitespaceBreak: true
      }));
        runCMS();
    });
  }

}