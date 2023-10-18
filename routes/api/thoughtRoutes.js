const router = require('express').Router();
const { Thought, User } = require('../../models');

// /api/thoughts

// GET all thoughts
router.route('/').get(async function(req, res) {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        console.log(error);
    }
});

// GET a single thought by its id 
router.route('/:id').get(async function(req, res) {
    try {
        const thought = await Thought.findOne({
            _id: req.params.id
        });
        res.json(thought);
    } catch (error) {
        console.log(error);
    }
});

// POST to create a new thought & push the created thoughts id to the associated users thoughts array field
router.route('/').post(async function(req, res) {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res.status(400).json({ 
                message: 'Thought created, but no user found with that ID' 
            });
        }

        res.json(thought);
    } catch (error) {
        console.log(error);
    }
});

// PUT to update by its id
router.route('/:thoughtId').put(async function(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        res.json(thought);
    } catch (error) {
        console.log(error);
    }
});

// DELETE to remove a thought by its id
router.route('/:thoughtId').delete(async function(req, res) {
    try {
        const thought = await Thought.findOneAndDelete({
            _id: req.params.thoughtId
        });
        res.json(thought, { message: 'Thought has been deleted!' });
    } catch (error) {
        console.log(error);
    }
});

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thoughts reaction array field
router.route('/:thoughtId/reactions').post(async function(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        res.json(thought);
    } catch (error) {
        console.log(error);
    }
});
// DELETE to pull and remove a reaction by the reactions reactionId value
router.route('/:thoughtId/reactions/:reactionId').delete(async function(req, res) {
    try {
        const thought = await Thought.findByIdAndUpdate(
            {_id: req.params.thoughtId},
            { $pull: { reactions: req.params.reactionId } },
            { runValidators: true, new: true }
        );
        res.json(thought);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;