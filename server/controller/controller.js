var Userdb = require("../model/model");

// create user
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Message cannot be empty" });
    return;
  }

  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
  });

  user
    .save(user)
    .then((data) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating operation",
      });
    });
};
// find all users
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user" });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Erro retrieving user" });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message: err.message || "Error occured while retriving user",
          });
      });
  }
};
// update user by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot Update user` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating user" });
    });
};
// delete user by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot delete user` });
      } else {
        res.send({ message: "User was deleted" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete User" });
    });
};
