const restify = require("restify");
const mongoose = require("mongoose");
const config = require("./config");
const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

// Start server listen
server.listen(config.PORT, () => {
  mongoose.set("useFindAndModify", false);
  mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true })
    .catch(e => console.log(e));
});

const db = mongoose.connection;
db.on("error", e => console.log(e));

db.once("open", () => {
  console.log(`Server started on port ${config.PORT}`);
});
