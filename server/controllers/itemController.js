const { PrismaClient } = require("@prisma/client");
const itemController = {};
const prisma = new PrismaClient();

itemController.addItem = async (req, res, next) => {
  console.log(req.cookies.ssid, "will i get this info??");
  console.log("Received a request to add an item:", req.body);
  if (req.body.itemName && req.body.description && req.body.loanDurationDays && req.body.categories.length) {
    try {

      const { itemName, description, loanDurationDays, categories, imageUrl } = req.body;
      const item = await prisma.Item.create({
        data: {
          itemName,
          description,
          categories,
          imageUrl,
          loanDurationDays,
          userId: Number(req.cookies.ssid)
        }
      });
      console.log(item, "item response*****");
      res.locals.item = item;
      return next();
    }
    catch (err) {
      // return next(err);
      console.error("Error adding item:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ error: "Missing required fields" });
  }
};

module.exports = itemController;
