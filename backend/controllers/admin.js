const User = require("../models/user");
const bcrypt = require("bcrypt");



exports.createUser = (req, res, next) => {
  if(req.userData.role === 'admin') {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "User created",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Invalid authentication credentials!"
          });
        });
    });

  } else {

    res.status(500).json({
      message: "Invalid authentication credentials!"
    });

  }

};

exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Scripts failed"
      });
    });
};

exports.getUsers = (req, res, next) => {
  if (req.userData.role === 'admin') {
    User.find().then(documents => {
      res.status(200).json({
        message: "Users fetched successfully!",
        users: documents
      });
    });
  } else {
    res.status(500).json({
      message: "Invalid authentication credentials!"
    });
  }


};

exports.updateUser = (req, res, next) => {
  if (req.userData.role === 'admin') {

  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      _id: req.body.id,
      email: req.body.email,
      password: hash
    });

    User.updateOne({ _id: req.params.id}, user)
      .then(result => {
        console.log(result);
        if (result.n > 0) {
          res.status(200).json({
            message: "Update successful"
          });
        } else {
          res.status(401).json({
            message: "Not authorized"
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Couldn't update user"
        });
      });

  });
  } else {
    res.status(500).json({
      message: "Invalid authentication credentials!"
    });
  }


};

exports.deleteUser = (req, res, next) => {
  if (req.userData.role === 'admin') {

  User.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({
          message: "Deletion successful"
        });
      } else {
        res.status(401).json({
          message: "Not authorized"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Posts failed"
      });
    });
  } else {
    res.status(500).json({
      message: "Invalid authentication credentials!"
    });
  }
};


