const { findOneAndUpdate } = require('../models/User')
const User = require('../models/User')

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()

            res.status(200).json(users)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.find({_id: req.params.id})

            res.status(200).json(user)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async createUser(req, res) {
        try {
            const createdUser = await User.create(req.body)

            res.status(200).json(createdUser)
        } catch(error) {
            res.statas(400).json(error)
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await User
                .findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: req.body },
                    { runValidators: true, new: true }
                )
            
            res.status(200).json(updatedUser)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async deleteUser(req, res) {
        try {
            const response = await findOneAndDelete({_id: req.params.id})
            if (!response) return res.json('No user with this Id.')
            
            res.status(200).json('Success')
        } catch(error) {
            res.status(400).json(error)
        }
    }
}