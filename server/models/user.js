const {
  encryptPassword
} = require('../helpers');
const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  role: String,
  email: {
    type: String,
    validate: [{
        validator: function (value) {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(value);
        },
        message: props => `${props.value} is not a valid email input.`
      },
      {
        validator: function (value) {
          return new Promise((resolve, reject) => {
              userModel.findOne({
                email: value
              }, function (err, data) {
                if (data) {
                  resolve(false);
                } else {
                  resolve(true);
                }
              })
            })
            .catch((err) => {
              reject(err);
            });
        },
        message: props => `there is already an account registered with email: ${props.value}. Please enter another email`
      }
    ]
  },
  password: String
});

userSchema.pre('save', function (next) {
  this.password = encryptPassword(this.password);
  console.log(this.password);

  next();
});

let userModel = mongoose.model('User', userSchema);

module.exports = userModel;