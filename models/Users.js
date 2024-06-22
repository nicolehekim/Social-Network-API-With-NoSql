const { Schema, Types, model } = require('mongoose');

const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
        }
      }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

usersSchema.virtual('friendCount').get(function(){
  return this.friends.length;
});

const Users = model('Users', usersSchema);

module.exports = Users;
