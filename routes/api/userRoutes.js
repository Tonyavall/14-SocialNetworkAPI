const router = require('express').Router()
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController')

router.route('/')
    .get(getUsers)
    .post(createUser)
    .put(updateUser)

router.route('/:id')
    .get(getSingleUser)
    .delete(deleteUser)

module.exports = router;