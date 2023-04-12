const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: { type: String, minlength: 3, required: true },
    photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }],
    projectId: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProjectId" }],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
