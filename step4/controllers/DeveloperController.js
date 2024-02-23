const Developer = require("../models/Developer");

const DeveloperController = {
  index: async (req, res) => {
    try {
      //get and display all the developers on first load
      const developers = await new Promise((resolve, reject) => {
        Developer.getAll((err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      //template render options
      let renderOptions = {
        developers,
      };

      res.render("developer", renderOptions);
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occured rendering the developer page.");
    }
  },
};

module.exports = DeveloperController;
