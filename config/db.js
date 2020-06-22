const mongoose = require("mongoose");
const { mongoDB } = require("./keys");

module.exports = function() {
  mongoose.connect(
    mongoDB.URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => {
      console.log("Connected to MONGODB");
    }
  );
};
