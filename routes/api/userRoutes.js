const router = require('express').Router()
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
    getUserSingleThought,
    getUserThoughts,
    getUserFriends
} = require('../../controllers/userController')

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:id')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser)

router.route('/:id/friends')
    .get(getUserFriends)

router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

router.route('/:id/thoughts')
    .get(getUserThoughts)

router.route('/:id/thoughts/:thoughtId')
    .get(getUserSingleThought)

module.exports = router;