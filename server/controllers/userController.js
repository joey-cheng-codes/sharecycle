const { PrismaClient } = require("@prisma/client");
const userController = {};

const prisma = new PrismaClient();

userController.createUser = async (req, res, next) => {

  if (req.body.firstName.length && req.body.lastName.length && req.body.email.length && req.body.username.length && req.body.password.length) {
    try {
      const { firstName, lastName, nickname, email, username, password, profileImageUrl } = req.body;
      const signup = await prisma.user.create({
        data: {
          firstName,
          lastName,
          nickname,
          username,
          email,
          password,
          profileImageUrl
        }
      });
      res.locals.signup = signup;
      return next();
    }
    catch (err) {
      return next(err);
    }
  }
};


userController.verifyUser = async (req, res, next) => {
  console.log("***** inside the verify user");
  if (req.body.email.length && req.body.password.length) {
    console.log(req.body.email, req.body.password);
    try {
      const { email, password } = req.body;
      const login = await prisma.user.findUnique({
        where: {
          email,
          password
        }
      });
      console.log("login response", login);
      res.locals.login = login;
      return next();
    }
    catch (err) {
      return next(err);
    }
  }
};

userController.addItem = async (req, res, next) => {
  console.log("Received a request to add an item:", req.body);
  if (req.body.itemName && req.body.description && req.body.loanDurationDays && req.body.categories.length) {
    try {
      const { itemName, description, loanDurationDays, categories, imageUrl } = req.body;
      const item = await prisma.Item.create({
        data: {
          itemName,
          description,
          categories,
          imageUrl,
          loanDurationDays
        }
      });
      console.log(item, "item response*****");
      res.locals.item = item;
      return next();
    }
    catch (err) {
      // return next(err);
      console.error("Error adding item:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ error: "Missing required fields" });
  }
};
module.exports = userController;
