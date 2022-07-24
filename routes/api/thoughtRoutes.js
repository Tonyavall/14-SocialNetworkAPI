const router = require('express').Router()
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController')

router.route('/')
    .get(getThoughts)
    .post(createThought)
    .put(updateThought)

router.route('/:id')
    .get(getSingleThought)
    .delete(deleteThought)

module.exports = router;