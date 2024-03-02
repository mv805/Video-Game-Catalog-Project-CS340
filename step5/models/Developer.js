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
  },
  findById: (developerId, callback) => {
    db.pool.query(
      `
      SELECT developerId AS 'Developer ID',
          name AS 'Name'
      FROM Developers
      WHERE developerId = ?;
      `,
      [developerId],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },
  add: (name, callback) => {
    db.pool.query(
      `
      INSERT INTO Developers (name)
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
  delete: (developerId, callback) => {
    db.pool.query(
      `
      DELETE FROM Developers
      WHERE developerId = ?;
      `,
      [developerId],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },
  update: (developerId, name, callback) => {
    db.pool.query(
      `
      UPDATE Developers
      SET name = ?
      WHERE developerId = ?;
      `,
      [name, developerId],
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

module.exports = Developer;
