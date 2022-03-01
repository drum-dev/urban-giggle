const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema({
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
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    points: {
        type: Number,
        default: 10, // start out with ten points!
        required: true,
        min: [0, "You are out of points -- find hunt items and complete scavenger hunts to obtain more!"],
    },
    completedHunts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Hunt',
        }
    ],
    foundHuntItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'HuntItem',
        },
    ],
    badges: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Badge',
        },
    ],
    favoriteHunts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Hunt',
        }
    ],
    favoriteHuntItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'HuntItem',
        },
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const User = model('User', userSchema);

module.exports = User;
