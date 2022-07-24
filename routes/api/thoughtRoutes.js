const router = require('express').Router()
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    getThoughtReactions,
    createThoughtReaction
} = require('../../controllers/thoughtController')

router.route('/')
    .get(getThoughts)
    .post(createThought)
    .put(updateThought)

router.route('/:id')
    .get(getSingleThought)
    .delete(deleteThought)

router.route('/:id/reactions')
    .get(getThoughtReactions)
    .post(createThoughtReaction)

module.exports = router;