const express = require("express");
const userController = require("../controllers/userController");
const cookieController = require("../controllers/cookieController");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

// router.get('/',
//   (req, res) => {
//     res.status(200).json({})
//   }
// );

router.post("/login",
  userController.verifyUser, cookieController.setCookie, sessionController.isLoggedIn,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.post("/signup",
  userController.createUser,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.post("/item", userController.addItem, (req, res) => {
  res.status(200).json(res.locals.item);
});


module.exports = router;
