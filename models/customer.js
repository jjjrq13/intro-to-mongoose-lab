// Import Mongoose
const mongoose = require('mongoose');

// Define our schema
const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

// Convert schema to model
const Customer = mongoose.model('Customer', customerSchema);

// Export our model
module.exports = Customer; 
