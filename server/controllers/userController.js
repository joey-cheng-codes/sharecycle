const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const userController = {};

const prisma = new PrismaClient();

userController.createUser = async (req, res, next) => {

  if (req.body.firstName && req.body.lastName && req.body.email && req.body.username && req.body.password) {
    try {
      const { firstName, lastName, nickname, email, username, password, profileImageUrl } = req.body;
      // let hashedPassword = "";
      // bcrypt.genSalt(saltRounds, function (err, salt) {
      //   if (err) {
      //     throw err;
      //   }
      //   bcrypt.hash(password, salt, function (err, hash) {
      //     if (err) {
      //       throw err;
      //     }
      //     hashedPassword = hash;
      //   });
      // });

      // Generate salt asynchronously
      const salt = bcrypt.genSaltSync(saltRounds);

      // Hash the password synchronously
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          nickname,
          username,
          email,
          password: hashedPassword,
          profileImageUrl
        }
      });
      res.locals.user = user;
      return next();
    }
    catch (err) {
      return next(err);
    }
  }
  else {
    return res.status(400).json({ error: "Missing required fields" });
  }
};


userController.verifyUser = async (req, res, next) => {
  console.log("***** inside the verify user");
  if (req.body.email && req.body.password) {
    console.log(req.body.email, req.body.password);
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email,
          password
        }
      });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      console.log("login response", user);
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          throw err;
        }
        if (result) {
          res.locals.user = user;
          return next();
        }
      });

    }
    catch (err) {
      return next(err);
    }
  }
  else {
    return res.status(400).json({ error: "Missing required fields" });
  }
};

module.exports = userController;
