const router = require('express').Router()
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend
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


router.route('/:id/thoughts/:thoughtId')

module.exports = router;