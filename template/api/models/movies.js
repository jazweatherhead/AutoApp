const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type:Number, required: true },
  director: { type:String, required: true }
});

mongoose.model('Movie', movieSchema); // the first param determines the collection name