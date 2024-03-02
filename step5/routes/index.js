const express = require("express");
const router = express.Router();

const GameController = require("../controllers/GameController");
const FranchiseController = require("../controllers/FranchiseController");
const DeveloperController = require("../controllers/DeveloperController");
const PlatformController = require("../controllers/PlatformController");

//game routes
router.get("/", GameController.index);
router.get("/search-games", GameController.find);

//franchises routes
router.get("/franchises", FranchiseController.index);
router.post("/add-franchise", FranchiseController.add);
router.post("/delete-franchise", FranchiseController.delete);
router.post("/fill-update-form-franchise", FranchiseController.fillForm);
router.post("/update-franchise", FranchiseController.update);

//developer routes
router.get("/developers", DeveloperController.index);
router.post("/add-developer", DeveloperController.add);
router.post("/delete-developer", DeveloperController.delete);
router.post("/fill-update-form-developer", DeveloperController.fillForm);
router.post("/update-developer", DeveloperController.update);
//platform routes
router.get("/platforms", PlatformController.index);

//for handling errors that might occur during the interactions
router.get("/error", (req, res) => {
  const message = req.query.message;
  res.render("error", { message });
});

module.exports = router;
