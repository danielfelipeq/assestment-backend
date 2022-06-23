const { Schema, model } = require('mongoose');

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Favorite',
      },
    ],
  },
  { timestamps: true }
);
const List = model('List', listSchema);
module.exports = List;
