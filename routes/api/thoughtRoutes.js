const router = require('express').Router()
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    getThoughtReactions,
    createThoughtReaction,
    getSingleThoughtReaction,
    deleteThoughtReaction
} = require('../../controllers/thoughtController')

router.route('/')
    .get(getThoughts)
    .post(createThought)

router.route('/:id')
    .get(getSingleThought)
    .delete(deleteThought)
    .put(updateThought)

router.route('/:id/reactions')
    .get(getThoughtReactions)
    .post(createThoughtReaction)

router.route('/:id/reactions/:reactionId')
    .get(getSingleThoughtReaction)
    .delete(deleteThoughtReaction)

module.exports = router;