const express = require("express");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const itemRoute = require("./routes/itemRoute");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const PORT = 3000;

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:8080", credentials: true }));

app.use("/", express.static(path.resolve(__dirname, "../build")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000, secure: false, httpOnly: true
    }
  })
);

app.use("/api/user", userRoute);
app.use("/api/item", itemRoute);


app.use((err, req, res, next) => {
  const defaultError = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error has occured." },
  };
  const errObj = Object.assign({}, defaultError, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => { console.log("Listening on port 3000... ShareCycle application"); });
