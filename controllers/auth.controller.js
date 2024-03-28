exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  req.session.isLoggedIn = true;
  res.status(200).json({ message: "Logged in" });
};

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  req.session.isLoggedIn = true;
  res.status(200).json({ message: "Logged in" });
};

exports.logout = (req, res, next) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "Logged out" });
  });
};
