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
  findById: (platformId, callback) => {
    db.pool.query(
      `
      SELECT platformID AS 'Platform ID',
          name AS 'Name'
      FROM Platforms
      WHERE platformID = ?;
      `,
      [platformId],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else if (result.length === 0) {
          callback(
            new Error("No record found with the given Platform Id."),
            null
          );
        } else {
          callback(null, result);
        }
      }
    );
  },
  add: (name, callback) => {
    db.pool.query(
      `
      INSERT INTO Platforms (name)
      VALUES (?);
      `,
      [name],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },
  delete: (platformId, callback) => {
    db.pool.query(
      `
      DELETE FROM Platforms
      WHERE platformID = ?;
      `,
      [platformId],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },
  update: (platformId, name, callback) => {
    db.pool.query(
      `
      UPDATE Platforms
      SET name = ?
      WHERE platformID = ?;
      `,
      [name, platformId],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else if (result.affectedRows === 0) {
          callback(new Error("No record found with the given Platform Id."));
        } else {
          callback(null, result);
        }
      }
    );
  },
};

module.exports = Platform;
