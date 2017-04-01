const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema();

UserSchema.add({
  firstName: {
    type: String,
    required: true,
    unique: false
  },
  lastName: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  token: {
    access: {
      type: String
    },
    token: {
      type: String
    }
  },
  trips: [{
    type: Schema.Types.ObjectId,
    ref: 'Trip'
  }]
});

var User = mongoose.model('User', UserSchema);
