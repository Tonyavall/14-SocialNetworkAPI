const { Schema, model } = require('mongoose')
const Reaction = require('./Reaction')
        
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => date.toString().match(/[A-Za-z]{3}\s\d{2}\s\d{4}/)[0]
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        if (this.reactions) return this.reactions.length
    })

const Thought = model('thought', thoughtSchema)

module.exports = Thought;