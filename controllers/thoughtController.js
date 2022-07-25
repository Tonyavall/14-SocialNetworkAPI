const { Thought, User } = require('../models/index')

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
                { username: createdThought.username },
                { $push: { thoughts: createdThought._id } }
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
            const { reactions } = await Thought.findOne({_id: req.params.id})

            res.status(200).json(reactions)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async createThoughtReaction(req, res) {
        try {
            const { reactions } = await Thought.findOneAndUpdate(
                {_id: req.params.id},
                { $push: { reactions: req.body } },
                { runValidators: true, new: true }
            )

            res.status(200).json(reactions)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async getSingleThoughtReaction(req, res) {
        try {
            const { reactions } = await Thought.findOne({_id: req.params.id})
            const [singleReaction] = reactions.filter(reaction=> reaction._id.toString() === req.params.reactionId)
            
            res.status(200).json(singleReaction)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async deleteThoughtReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { runValidators: true, new: true }
            )
            if (!thought) return res.json('Unable to find reaction')
            
            res.status(200).json('Success')
        } catch(error) {
            res.status(400).json(error)
        }
    }
}