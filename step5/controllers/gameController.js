const Game = require("../models/Game");
const handleError = require("../errorHandler");

const GameController = {
  index: (req, res) => {
    Game.getAll((err, results) => {
      if (err) {
        return handleError(res, err.message);
      }
      res.render("game", { games: results });
    });
  },
  find: (req, res) => {
    const { title, developer, franchise, platform } = req.query;

    let termToFind;
    let searchInputTerm;

    if (title) {
      termToFind = "title";
      searchInputTerm = title;
    } else if (developer) {
      termToFind = "developer";
      searchInputTerm = developer;
    } else if (franchise) {
      termToFind = "franchise";
      searchInputTerm = franchise;
    } else if (platform) {
      termToFind = "platform";
      searchInputTerm = platform;
    } else {
      res.status(400).send("No search term provided");
      return;
    }

    Game.find(termToFind, searchInputTerm, (err, results) => {
      if (err) {
        return handleError(res, err.message);
      }
      res.redirect("/");
    });
  },

};

module.exports = GameController;
