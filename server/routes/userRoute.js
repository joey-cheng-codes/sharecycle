const express = require("express");
const userController = require("../controllers/userController");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

router.post("/login",
  userController.verifyUser, sessionController.setSession,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.post("/signup",
  userController.createUser, sessionController.setSession,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.get("/:userId", sessionController.verifySSID, userController.getUser,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.get("/isLoggedIn", sessionController.verifySSID, (req, res) => {
  res.status(200).json(res.locals.user);

});

router.post("/signOut", sessionController.deleteSession, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;

