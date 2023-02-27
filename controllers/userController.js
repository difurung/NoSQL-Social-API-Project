const { User } = require("../models");
// User routes

const userControl = {
  findAllUser(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json.err;
      });
  },

  // find user by ID
  findUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((userData) => {
        if (!userData) {
          res.status(400).json({ message: "No user found!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Creates a user
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  // Edits existing user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          res.status(400).json({ message: "User not found!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Delete user by id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          res.status(400).json({ message: "User not found!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //   friend Routes
  // add a friend
  addFriend({ params }, res) {
    User.findByIdAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(400).json({ message: "User not found!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //   Delete Friend
  deleteFriend({ params }, res) {
    User.findByIdAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(400).json({ message: "User not found!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }

}

module.exports = userControl;
