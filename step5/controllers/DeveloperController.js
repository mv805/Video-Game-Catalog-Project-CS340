const Developer = require("../models/Developer");
const handleError = require("../errorHandler");

const DeveloperController = {
  //This is the main index

  index: async (req, res) => {
    try {
      //get the last inserted and deleted parameter if it exists
      const { lastInsertId, lastDeletedName, updateFormId, lastUpdateId } =
        req.query;

      //get and display all the developers on first load
      const developers = await new Promise((resolve, reject) => {
        Developer.getAll((err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      //depending on the parameters in the url, the following values might be given to the options for the next render. They are used to conditionally render parts of the html

      let lastDeveloperCreated;
      if (lastInsertId) {
        lastDeveloperCreated = await new Promise((resolve, reject) => {
          Developer.findById(lastInsertId, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }

      let lastDeveloperDeleted;
      if (lastDeletedName) {
        lastDeveloperDeleted = lastDeletedName;
      }

      let lastDeveloperUpdated;
      if (lastUpdateId) {
        lastDeveloperUpdated = await new Promise((resolve, reject) => {
          Developer.findById(lastUpdateId, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }

      let updateFormFillData;
      if (updateFormId) {
        updateFormFillData = await new Promise((resolve, reject) => {
          Developer.findById(updateFormId, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
          });
        });
      }

      //template render options
      let renderOptions = {
        developers,
        lastDeveloperCreated,
        lastDeveloperDeleted,
        updateFormFillData,
        lastDeveloperUpdated,
      };

      res.render("developer", renderOptions);
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occured rendering the developer page.");
    }
  },
  add: (req, res) => {
    //a name is needed and should be given in the body
    const { name } = req.body;

    if (!name) {
      return handleError(
        res,
        "Developer Name is required when creating a developer."
      );
    }

    Developer.add(name, (err, results) => {
      if (err) {
        console.log(err);
        // Redirect to an error page
        return handleError(res, err.message);
      }
      //redirect to index, but give the last created row id so it can be highlighted to the user
      res.redirect(`/developers?lastInsertId=${results.insertId}`);
    });
  },
  delete: async (req, res) => {
    try {
      const { developerId } = req.body;

      if (!developerId) {
        return handleError(
          res,
          "The Developer ID is required to delete a row."
        );
      }

      const lastDeveloperDeleted = await new Promise((resolve, reject) => {
        Developer.findById(developerId, (err, result) => {
          console.log(result);
          if (err) reject(err);
          else resolve(result[0]);
        });
      });

      await new Promise((resolve, reject) => {
        Developer.delete(developerId, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      res.redirect(
        `/developers?lastDeletedName=${lastDeveloperDeleted["Name"]}`
      );
    } catch (err) {
      return handleError(res, err.message);
    }
  },
  fillForm: async (req, res) => {
    const { developerId } = req.body;

    if (!developerId) {
      return handleError(
        res,
        "The Developer ID is required to fill in the update data."
      );
    }

    res.redirect(`/developers?updateFormId=${developerId}`);
  },
  update: async (req, res) => {
    try {
      const { developerId, name } = req.body;

      await new Promise((resolve, reject) => {
        Developer.update(developerId, name, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      res.redirect(`/developers?lastUpdateId=${developerId}`);
    } catch (err) {
      return handleError(err, err.message);
    }
  },
};

module.exports = DeveloperController;
