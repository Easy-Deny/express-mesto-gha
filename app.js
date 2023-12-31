const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const errorHandler = require('./errors/error-handler');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(() => {
    console.log('Not connected to MongoDB');
  });
const app = express();
const PORT = 3000;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.use(express.json());
app.use(express.static('public'));
app.use((req, res, next) => {
  req.user = {
    _id: '652ac3e0588c4c642defffdc',
  }; next();
});
app.get('/', (req, res) => {
  const { name } = req.body;
  res.send(name);
});
//app.use(auth);
app.use(userRouter);
app.use(cardRouter);
//app.use(errorHandler);
app.all('*', (req, res) => {
  res.status(404).send({ message: '404! Page not found' });
});
app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});
