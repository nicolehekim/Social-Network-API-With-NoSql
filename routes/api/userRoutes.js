const router = require('express').Router();
const {
  allUsers,
  usersById,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriends,
  removeFriends,
} = require('../../controllers/usersController.js');

// /api/thoughts
router.route('/').get(allUsers).post(createUsers);
router.route('/:usersId').get(usersById).put(updateUsers).delete(deleteUsers);
router.route('/:usersId/friends/:friendsId').post(addFriends).delete(removeFriends);


module.exports = router;
