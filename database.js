const mongoose = require("mongoose");

exports.connectMongoose = () => {
  mongoose
    .connect(
      "mongodb+srv://vinay878787:adi2002@grocery.mwvn7ef.mongodb.net/?retryWrites=true&w=majority"
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