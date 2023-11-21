const { PrismaClient } = require('@prisma/client');
const userController = {};

const prisma = new PrismaClient();

userController.createUser = async (req, res, next) => {
  if (req.body.firstName.length && req.body.lastName.length && req.body.email.length && req.body.username.length && req.body.password.length) {
    try {
      const { firstName, lastName, nickname, email, username, password, profileImageUrl } = req.body;
      const signup = await prisma.post.create({
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
      console.log(res.json(signup), 'am i getting sign up data????')
      res.locals.signup = res.json(signup);
      return next();
    }
    catch (err) {
      return next(er)
    }
  }
};


// userController.verifyUser = async (req, res, next) => {

// };

module.exports = userController;