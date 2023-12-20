const sessionController = {};

sessionController.isLoggedIn = function (req, res, next) {
  if (!res.locals.user) {
    return next({
      log: "Error caught on sessionController.isLoggedIn controller",
      status: 500,
      message: { err: "An error has occured." }
    });
  }

  //   req.session.isLoggedIn = true;
  //   return next();
  // }
  // else {
  const userId = res.locals.user.id;
  res.session("ssid", userId);
  return next();
  // return res.redirect(302, "/user/signup");
  // }
};

module.exports = sessionController;
