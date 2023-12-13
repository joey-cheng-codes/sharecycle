const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// router.get('/',
//   (req, res) => {
//     res.status(200).json({})
//   }
// );

router.post("/login",
  userController.verifyUser,
  (req, res) => {
    res.status(200).json(res.locals.login);
  }
);

router.post("/signup",
  userController.createUser,
  (req, res) => {
    res.status(200).json(res.locals.signup);
  }
);

router.post("/item", userController.addItem, (req, res) => {
  res.status(200).json(res.locals.item);
});


module.exports = router;
