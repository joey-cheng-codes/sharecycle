const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const userController = {};

const prisma = new PrismaClient();

userController.createUser = async (req, res, next) => {

  if (req.body.firstName && req.body.lastName && req.body.email && req.body.username && req.body.password) {
    try {
      const { firstName, lastName, nickname, email, username, password, profileImageUrl } = req.body;
      // // Generate salt asynchronously
      const salt = await bcrypt.genSaltSync(saltRounds);

      // // Hash the password synchronously
      const hashedPassword = await bcrypt.hashSync(password, salt);

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
  if (req.body.email && req.body.password) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email,
        }
      });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.locals.user = user;
        return next();
      }
      else {
        return res.status(401).json({ error: "Bad password" });
      }
    }
    catch (err) {
      return next(err);
    }
  }
  else {
    return res.status(400).json({ error: "Missing required fields" });
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
