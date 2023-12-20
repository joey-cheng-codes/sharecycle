const cookieController = {};

cookieController.setCookie = function (req, res, next) {
  if (!res.locals.user) {
    return next({
      log: "Error caught on cookieController.setCookie controller",
      status: 500,
      message: { err: "An error has occured." }
    });
  }
  const userId = res.locals.user.id;
  res.cookie("ssid", userId,);
  return next();
};

cookieController.getCookie = (req, res, next) => {
  const cookieValue = req.cookies.ssid;
  if (!cookieValue) {
    return next({
      log: "Error caught on cookieController.getCookie controller",
      status: 500,
      message: { err: "An error has occured." }
    });
  }
  return next();
};

module.exports = cookieController;
