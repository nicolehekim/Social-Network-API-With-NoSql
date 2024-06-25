const router = require('express').Router();
const {
  allThoughts,
  thoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  createReactions,
  deleteReactions,
} = require('../../controllers/thoughtsController.js');

// /api/thoughts
router.route('/').get(allThoughts).post(createThoughts);
router.route('/:thoughtsId').get(thoughtsById).put(updateThoughts).delete(deleteThoughts);
router.route('/:thoughtsId/reactions').post(createReactions);
router.route('/:thoughtsId/reactions/:reactionsId').delete(deleteReactions);


module.exports = router;
