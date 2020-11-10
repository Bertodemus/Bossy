module.exports = {
  upRole: function (answer, connection, runCMS, figlet) {
    connection.query(`UPDATE employees SET role_id=${answer.role} WHERE first_name="${answer.first}" && last_name="${answer.last}"`, function(err, res) {
        if (err) throw err;
        console.log(figlet.textSync('Employee Updated!', {
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