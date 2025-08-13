const mongoose = require("mongoose");

async function connectMongoDb(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("Mongo DB connected"))
    .catch((err) => console.log("mongo error:", err));
}

module.exports = {
  connectMongoDb,
};
