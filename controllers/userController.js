const User = require('../models/User')

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User
                .find()
                .populate({
                    path: 'friends', 
                    select: ['username', 'email'] 
                })
                .populate({
                    path: 'thoughts', 
                    select: ['thoughtText', 'createdAt'] 
                })
            res.status(200).json(users)
        } catch(error) {
            console.log(error)
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User
                .find({_id: req.params.id})
                .populate({
                    path: 'friends', 
                    select: ['username', 'email'] 
                })
                .populate({
                    path: 'thoughts', 
                    select: ['thoughtText', 'createdAt'] 
                })
            if (!user) return res.json('User not found.')

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
            res.status(400).json(error)
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
            const response = await User.findOneAndDelete({_id: req.params.id})
            if (!response) return res.json('No user with this Id.')
            
            res.status(200).json('Success')
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async getUserFriends(req ,res) {
        try {
            const { friends } = await User
                .findOne({_id: req.params.id})
                .populate({
                    path: 'friends', 
                    select: ['username', 'email'] 
                })

            res.status(200).json(friends)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async addFriend(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
            if (!updatedUser) return res.json('Unable to find User')
            const updatedFriend = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $push: { friends: req.params.id } },
                { runValidators: true, new: true }
            )
            if (!updatedFriend) return res.json('Unable to find Friend')

            res.status(200).json('Success')
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async deleteFriend(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
            if (!updatedUser) return res.json('Unable to find User')
            const updatedFriend = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: req.params.id } },
                { runValidators: true, new: true }
            )
            if (!updatedFriend) return res.json('Unable to find Friend')
            
            res.status(200).json('Success')
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async getUserThoughts(req, res) {
        try {
            const { thoughts } = await User.find()

            res.status(200).json(thoughts)
        } catch(error) {
            res.status(400).json(error)
        }
    },
    async getUserSingleThought(req, res) {
        try {
            const { thoughts } = await User.find({_id: req.params.id})
            const [singleThought] = thoughts.filter(thought => thought._id === req.params.thoughtId)

            res.status(200).json(singleThought)
        } catch(error) {
            res.status(400).json(error)
        }
    }
}