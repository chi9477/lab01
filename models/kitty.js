var mongoose = require('mongoose');

var kittySchema = mongoose.Schema({
	name: {type: String, maxlength: 30, match: /^[A-Z].*/, required: true},
	age: {type: Number, min: 0, max: 100}
});

module.exports = kittySchema;
