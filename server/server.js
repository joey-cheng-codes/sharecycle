const express = require("express");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const path = require("path");
const cors = require("cors");
const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/", express.static(path.resolve(__dirname, "../build")));

// app.get('/foobar', (req, res) => {
//   console.log('I am in the get request');
//   res.sendStatus(200);
// })
app.get("/set-cookie", (req, res) => {
  // Set a test cookie
  res.cookie("testCookie", "123");
  res.status(200).json({ message: "Cookie set successfully" });
});


app.use("/user", userRoute);

app.use((err, req, res) => {
  const defaultError = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error has occured." },
  };
  const errObj = Object.assign({}, defaultError, err);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => { console.log("Listening on port 3000... ShareCycle application"); });
