const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  balance: {
    type: Number,
    default: 0
  }
});

// Add timestamp to new db records
CustomerSchema.plugin(timestamp);

const Customer = new mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
