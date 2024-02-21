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
      status: 401,
      message: { err: "An error has occured. You don't have permission to be here." }
    });
  }
  return next();
};

sessionController.deleteSession = (req, res, next) => {
  req.session.destroy();
  return next();
};

module.exports = sessionController;
