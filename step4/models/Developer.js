const db = require("../db-connector");

const Developer = {
  getAll: (callback) => {

    db.pool.query(
      `
      SELECT developerID AS 'Developer ID',
        name AS 'Name'
      FROM Developers
      ORDER BY developerID;
      `,
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  }
};

module.exports = Developer;
