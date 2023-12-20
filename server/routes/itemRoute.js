const express = require("express");
const sessionController = require("../controllers/sessionController");
const itemController = require("../controllers/itemController");

const router = express.Router();

router.post("/",
  sessionController.verifySSID,
  itemController.addItem, (req, res) => {
    res.status(200).json(res.locals.item);
  });

module.exports = router;
