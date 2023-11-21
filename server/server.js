const express = require('express');
const userRoute = require('./routes/userRoute');
const app = express();
const path = require('path');
const cors = require('cors');
const { error } = require('console');
const PORT = 3000;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', express.static(path.resolve(__dirname, '../build')));



app.post('/signup', userRoute);

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error has occured.' },
  }
  const errObj = Object.assign({}, defaultError, err);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => { console.log('Listening on port 3000... a new life application') });