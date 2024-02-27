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
  //   add: (req, res) => {
  //     const { name, email, gender } = req.body;
  //     Customer.add(name, email, gender, (err, results) => {
  //       if (err) throw err;
  //       res.redirect("/");
  //     });
  //   },
  //   find: (req, res) => {
  //     const id = req.query.id;
  //     Customer.find(id, (err, result) => {
  //       if (err) throw err;
  //       const foundUser = result[0];
  //       Customer.getAll((err, allCustomers) => {
  //         if (err) throw err;
  //         res.render("index", { user: foundUser, data: allCustomers });
  //       });
  //     });
  //   },
  //   update: (req, res) => {
  //     const { id, field, value } = req.body;
  //     Customer.update(id, field, value, (err, result) => {
  //       if (err) throw err;
  //       res.redirect("/");
  //     });
  //   },
  //   delete: (req, res) => {
  //     const id = req.body.id;
  //     Customer.delete(id, (err, result) => {
  //       if (err) throw err;
  //       res.redirect("/");
  //     });
  //   },
};

module.exports = GameController;
