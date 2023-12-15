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
  userController.verifyUser,
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


module.exports = router;
