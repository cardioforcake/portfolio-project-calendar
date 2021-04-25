const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    complete: { type: Boolean, default: false}
})

const dateSchema = new mongoose.Schema({
    date: String,
    todo: [todoSchema],
})

const calendarSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
    dates: [dateSchema],
})

module.exports = mongoose.model('Calendar', calendarSchema);