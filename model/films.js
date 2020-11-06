const mongoose = require('mongoose')

const filmSchema = new mongoose.Schema({
	title: { type: String, required: true},
	director: { type: String, required: true},
	year: { type: Number, required: true},
})

mongoose.model('Film', filmSchema) // the first param determines the collection name