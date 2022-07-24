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
    createUserThought,
    deleteThought
} = require('../../controllers/userController')

router.route('/')
    .get(getUsers)
    .post(createUser)
    .put(updateUser)

router.route('/:id')
    .get(getSingleUser)
    .delete(deleteUser)

router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

router.route('/:id/thoughts')
    .get(getUserThoughts)
    .post(createUserThought)

router.route('/:id/thoughts/:thoughtId')
    .get(getUserSingleThought)

module.exports = router;