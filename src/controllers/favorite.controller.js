const Favorite = require('../models/favorite.model');
const List = require('../models/listFavorites.model');
const User = require('../models/user.model');
const { getUserFromToken } = require('../middlewares/validate-jwt');
const { destroy } = require('./listFavorites.controller');

module.exports = {
  // create a new favorite, add to list, verify favorite belongs to user
  async create(req, res) {
    try {
      // get user from header token decoded
      const decode = getUserFromToken(req, res);
      const user = await User.findById(decode._id);
      // get list by id from body
      const list = await List.findById(req.body.list);
      // verify list belongs to user
      if (list.user.toString() !== user._id.toString()) {
        return res.status(401).json({
          message: 'List does not belong to user',
        });
      }
      // create new favorite
      const newFavorite = await Favorite.create({
        ...req.body,
        user: user._id,
        list: list._id,
      });
      // add new favorite to list's favorites
      list.favorites.push(newFavorite._id);
      await list.save();
      res.status(200).json({
        message: 'Favorite created successfully',
        data: newFavorite,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error creating favorite',
        data: err,
      });
    }
  },
  // get all favorites for a list
  async list(req, res) {
    try {
      // get user from header token decoded
      const decode = getUserFromToken(req, res);
      const user = await User.findById(decode._id);
      // get list by id
      const { listFavorite } = req.params;
      const list = await List.findById(listFavorite);
      console.log(list);
      // verify list belongs to user
      if (list.user.toString() !== user._id.toString()) {
        return res.status(401).json({
          message: 'List does not belong to user',
        });
      }
      // get all favorites for list
      const favorites = await Favorite.find({ list: list._id })
        .populate('_id', 'title description link')
        .select('_id title description link');
      res.status(200).json({
        message: 'Favorites retrieved successfully',
        data: favorites,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error retrieving favorites',
        data: err,
      });
    }
  },
  // get a favorite by id for a list
  async show(req, res) {
    try {
      // get user from header token decoded
      const decode = getUserFromToken(req, res);
      const user = await User.findById(decode._id);
      // get list by id
      const { idFav } = req.params;
      const favorite = await Favorite.findById(idFav);
      // verify list belongs to user
      if (favorite.user.toString() !== user._id.toString()) {
        return res.status(401).json({
          message: 'Favorite does not belong to user',
        });
      }
      res.status(200).json({
        message: 'Favorite retrieved successfully',
        data: favorite,
      });
    } catch (err) {
      res.status(400).json({
        message: 'Error retrieving favorite',
        data: err,
      });
    }
  },
  // update a favorite by id for a list
  async update(req, res) {
    try {
      // get user from header token decoded
      const decode = getUserFromToken(req, res);
      const user = await User.findById(decode._id);
      // get favorite by id
      const { idFav } = req.params;
      const favorite = await Favorite.findById(idFav);
      // verify list belongs to user
      if (favorite.user.toString() !== user._id.toString()) {
        return res.status(401).json({
          message: 'List does not belong to user',
        });
      }
      // update favorite
      await favorite.updateOne({ ...req.body });
      res.status(200).json({
        message: 'Favorite updated successfully',
        data: favorite,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: 'Error updating favorite',
        data: err,
      });
    }
  },
  // delete a favorite by id for a list
  async destroy(req, res) {
    try {
      // get user from header token decoded
      const decode = getUserFromToken(req, res);
      const user = await User.findById(decode._id);
      // get favorite by id
      const { idFav } = req.params;
      const favorite = await Favorite.findById(idFav);
      console.log(favorite);
      // verify list belongs to user
      if (favorite.user.toString() !== user._id.toString()) {
        return res.status(401).json({
          message: 'Favorite does not belong to user',
        });
      }
      // delete favorite
      await favorite.remove();
      res.status(200).json({
        message: 'Favorite deleted successfully',
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: 'Error deleting favorite',
        data: err,
      });
    }
  },
};
