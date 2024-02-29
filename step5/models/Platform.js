const db = require("../db-connector");

const Platform = {
  getAll: (callback) => {

    db.pool.query(
      `
      SELECT platformID AS 'Platform ID',
        name AS 'Name'
      FROM Platforms
      ORDER BY platformID;
      `,
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },
};

module.exports = Platform;
