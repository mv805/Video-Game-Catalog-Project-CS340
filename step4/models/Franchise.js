const db = require("../db-connector");

const Franchise = {
  getAll: (callback) => {
    db.pool.query(
      `
      SELECT franchiseID AS 'Franchise ID',
          title AS 'Title'
      FROM Franchises
      ORDER BY franchiseID;
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
  findById: (franchiseId, callback) => {
    db.pool.query(
      `
      SELECT franchiseID AS 'Franchise ID',
          title AS 'Title'
      FROM Franchises
      WHERE franchiseID = ?;
      `,
      [franchiseId],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },
  add: (title, callback) => {
    db.pool.query(
      `
      INSERT INTO Franchises (title)
      VALUES (?);
      `,
      [title],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },
  delete: (franchiseId, callback) => {
    db.pool.query(
      `
      DELETE FROM Franchises
      WHERE franchiseID = ?;
      `,
      [franchiseId],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },
  update: (franchiseId, title, callback) => {
    db.pool.query(
      `
      UPDATE Franchises
      SET title = ?
      WHERE franchiseID = ?;
      `,
      [title, franchiseId],
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

module.exports = Franchise;
