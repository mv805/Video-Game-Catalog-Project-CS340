const Game = require("../models/Game");
const Developer = require("../models/Developer");
const Franchise = require("../models/Franchise");
const handleError = require("../errorHandler");

const GameController = {
  index: async (req, res) => {
    try {
      //get the last inserted and deleted parameter if it exists
      const { lastInsertId, lastDeletedTitle, updateFormId, lastUpdateId } =
        req.query;

      //get and display all the games on first load
      const games = await new Promise((resolve, reject) => {
        Game.getAll((err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      //get franchises for the id selectors
      const franchises = await new Promise((resolve, reject) => {
        Franchise.getAll((err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      //get developers for the id selectors
      const developers = await new Promise((resolve, reject) => {
        Developer.getAll((err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      //depending on the parameters in the url, the following values might be given to the options for the next render. They are used to conditionally render parts of the html

      let lastGameCreated;
      if (lastInsertId) {
        lastGameCreated = await new Promise((resolve, reject) => {
          Game.findById(lastInsertId, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }

      let lastGameDeleted;
      if (lastDeletedTitle) {
        lastGameDeleted = lastDeletedTitle;
      }

      let lastGameUpdated;
      if (lastUpdateId) {
        lastGameUpdated = await new Promise((resolve, reject) => {
          Game.findById(lastUpdateId, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }

      let updateFormFillData;
      if (updateFormId) {
        updateFormFillData = await new Promise((resolve, reject) => {
          Game.findById(updateFormId, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
          });
        });
        console.log("update data", updateFormFillData);
      }

      //template render options
      let renderOptions = {
        games,
        franchises,
        developers,
        lastGameCreated,
        lastGameDeleted,
        updateFormFillData,
        lastGameUpdated,
      };

      res.render("game", renderOptions);
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occured rendering the game page.");
    }
  },
  add: (req, res) => {
    //The paramaters for creating a new game. Title, release year are required
    const { title, releaseYear, price, developerId, franchiseId } = req.body;

    if (!title || !releaseYear || !price) {
      return handleError(
        res,
        "Game Title, Release Year, and Price is required when creating a Game."
      );
    } else if (isNaN(Number(releaseYear))) {
      return handleError(res, "Release year must be a number.");
    }

    Game.add(
      title,
      releaseYear,
      price,
      developerId,
      franchiseId,
      (err, results) => {
        if (err) {
          console.log(err);
          // Redirect to an error page
          return handleError(res, err.message);
        }
        //redirect to index, but give the last created row id so it can be highlighted to the user
        res.redirect(`/?lastInsertId=${results.insertId}`);
      }
    );
  },
  delete: async (req, res) => {
    try {
      const { gameId } = req.body;

      if (!gameId) {
        return handleError(res, "The Game ID is required to delete a row.");
      }

      const lastGameDeleted = await new Promise((resolve, reject) => {
        Game.findById(gameId, (err, result) => {
          if (err) reject(err);
          else resolve(result[0]);
        });
      });

      await new Promise((resolve, reject) => {
        Game.delete(gameId, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      res.redirect(`/?lastDeletedTitle=${lastGameDeleted["Title"]}`);
    } catch (err) {
      return handleError(res, err.message);
    }
  },
  fillForm: async (req, res) => {
    const { gameId } = req.body;

    res.redirect(`/?updateFormId=${gameId}`);
  },
  update: async (req, res) => {
    try {
      const { gameId, title, releaseYear, price, developerId, franchiseId } =
        req.body;

      if (!title || !releaseYear || !price) {
        return handleError(
          res,
          "Game Title, Release Year, and Price is required when updating a Game."
        );
      } else if (isNaN(Number(releaseYear))) {
        return handleError(res, "Release year must be a number.");
      };

      await new Promise((resolve, reject) => {
        Game.update(
          gameId,
          title,
          releaseYear,
          price,
          developerId,
          franchiseId,
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });

      res.redirect(`/?lastUpdateId=${gameId}`);
    } catch (err) {
      return handleError(res, err.message);
    }
  },
};

module.exports = GameController;
