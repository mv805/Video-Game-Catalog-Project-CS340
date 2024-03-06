const GameHasPlatform = require("../models/GameHasPlatform");
const Game = require("../models/Game");
const Platform = require("../models/Platform");
const handleError = require("../errorHandler");

const GameHasPlatformController = {
  //This is the main index
  //it will display the gamehasplatforms by default
  //also its possible there could be query parameters which conditionally display different notifications about the last taken actions, delted, updated, created etc.

  index: async (req, res) => {
    try {
      //get the last inserted and deleted parameter if it exists
      const { lastInsertId, lastDeletedName, updateFormId, lastUpdateId } =
        req.query;

      //get and display all the gamehasplatforms on first load
      const gamehasplatforms = await new Promise((resolve, reject) => {
        GameHasPlatform.getAll((err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
      //get games for the id selectors
      const games = await new Promise((resolve, reject) => {
        Game.getAll((err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      //get platforms for the id selectors
      const platforms = await new Promise((resolve, reject) => {
        Platform.getAll((err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
      //depending on the parameters in the url, the following values might be given to the options for the next render. They are used to conditionally render parts of the html

      let lastGameHasPlatformCreated;
      if (lastInsertId) {
        lastGameHasPlatformCreated = await new Promise((resolve, reject) => {
          GameHasPlatform.findById(lastInsertId, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }

      let lastGameHasPlatformDeleted;
      if (lastDeletedName) {
        lastGameHasPlatformDeleted = lastDeletedName;
      }

      let lastGameHasPlatformUpdated;
      if (lastUpdateId) {
        lastGameHasPlatformUpdated = await new Promise((resolve, reject) => {
          GameHasPlatform.findById(lastUpdateId, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }

      let updateFormFillData;
      if (updateFormId) {
        updateFormFillData = await new Promise((resolve, reject) => {
          GameHasPlatform.findById(updateFormId, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
          });
        });
      }

      //template render options
      let renderOptions = {
        gamehasplatforms,
        games,
        platforms,
        lastGameHasPlatformCreated,
        lastGameHasPlatformDeleted,
        updateFormFillData,
        lastGameHasPlatformUpdated,
      };

      res.render("gamehasplatform", renderOptions);
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occured rendering the gamehasplatform page.");
    }
  },
  add: (req, res) => {
    //a name is needed and should be given in the body
    const {gameId, platformId} = req.body;

    GameHasPlatform.add(gameId, platformId, (err, results) => {
      if (err) {
        console.log(err);
        // Redirect to an error page
        return handleError(res, err.message);
      }
      //redirect to index, but give the last created row id so it can be highlighted to the user
      res.redirect(`/gamehasplatform?lastInsertId=${results.insertId}`);
    });
  },
  delete: async (req, res) => {
    try {
      const { gamehasplatformId } = req.body;

      if (!gamehasplatformId) {
        return handleError(res, "The GameHasPlatform ID is required to delete a row.");
      }

      const lastGameHasPlatformDeleted = await new Promise((resolve, reject) => {
        GameHasPlatform.findById(gamehasplatformId, (err, result) => {
          if (err) reject(err);
          else resolve(result[0]);
        });
      });

      await new Promise((resolve, reject) => {
        GameHasPlatform.delete(gamehasplatformId, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      res.redirect(
        `/gamehasplatform?lastDeletedName=${lastGameHasPlatformDeleted["Name"]}`
      );
    } catch (err) {
      return handleError(res, err.message);
    }
  },
  fillForm: async (req, res) => {
    const { gamehasplatformId } = req.body;

    res.redirect(`/gamehasplatform?updateFormId=${gamehasplatformId}`);
  },
  update: async (req, res) => {
    try {
      const { gamehasplatformId, gameId, platformId} = req.body;

      await new Promise((resolve, reject) => {
        GameHasPlatform.update(gamehasplatformId, gameId, platformId, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      res.redirect(`/gamehasplatform?lastUpdateId=${gamehasplatformId}`);
    } catch (err) {
      return handleError(res, err.message);
    }
  },
};

module.exports = GameHasPlatformController;
