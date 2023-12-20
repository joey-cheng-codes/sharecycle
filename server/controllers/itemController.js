const { PrismaClient } = require("@prisma/client");
const itemController = {};
const prisma = new PrismaClient();

itemController.addItem = async (req, res, next) => {
  if (req.body.itemName && req.body.description && req.body.loanDurationDays && req.body.categories.length) {
    try {
      const { itemName, description, loanDurationDays, categories, imageUrl } = req.body;
      const item = await prisma.Item.create({
        data: {
          itemName,
          description,
          categories: {
            create: categories
          },
          imageUrl,
          loanDurationDays,
          userId: Number(req.session.ssid)
        }
      });
      res.locals.item = item;
      return next();
    }
    catch (err) {
      return next({
        log: `${err}, Error caught on itemController.addItem controller`,
        status: 500,
        message: { err: "Error adding item." }
      });
    }
  } else {
    return next({
      log: "Error caught on itemController.addItem controller",
      status: 400,
      message: { err: "Missing required fields." }
    });
  }
};

module.exports = itemController;
