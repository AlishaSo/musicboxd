const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

router.get('/', (req, res) => res.send('C\'est la racine 🙌🏽'));

router.get('/reviews', controllers.getAllReviews);
router.get('/reviews/:id', controllers.getReviewById);
router.get('/lists', controllers.getAllLists);
router.get('/lists/:id', controllers.getListById);

router.post('/reviews', controllers.createReview);
router.post('/list', controllers.createList);

router.put('/reviews/:id', controllers.updateReview);
router.put('/lists/:id', controllers.updateList);

router.delete('/reviews/:id', controllers.deleteReview);
router.delete('/lists/:id', controllers.deleteList);

module.exports = router;