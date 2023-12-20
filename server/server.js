const express = require("express");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:8080", credentials: true }));

app.use("/", express.static(path.resolve(__dirname, "../build")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: false, httpOnly: true }
  })
);

app.use("/user", userRoute);

app.use((err, req, res, next) => {
  const defaultError = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error has occured." },
  };
  const errObj = Object.assign({}, defaultError, err);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => { console.log("Listening on port 3000... ShareCycle application"); });
