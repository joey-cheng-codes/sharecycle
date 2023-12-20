const sessionController = {};

sessionController.setSession = (req, res, next) => {
  if (!res.locals.user) {
    return next({
      log: "Error caught on sessionController.setSession controller",
      status: 500,
      message: { err: "An error has occured." }
    });
  }
  const userId = res.locals.user.id;
  req.session.ssid = userId;
  return next();
};

sessionController.verifySSID = (req, res, next) => {
  const cookieValue = req.session.ssid;
  if (!cookieValue) {
    return next({
      log: "Error caught on sessionController.verifySSID controller",
      status: 500,
      message: { err: "An error has occured." }
    });
  }
  return next();
};

module.exports = sessionController;
