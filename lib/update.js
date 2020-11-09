module.exports = {
  upRole: function (answer, connection, runCMS) {
    connection.query(`UPDATE employees SET role_id=${answer.role} WHERE first_name="${answer.first}" && last_name="${answer.last}"`, function(err, res) {
        if (err) throw err;
        console.log("Employee updated!");
        runCMS();
    });
  }
}