const mongoose = require("mongoose");

exports.connectMongoose = () => {
  mongoose
    .connect(process.env.DB_URL)
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
  cart: [
    {
      productName: String,
      productImage: String,
      productPrice: String,
      category: String,
    },
  ]
});
exports.User = mongoose.model("User",userSchema);