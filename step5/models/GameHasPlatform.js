const db = require("../db-connector");

const GameHasPlatform = {
  getAll: (callback) => {
    db.pool.query(
      `
        SELECT GameHasPlatforms.gameHasPlatformID,
            Games.title as 'Game',
            Platforms.name as 'Platform'
        FROM GameHasPlatforms
            JOIN Games ON Games.gameID = GameHasPlatforms.gameID
            JOIN Platforms ON Platforms.platformID = GameHasPlatforms.platformID
        ORDER BY Games.title;
      `,
      callback
    );
  },
  add: (gameId, platformId, callback) => {
    let sql = `
        INSERT INTO GameHasPlatforms (
            gameID,
            platformID
        )
        VALUES (
            ${gameId ? "?" : "NULL"},
            ${platformId ? "?" : "NULL"}
        );
    `;

    let params = [];
    if (gameId) params.push(gameId);
    if (platformId) params.push(platformId);

    db.pool.query(sql, params, callback);
  },
  findById: (gamehasplatformId, callback) => {
    db.pool.query(
      `
        SELECT GameHasPlatforms.gameHasPlatformID,
            Games.title as 'Game',
            Platforms.name as 'Platform'
        FROM GameHasPlatforms
            JOIN Games ON Games.gameID = GameHasPlatforms.gameID
            JOIN Platforms ON Platforms.platformID = GameHasPlatforms.platformID
        ORDER BY Games.title;

      `,
      [gamehasplatformId],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  },
  delete: (gamehasplatformId, callback) => {
    db.pool.query(
      `
        DELETE FROM GameHasPlatforms
        WHERE gameHasPlatformID = ?       
      `,
      [gamehasplatformId],
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
    gamehasplatformId,
    gameId,
    platformId,
    callback
  ) => {
    let sql = `
      UPDATE GameHasPlatforms
      SET gamehasplatformID = ?
        gameID = ${gameId ? "?" : "NULL"},
        platformID = ${platformId ? "?" : "NULL"}
      WHERE gamehasplatformID = ?;
      
    `;

    let params = [];

    if (gameId) params.push(gameId);
    if (platformId) params.push(platformId);
    params.push(gamehasplatformId);

    db.pool.query(sql, params, (err, result) => {
      if (err) {
        callback(err, null);
      } else if (result.affectedRows === 0) {
        callback(new Error("No record found with the given GameHasPlatform Id."));
      } else {
        callback(null, result);
      }
    });
  },
};

module.exports = GameHasPlatform;
