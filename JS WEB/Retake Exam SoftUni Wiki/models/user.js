const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let UserSchema = new mongoose.Schema({
    username:
    {
        type: String, 
        unique: true,
        required: [true, "Can't be blank"], index: true
    },
    password: {
        type: String,
        required: [true, "Can't be blank"], index: true
    },
    createdArticles:
    [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article'
    }]
});

UserSchema.methods={
    matchPassword:function(password){
        return bcrypt.compare(password,this.password)
    }
}
UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) { next(err); return; }
        bcrypt.hash(this.password, salt, (err, hash) => {
          if (err) { next(err); return; }
          this.password = hash;
          next();
        });
      });
      return;
    }
    next();
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;