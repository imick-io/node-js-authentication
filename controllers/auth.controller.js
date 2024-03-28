const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((userDoc) => {
    if (!userDoc) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    return bcrypt.compare(password, userDoc.password).then((isEqual) => {
      if (!isEqual) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      req.session.isLoggedIn = true;
      req.session.user = userDoc;
      res.status(200).json({ message: "Logged in" });
    });
  });
};

exports.signup = (req, res, next) => {
  const { email, password, name } = req.body;

  // We could also create an index on the email field to ensure uniqueness
  User.findOne({ email })
    .then((userDoc) => {
      if (userDoc) {
        return res.status(400).json({ message: "User already exists" });
      }

      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email,
          password: hashedPassword,
          name,
        });

        return user.save().then((u) => {
          req.session.isLoggedIn = true;
          req.session.user = u;
          res.status(201).json({ message: "User created" });
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    });
};

exports.logout = (req, res, next) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "Logged out" });
  });
};
