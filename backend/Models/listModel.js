const mongoose = require("mongoose");

const wordListSchema = new mongoose.Schema(
  {
    words: [String],
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const WordList = mongoose.model("WordList", wordListSchema);

module.exports = { WordList };
