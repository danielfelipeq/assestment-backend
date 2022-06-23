const router = require('express').Router();
const {
  create,
  list,
  show,
  update,
  destroy,
} = require('../controllers/favorite.controller');
const { validateJwt } = require('../middlewares/validate-jwt');

router.post('/listFav/favorite', validateJwt, create);
router.get('/listFav/favorite/:listFavorite', validateJwt, list);
router.get('/listFav/favorite/search/:idFav', validateJwt, show);
router.put('/listFav/favorite/update/:idFav', validateJwt, update);
router.delete('/listFav/favorite/delete/:idFav', validateJwt, destroy);

module.exports = router;
