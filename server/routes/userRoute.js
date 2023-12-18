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

// router.get("/set-cookie", (req, res) => {
//   // Set a test cookie
//   res.cookie("testCookie", "123");
//   res.status(200).json({ message: "Cookie set successfully" });
// });

router.post("/login",
  userController.verifyUser, cookieController.setCookie,
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
