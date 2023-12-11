const { PrismaClient } = require('@prisma/client');
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
      })
      res.locals.signup = signup;
      return next();
    }
    catch (err) {
      return next(err)
    }
  }
};


userController.verifyUser = async (req, res, next) => {
  console.log('***** inside the verify user')
  if (req.body.email.length && req.body.password.length) {
    console.log(req.body.email, req.body.password)
    try {
      const { email, password } = req.body;
      const login = await prisma.user.findUnique({
        where: {
          email,
          password
        }
      })
      console.log('login response', login)
      res.locals.login = login;
      return next();
    }
    catch (err) {
      return next(err)
    }
  }
};

module.exports = userController;