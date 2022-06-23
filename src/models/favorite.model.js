const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  link: {
    type: String,
    required: [true, 'Link is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
});
const Favorite = model('Favorite', favoriteSchema);
module.exports = Favorite;
