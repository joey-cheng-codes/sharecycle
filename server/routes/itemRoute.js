const express = require("express");
const cookieController = require("../controllers/cookieController");
const itemController = require("../controllers/itemController");

const router = express.Router();

router.post("/", cookieController.getCookie, itemController.addItem, (req, res) => {
  res.status(200).json(res.locals.item);
});

module.exports = router;
