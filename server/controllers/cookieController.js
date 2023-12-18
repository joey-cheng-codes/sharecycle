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
  console.log(userId, "will i get the id back???");
  res.cookie("ssid", userId,);
  return next();
};

module.exports = cookieController;
