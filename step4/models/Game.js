const db = require("../db-connector");


//NOTE:
/*
Returned data from the query comes in the format like this: 

[
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  ...More objects for each row in the result set...
]
*/
const Game = {
  getAll: (callback) => {
    //example data:
    /*
      [
        {
          'Game ID': 1,
          'Title': 'Super Mario Bros.',
          'Release Year': 1985,
          'Price': '$30',
          'Developer': 'Nintendo',
          'Franchise': 'Super Mario'
        },
        {
          'Game ID': 2,
          'Title': 'The Legend of Zelda',
          'Release Year': 1986,
          'Price': '$25',
          'Developer': 'Nintendo',
          'Franchise': 'The Legend of Zelda'
        },
        ...More rows...
      ] 
    */
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
  // add: (name, email, gender, callback) => {
  //   db.query(
  //     "INSERT INTO customers (name, email, gender) VALUES (?, ?, ?)",
  //     [name, email, gender],
  //     (err, result) => {
  //       if (err) {
  //         callback(err, null);
  //       } else {
  //         callback(null, result.insertId);
  //       }
  //     }
  //   );
  // },
  // find: (id, callback) => {
  //   db.query("SELECT * FROM customers WHERE customerID = ?", [id], callback);
  // },
  // update: (id, field, value, callback) => {
  //   db.query(
  //     `UPDATE customers SET ${field} = ? WHERE customerID = ?`,
  //     [value, id],
  //     callback
  //   );
  // },
  // delete: (id, callback) => {
  //   db.query("DELETE FROM customers WHERE customerID = ?", [id], callback);
  // },
};

module.exports = Game;
