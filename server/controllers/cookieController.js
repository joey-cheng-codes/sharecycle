const cookieController = {};

cookieController.setCookie = function (req, res, next) {
  if (!res.locals.user) {
    return next({
      log: "Error cauhgt on cookieController.setCookie controller",
      status: 500,
      message: { err: "An error has occured." }
    });
  }
  res.cookie("ssid", res.locals.user, { httpOnly: true });
};

module.exports = cookieController;
