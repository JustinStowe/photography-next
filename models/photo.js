const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
  title: { type: String, required: false },
  date: { type: String, required: false },
  image: { type: String, required: true },
  public_id: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;
