const restify = require("restify");
const mongoose = require("mongoose");
const config = require("./config");
const rjwt = require("restify-jwt-community");

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

// Protect all routes except login and register route
server.use(
  rjwt({ secret: config.JWT_SECRET }).unless({ path: ["/login", "/register"] })
);

// Default database connection
const db = mongoose.connection;
db.on("error", e => console.log(e));

// Require routes once the connection is open
db.once("open", () => {
  require("./routes/customers")(server);
  require("./routes/users")(server);

  console.log(`Server started on port ${config.PORT}`);
});
