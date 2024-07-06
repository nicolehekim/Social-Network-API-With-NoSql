const router = require('express').Router();
const {
  allUsers,
  usersById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController.js');

// /api/thoughts
router.route('/').get(allUsers).post(createUser);
router.route('/:userId').get(usersById).put(updateUser).delete(deleteUser);
router.route('/:userId/friend/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;
