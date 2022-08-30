const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/', (req, res) => res.send('C\'est la racine √'));

router.get('/reviews', protect, controllers.getAllReviews);
router.get('/reviews/:id', protect, controllers.getReviewById);
router.get('/lists', protect, controllers.getAllLists);
router.get('/lists/:id', protect, controllers.getListById);
router.get('/albums', controllers.getAllAlbums);  //get all albums
router.get('/albums/:id', controllers.getAlbumById);  //get specific album

router.get('/users/me', protect, controllers.getUser);

router.post('/reviews', protect, controllers.createReview);
router.post('/list', protect, controllers.createList);
router.post('/album', controllers.createAlbum);  //add one
router.post('/albums', controllers.createAlbums);  //add multiple

router.post('/users/register', controllers.registerUser);
router.post('/users/login/', controllers.loginUser);

router.put('/reviews/:id/edit', protect, controllers.updateReview);
router.put('/lists/:id', protect, controllers.updateList);

router.delete('/reviews/:id', protect, controllers.deleteReview);
router.delete('/lists/:id', protect, controllers.deleteList);

module.exports = router;