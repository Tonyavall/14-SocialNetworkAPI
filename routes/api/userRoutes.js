const router = require('express').Router()
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    getUserSingleThought,
    getUserThoughts
} = require('../../controllers/userController')

router.route('/')
    .get(getUsers)
    .post(createUser)
    .put(updateUser)

router.route('/:id')
    .get(getSingleUser)
    .delete(deleteUser)

router.route('/:id/add/:friendId')
    .post(addFriend)

router.route('/:id/thoughts')
    .get(getUserThoughts)

router.route('/:id/thoughts/:thoughtId')
    .get(getUserSingleThought)

module.exports = router;