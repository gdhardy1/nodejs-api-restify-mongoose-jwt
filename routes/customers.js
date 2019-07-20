const Customer = require("../models/Customer");
const errors = require("restify-errors");
const config = require("../config");

module.exports = server => {
  // Get all customers
  server.get("/customers", async (req, res, next) => {
    await Customer.find({})
      .then(customers => {
        res.send(customers);
        next();
      })
      .catch(err => {
        return next(new errors.InvalidContentError(err));
      });
  });

  // Add customer
  server.post("/customers", async (req, res, next) => {
    // Check Content-Type for JSON (restify is() method)
    if (!req.is("application/json")) {
      return next(new errors.InvalidContentError("Expects 'applicaiton/json'"));
    }
    // Get request body
    const { name, email, balance } = req.body;
    // Creat new Customer model instance
    const customer = new Customer({
      name,
      email,
      balance
    });

    // Persist document to db
    await customer
      .save()
      .then(newCustomer => {
        res.send(201, newCustomer);
        next();
      })
      .catch(err => {
        return next(new errors.InternalError(err.message));
      });
  });

  // Get a customer by id
  server.get("/customers/:id", async (req, res, next) => {
    // find customer with matching id
    await Customer.findById(req.params.id)
      .then(customer => {
        res.send(customer);
        next();
      })
      .catch(err => {
        return next(
          new errors.ResourceNotFoundError(
            `There is no customer with the id of ${req.params.id}`
          )
        );
      });
  });

  // Update customer
  server.put("/customers/:id", async (req, res, next) => {
    // Check Content-Type for JSON
    if (!req.is("application/json")) {
      return next(new errors.InvalidContentError("Expects 'applicaiton/json'"));
    }

    // Find customer with matching id and replace document with request body
    await Customer.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(customer => {
        res.send(201, customer);
        next();
      })
      .catch(err => {
        return next(
          new errors.ResourceNotFoundError(
            `There is no customer with the id of ${req.params.id}`
          )
        );
      });
  });

  // Delete customer
  server.del("/customers/:id", async (req, res, next) => {
    // Find customer with matching id and delete document
    await Customer.findOneAndDelete({ _id: req.params.id })
      .then(customer => {
        res.send(204);
        next();
      })
      .catch(err => {
        return next(
          new errors.ResourceNotFoundError(
            `There is no customer with the id of ${req.params.id}`
          )
        );
      });
  });
};
