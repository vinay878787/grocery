const mongoose = require("mongoose");

exports.connectMongoose = () => {
  mongoose
    .connect(
      "mongodb+srv://test123:test@test.fhuxlc7.mongodb.net/?retryWrites=true&w=majority"
    )
    .then((e) => console.log(`connected to mongodb `))
    .catch((e) => console.log(e));
};
const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});
exports.User = mongoose.model("User",userSchema);