const Thought = require('../models/Thought')
const { findOneAndDelete } = require('../models/User')

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()

            res.status(200).json(thoughts)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async getSingleThought(res, res) {
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

            res.status(200).json(createdThought)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async updateThought(req, res) {
        try {
            const updatedThought = await findOneAndUpdate(
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
            const response = await findOneAndDelete({_id: req.params.id})
            if (!response) return res.json('Does not exist')

            res.status(200).json('Success')
        } catch(error) {
            res.status(400).json(error)
        }
    }
}