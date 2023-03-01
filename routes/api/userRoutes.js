const router = require("express").Router();

const {
  findAllUser,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(findAllUser).post(createUser);

router.route("/:id").get(findUserById).put(updateUser).delete(deleteUser);

router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router