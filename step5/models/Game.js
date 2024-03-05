const db = require("../db-connector");

const Game = {
  getAll: (callback) => {
    db.pool.query(
      `
      SELECT Games.gameID AS 'Game ID',
          Games.title AS 'Title',
          Games.releaseYear AS 'Release Year',
          CONCAT('$', Games.price) AS 'Price',
          IFNULL(Developers.name, 'N/A') as 'Developer',
          IFNULL(Franchises.title, 'N/A') as 'Franchise'
      FROM Games
          LEFT JOIN Developers ON Developers.developerID = Games.developerID
          LEFT JOIN Franchises ON Franchises.franchiseID = Games.franchiseID
      ORDER BY Games.gameID;
      `,
      callback
    );
  },
  add: (title, releaseYear, price, developerId, franchiseId, callback) => {
    let sql = `
        INSERT INTO Games (
            title,
            releaseYear,
            price,
            developerID,
            franchiseID
        )
        VALUES (
            ?,
            ?,
            ?,
            ${developerId ? "?" : "NULL"},
            ${franchiseId ? "?" : "NULL"}
        );
    `;

    let params = [title, releaseYear, price];
    if (developerId) params.push(developerId);
    if (franchiseId) params.push(franchiseId);

    db.pool.query(sql, params, callback);
  },
  findById: (gameId, callback) => {
    db.pool.query(
      `
      SELECT Games.gameID AS 'Game ID',
          Games.title AS 'Title',
          Games.releaseYear AS 'Release Year',
          CONCAT('$', Games.price) AS 'Price',
          IFNULL(Developers.name, 'N/A') as 'Developer',
          IFNULL(Franchises.title, 'N/A') as 'Franchise'
      FROM Games
          LEFT JOIN Developers ON Developers.developerID = Games.developerID
          LEFT JOIN Franchises ON Franchises.franchiseID = Games.franchiseID
      WHERE Games.gameId = ?
      ORDER BY Games.gameID;
      `,
      [gameId],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },
  delete: (gameId, callback) => {
    db.pool.query(
      `
      DELETE FROM Games
      WHERE gameId = ?;
      `,
      [gameId],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },
  update: (
    gameId,
    title,
    releaseYear,
    price,
    developerId,
    franchiseId,
    callback
  ) => {
    let sql = `
      UPDATE Games
      SET 
        title = ?,
        releaseYear = ?,
        price = ?,
        developerID = ${developerId ? "?" : "NULL"},
        franchiseID = ${franchiseId ? "?" : "NULL"}
      WHERE gameID = ?;
      
    `;

    let params = [title, releaseYear, price];

    if (developerId) params.push(developerId);
    if (franchiseId) params.push(franchiseId);
    params.push(gameId);

    db.pool.query(sql, params, (err, result) => {
      if (err) {
        callback(err, null);
      } else if (result.affectedRows === 0) {
        callback(new Error("No record found with the given Game Id."));
      } else {
        callback(null, result);
      }
    });
  },
};

module.exports = Game;
