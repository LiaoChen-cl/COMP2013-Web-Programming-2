const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create to connect nodel schema
const contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
        type: String,
        required: true
    }
  },
  image: {
    type: String,
    required: false
  }
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
