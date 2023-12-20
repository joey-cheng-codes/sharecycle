const sessionController = {};

sessionController.isLoggedIn = function (req, res, next) {
  if (req.cookies.ssid) {
    req.session.isLoggedIn = true;
    return next();
  }
  else {
    return res.redirect(302, "/user/signup");
  }
};

module.exports = sessionController;
