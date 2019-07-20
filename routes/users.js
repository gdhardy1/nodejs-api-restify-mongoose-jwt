const errors = require("restify-errors");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../auth");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = server => {
  // Register user
  server.post("/register", (req, res, next) => {
    const { email, password } = req.body;

    const user = new User({
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        // Hash Password
        user.password = hash;

        // Save user
        await user
          .save()
          .then(user => {
            res.send(201);
            next();
          })
          .catch(err => {
            return next(new errors.InternalError(err.message));
          });
      });
    });
  });

  // Authorize User
  server.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    await auth
      .authenticate(email, password)
      .then(user => {
        // Pass token to authenticated user
        const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
          expiresIn: "15m"
        });
        // Get issued at and expiration timestamps
        const { iat, exp } = jwt.decode(token);
        res.send({ iat, exp, token });

        next();
      })
      .catch(err => {
        // User unauthorized
        return next(new errors.UnauthorizedError(err));
      });
  });
};
