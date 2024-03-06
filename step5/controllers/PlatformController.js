const Platform = require("../models/Platform");
const handleError = require("../errorHandler");

const PlatformController = {
  //This is the main index
  //it will display the platforms by default
  //also its possible there could be query parameters which conditionally display different notifications about the last taken actions, delted, updated, created etc.

  index: async (req, res) => {
    try {
      //get the last inserted and deleted parameter if it exists
      const { lastInsertId, lastDeletedName, updateFormId, lastUpdateId } =
        req.query;

      //get and display all the platforms on first load
      const platforms = await new Promise((resolve, reject) => {
        Platform.getAll((err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      //depending on the parameters in the url, the following values might be given to the options for the next render. They are used to conditionally render parts of the html

      let lastPlatformCreated;
      if (lastInsertId) {
        lastPlatformCreated = await new Promise((resolve, reject) => {
          Platform.findById(lastInsertId, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }

      let lastPlatformDeleted;
      if (lastDeletedName) {
        lastPlatformDeleted = lastDeletedName;
      }

      let lastPlatformUpdated;
      if (lastUpdateId) {
        lastPlatformUpdated = await new Promise((resolve, reject) => {
          Platform.findById(lastUpdateId, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }

      let updateFormFillData;
      if (updateFormId) {
        updateFormFillData = await new Promise((resolve, reject) => {
          Platform.findById(updateFormId, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
          });
        });
      }

      //template render options
      let renderOptions = {
        platforms,
        lastPlatformCreated,
        lastPlatformDeleted,
        updateFormFillData,
        lastPlatformUpdated,
      };

      res.render("platform", renderOptions);
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occured rendering the platform page.");
    }
  },
  add: (req, res) => {
    //a name is needed and should be given in the body
    const { name } = req.body;

    if (!name) {
      return handleError(
        res,
        "Platform Name is required when creating a platform."
      );
    }

    Platform.add(name, (err, results) => {
      if (err) {
        console.log(err);
        // Redirect to an error page
        return handleError(res, err.message);
      }
      //redirect to index, but give the last created row id so it can be highlighted to the user
      res.redirect(`/platforms?lastInsertId=${results.insertId}`);
    });
  },
  delete: async (req, res) => {
    try {
      const { platformId } = req.body;

      if (!platformId) {
        return handleError(
          res,
          "The Platform ID is required to delete a row."
        );
      }

      const lastPlatformDeleted = await new Promise((resolve, reject) => {
        Platform.findById(platformId, (err, result) => {
          if (err) reject(err);
          else resolve(result[0]);
        });
      });

      await new Promise((resolve, reject) => {
        Platform.delete(platformId, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      res.redirect(
        `/platforms?lastDeletedName=${lastPlatformDeleted["Name"]}`
      );
    } catch (err) {
      return handleError(res, err.message);
    }
  },
  fillForm: async (req, res) => {
    const { platformId } = req.body;

    res.redirect(`/platforms?updateFormId=${platformId}`);
  },
  update: async (req, res) => {
    try {
      const { platformId, name } = req.body;

      await new Promise((resolve, reject) => {
        Platform.update(platformId, name, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      res.redirect(`/platforms?lastUpdateId=${platformId}`);
    } catch (err) {
      return handleError(res, err.message);
    }
  },
};

module.exports = PlatformController;
