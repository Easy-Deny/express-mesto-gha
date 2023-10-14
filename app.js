const express = require('express');
const mongoose = require('mongoose');

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
app.use(express.json());
app.use(express.static('public'));
app.get('/', (req, res) => {
  const { name } = req.body;
  res.send(name);
});
app.post('/post', (req, res) => {
  const { name } = req.body;

  res.status(201).send(name);
});
app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});
