const { Thought, User } = require('../models/index')
const { findOneAndDelete } = require('../models/User')

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()

            res.status(200).json(thoughts)
        } catch(error) {
            console.log(error)
            res.status(400).json(error)
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.find({_id: req.params.id})
            if (!thought) return res.json('Does not exist.')

            res.status(200).json(thought)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async createThought(req, res) {
        try {  
            const createdThought = await Thought.create(req.body)
            await User.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { _id: createdThought._id } }
            )

            res.status(200).json(createdThought)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            res.status(200).json(updatedThought)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async deleteThought(req, res) {
        try {
            const response = await Thought.findOneAndDelete({_id: req.params.id})
            if (!response) return res.json('Does not exist')

            res.status(200).json('Success')
        } catch(error) {
            console.log(error)
            res.status(400).json(error)
        }
    },
    async getThoughtReactions(req, res) {
        try {
            const { reactions } = await Thought.find({_id: req.params.id})

            res.status(200).json(reactions)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async createThoughtReaction(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                {_id: req.params.id},
                { $push: { reactions: req.body } },
                { runValidators: true, new: true }
            )

            res.status(200).json(updatedThought)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async getSingleThoughtReaction(req, res) {
        try {
            const { thoughts } = await Thought.findOne({_id: req.params.id})
            const [ singleThought ] = thoughts.filter(thought=> thought._id === req.params.thoughtId)

            res.status(200).json(singleThought)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async deleteThoughtReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { _id: req.params.reactionId } },
                { runValidators: true, new: true }
            )

            res.status(200).json(thought)
        } catch(error) {
            res.status(400).json(error)
        }
    }
}