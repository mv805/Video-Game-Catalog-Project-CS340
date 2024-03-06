const express = require("express");
const router = express.Router();

const GameController = require("../controllers/GameController");
const FranchiseController = require("../controllers/FranchiseController");
const DeveloperController = require("../controllers/DeveloperController");
const PlatformController = require("../controllers/PlatformController");
const GameHasPlatformController = require("../controllers/GameHasPlatformController");
//game routes
router.get("/", GameController.index);
router.post("/add-game", GameController.add);
router.post("/delete-game", GameController.delete);
router.post("/fill-update-form-game", GameController.fillForm);
router.post("/update-game", GameController.update);

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
router.post("/add-platform", PlatformController.add);
router.post("/delete-platform", PlatformController.delete);
router.post("/fill-update-form-platform", PlatformController.fillForm);
router.post("/update-platform", PlatformController.update);

//gamehasplatform routes
router.get("/gamehasplatforms", GameHasPlatformController.index);
router.post("/add-gamehasplatform", GameHasPlatformController.add);
router.post("/delete-gamehasplatform", GameHasPlatformController.delete);
router.post("/fill-update-form-gamehasplatform", GameHasPlatformController.fillForm);
router.post("/update-gamehasplatform", GameHasPlatformController.update);

//for handling errors that might occur during the interactions
router.get("/error", (req, res) => {
  const message = req.query.message;
  res.render("error", { message });
});

module.exports = router;
