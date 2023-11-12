const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validation: {
      validator(validateEmail) {
        return validator.isEmail(validateEmail);
      },
      message: 'неверно введен email',
    }
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('user', userSchema);
