import moongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new moongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Do not return password in queries
  },
  avatar: {
    type: String,
    required: false,
    default: function () {
      return generateRandomAvatar(this.email);
    },
  },
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

function generateRandomAvatar(seed = null) {
  const randomSeed = seed || Math.random().toString(36).substring(2, 15);
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${randomSeed}`;
}

const User = moongoose.model("User", userSchema);

export default User;
