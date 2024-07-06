const router = require('express').Router();
const {
  allThoughts,
  thoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  createReactions,
  deleteReactions,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(allThoughts).post(createThoughts);
router.route('/:thoughtId').get(thoughtsById).put(updateThoughts).delete(deleteThoughts);
router.route('/:thoughtId/reaction').post(createReactions);
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReactions);


module.exports = router;
