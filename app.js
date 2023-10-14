const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/user');
const createUser = require('./controllers/users');
const getUser = require('./controllers/users');
const getUserById = require('./controllers/users');
const updateUserById = require('./controllers/users');
const deleteUserById = require('./controllers/users');

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

app.post('/users', (req, res) => {
  const userData = req.body;
  return UserModel.create(userData)
    .then((data) =>  {
      return res.status(201).send(data);
})
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(400).send(err.message);
      }
      return res.status(500).send("Server Error");
    });
});

app.get('/users', (req, res) => {
  UserModel.find()
  .then((users) => {
    return res.status(200).send(users);
  })
  .catch((err) => {
    return res.status(500).send("Server Error");
  });
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  UserModel.findById(id)
  .then((user) => {
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send(user);
  })
  .catch((err) => {
    console.log(err);
    if (err.name === "CastError") {
      return res.status(400).send("Invalid Id");
    }
    return res.status(500).send("Server Error");
  });
})
