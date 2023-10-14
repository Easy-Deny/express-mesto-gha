const createUser = (req, res) => {
  const userData = req.body;
  return UserModel.create(userData)
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
}

const updateUserById = (req, res) => {
  return res.status(500).send("Server Error");
}

const deleteUserById = (req, res) => {
  return res.status(500).send("Server Error");
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById
}
