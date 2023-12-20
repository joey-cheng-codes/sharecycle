const express = require("express");
const userController = require("../controllers/userController");
// const cookieController = require("../controllers/cookieController");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

router.post("/login",
  userController.verifyUser, sessionController.isLoggedIn,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.post("/signup",
  userController.createUser, sessionController.isLoggedIn,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

module.exports = router;
