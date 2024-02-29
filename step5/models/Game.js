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
};

module.exports = Game;
