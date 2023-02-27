const { Thought, User } = require("../models");


// Thought controller
const thoughtControl = {
  // This will get all routes
  findAllThought(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Find one by id
  findThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(400).json({ message: "No Thoughts found!" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //Create Thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then((thoughtData) => {
        return User.findByIdAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          res.status(400).json({ message: "No User found!" });
          return;
        }
        res.json(userData);
      });
  },

  // Remove thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(400).json({ message: "No Thought Found!" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Rection routes, thought update
  addReaction({ params, body }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(400).json({ message: "Thought not found!" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

   // Delete reaction
   deleteReaction({params}, res){
    Thought.findByIdAndUpdate(
        {_id: params.thoughtId},
        {$pull: {reactions: {_id:params.reactionId}}},
        {new: true}
    )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(400).json({ message: 'No Thought Found!'});
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
   } 


}




module.exports = thoughtControl;
