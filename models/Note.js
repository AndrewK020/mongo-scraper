var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  body: String,

  author: {
      type: String,
      required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
