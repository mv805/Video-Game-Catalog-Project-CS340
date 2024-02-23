const Platform = require("../models/Platform");

const PlatformController = {
  index: async (req, res) => {
    try {
      //get and display all the game platforms on first load
      const platforms = await new Promise((resolve, reject) => {
        Platform.getAll((err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      //template render options
      let renderOptions = {
        platforms,
      };

      res.render("platform", renderOptions);
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occured rendering the platform page.");
    }
  },
};

module.exports = PlatformController;
