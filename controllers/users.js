const UserModel = require('../models/user');
const _id = "652ac3e0588c4c642defffdc";

const createUser = (req, res) => {
  const userData = req.body;
  return UserModel.create(userData)
    .then((data) => {
      return res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({message:`Incorrect user info error: ${err.name}: ${err.message}`});
      }
      return res.status(500).send("Server Error");
    });
}

const getUsers = (req, res) => {
  UserModel.find()
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch((err) => {
      return res.status(500).send("Server Error");
    });
}

const getUserById = (req, res) => {
  UserModel.findById(req.params.userId)
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
}

const updateUserById = (req, res) => {
  const {userData} = req.body;
    return UserModel.findByIdAndUpdate(_id, { userData }, {new: true})
      .then((data) => {
        return res.status(201).send(data);
      })
      .catch((err) => {
        console.log(err);
        if (err.name === "ValidationError") {
          return res.status(400).send(err.message);
        }
        return res.status(500).send("Server Error");
      });
}

const updateUserAvatarById = (req, res) => {
  const userData = req.body;
    return UserModel.findByIdAndUpdate(_id, {avatar: userData.avatar}, {new: true})
      .then((data) => {
        return res.status(201).send(data);
      })
      .catch((err) => {
        console.log(err);
        if (err.name === "ValidationError") {
          return res.status(400).send(err.message);
        }
        return res.status(500).send("Server Error");
      });
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  updateUserAvatarById
}
