const router = require("express").Router();

const {
    findAllThought,
    findThoughtById,
    createThought,
    updateThought,
    removeThought,
    deleteReaction,
    addReaction
} = require('../../controllers/thoughtController');
//const { findByIdAndUpdate } = require("../../models/Thought");

router.route('/').get(findAllThought);

router.route('/:userId').post(createThought);

router.route('/:thoughtId').get(findThoughtById).put(updateThought).delete(removeThought);

router.route('/:thoughtId/reaction').post(addReaction);

router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;