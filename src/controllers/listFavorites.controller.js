const List = require('../models/listFavorites.model');
const User = require('../models/user.model');
const Favorite = require('../models/favorite.model');
const jwt = require('jsonwebtoken');
const { getUserFromToken } = require('../middlewares/validate-jwt');
const { path } = require('../../app');

module.exports = {
  // create a new list for a user
  async create(req, res) {
    try {
      // get user from header token decoded
      const decode = getUserFromToken(req, res);
      const user = await User.findById(decode._id);
      // create new list
      const newList = await List.create({
        ...req.body,
        user: user._id,
      });
      // add new list to user's lists
      user.lists.push(newList._id);
      await user.save();
      res.status(200).json({
        message: 'List created successfully',
        data: newList,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error creating list',
        data: err,
      });
    }
  },
  // get all lists ids for a user
  async list(req, res) {
    try {
      // get user from header token decoded
      const decode = getUserFromToken(req, res);
      const user = await User.findById(decode._id);
      // get all ids for user's lists with favorites
      const lists = await List.find({ user: user._id })
        .populate('_id name favorites', '_id title description link')
        .select('_id title description');
      res.status(200).json({
        message: 'Lists retrieved successfully',
        data: lists,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: 'Error retrieving lists',
        data: err,
      });
    }
  },
  // get a list by id for a user
  async show(req, res) {
    try {
      // get user from header token decoded
      const decode = getUserFromToken(req, res);
      const user = await User.findById(decode._id);
      // get list by id
      const list = await List.findById(req.params.id);
      // verify list belongs to user
      if (list.user.toString() !== user._id.toString()) {
        return res
          .status(400)
          .json({ message: 'List does not belong to user' });
      }
      // get list's favorites
      const favorites = await Favorite.find({ list: list._id })
        .populate('_id title description link')
        .select('_id title description link');
      res.status(200).json({
        message: 'List retrieved successfully',
        data: { list, favorites },
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error retrieving list',
        data: err,
      });
    }
  },
  // update a list by id for a user
  async update(req, res) {
    try {
      // get user from header token decoded
      const decode = getUserFromToken(req, res);
      const user = await User.findById(decode._id);
      // get list by id
      const list = await List.findById(req.params.id);
      // verify list belongs to user
      if (list.user.toString() !== user._id.toString()) {
        return res
          .status(400)
          .json({ message: 'List does not belong to user' });
      }
      // update list
      await list.updateOne({ ...req.body });
      res.status(200).json({
        message: 'List updated successfully',
        data: list,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error updating list',
        data: err,
      });
    }
  },
  // delete a list and all its favorites by id for a user
  async destroy(req, res) {
    try {
      // get user from header token decoded
      const decode = getUserFromToken(req, res);
      const user = await User.findById(decode._id);
      // get list by id
      const list = await List.findById(req.params.id);
      // verify list belongs to user
      if (list.user.toString() !== user._id.toString()) {
        return res
          .status(400)
          .json({ message: 'List does not belong to user' });
      }
      // remove list from user's lists
      user.lists.pull(list._id);
      await user.save();
      // remove list's favorites
      await Favorite.deleteMany({ list: list._id });
      // remove list
      await list.remove();
      res.status(200).json({
        message: 'List deleted successfully',
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error deleting list',
        data: err,
      });
    }
  },
};
