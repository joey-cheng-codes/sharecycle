const sessionController = {};

sessionController.setSession = (req, res, next) => {
  if (!res.locals.user) {
    return next({
      log: "Error caught on sessionController.setSession controller",
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

sessionController.getCookie = (req, res, next) => {
  const cookieValue = req.session.ssid;
  if (!cookieValue) {
    return next({
      log: "Error caught on sessionController.getCookie controller",
      status: 500,
      message: { err: "An error has occured." }
    });
  }
  return next();
};


module.exports = sessionController;
