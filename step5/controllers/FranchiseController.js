const Franchise = require("../models/Franchise");
const handleError = require("../errorHandler");

const FranchiseController = {
  //This is the main index
  //it will display the franchises by default
  //also its possible there could be query parameters which conditionally display different notifications about the last taken actions, delted, updated, created etc.

  index: async (req, res) => {
    try {
      //get the last inserted and deleted parameter if it exists
      const { lastInsertId, lastDeletedTitle, updateFormId, lastUpdateId } =
        req.query;

      //get and display all the franchises on first load
      const franchises = await new Promise((resolve, reject) => {
        Franchise.getAll((err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      //depending on the parameters in the url, the following values might be given to the options for the next render. They are used to conditionally render parts of the html

      let lastFranchiseCreated;
      if (lastInsertId) {
        lastFranchiseCreated = await new Promise((resolve, reject) => {
          Franchise.findById(lastInsertId, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }

      let lastFranchiseDeleted;
      if (lastDeletedTitle) {
        lastFranchiseDeleted = lastDeletedTitle;
      }

      let lastFranchiseUpdated;
      if (lastUpdateId) {
        lastFranchiseUpdated = await new Promise((resolve, reject) => {
          Franchise.findById(lastUpdateId, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }

      let updateFormFillData;
      if (updateFormId) {
        updateFormFillData = await new Promise((resolve, reject) => {
          Franchise.findById(updateFormId, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
          });
        });
      }

      //template render options
      let renderOptions = {
        franchises,
        lastFranchiseCreated,
        lastFranchiseDeleted,
        updateFormFillData,
        lastFranchiseUpdated,
      };

      res.render("franchise", renderOptions);
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occured rendering the franchise page.");
    }
  },
  add: (req, res) => {
    //a title is needed and should be given in the body
    const { title } = req.body;

    if (!title) {
      return handleError(
        res,
        "Franchise Title is required when creating a franchise."
      );
    }

    Franchise.add(title, (err, results) => {
      if (err) {
        console.log(err);
        // Redirect to an error page
        return handleError(res, err.message);
      }
      //redirect to index, but give the last created row id so it can be highlighted to the user
      res.redirect(`/franchises?lastInsertId=${results.insertId}`);
    });
  },
  delete: async (req, res) => {
    try {
      const { franchiseId } = req.body;

      if (!franchiseId) {
        return handleError(
          res,
          "The Franchise ID is required to delete a row."
        );
      }

      const lastFranchiseDeleted = await new Promise((resolve, reject) => {
        Franchise.findById(franchiseId, (err, result) => {
          if (err) reject(err);
          else resolve(result[0]);
        });
      });

      await new Promise((resolve, reject) => {
        Franchise.delete(franchiseId, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      res.redirect(
        `/franchises?lastDeletedTitle=${lastFranchiseDeleted["Title"]}`
      );
    } catch (err) {
      return handleError(res, err.message);
    }
  },
  fillForm: async (req, res) => {
    const { franchiseId } = req.body;
    if (!franchiseId){
      return handleError(res, "No franchise to update selected, please try again.");
    }
    res.redirect(`/franchises?updateFormId=${franchiseId}`);
  },
  update: async (req, res) => {
    try {
      const { franchiseId, title } = req.body;

      await new Promise((resolve, reject) => {
        Franchise.update(franchiseId, title, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      res.redirect(`/franchises?lastUpdateId=${franchiseId}`);
    } catch (err) {
      return handleError(res, err.message);
    }
  },
};

module.exports = FranchiseController;
