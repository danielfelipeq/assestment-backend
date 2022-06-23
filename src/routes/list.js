const router = require('express').Router();
const {
  create,
  list,
  show,
  update,
  destroy,
} = require('../controllers/listFavorites.controller');
const { validateJwt } = require('../middlewares/validate-jwt');

router.post('/listFav', validateJwt, create);
router.get('/listFav', validateJwt, list);
router.get('/listFav/:id', validateJwt, show);
router.put('/listFav/:id', validateJwt, update);
router.delete('/listFav/:id', validateJwt, destroy);

module.exports = router;
