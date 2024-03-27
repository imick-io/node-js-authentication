exports.login = (req, res) => {
  res.setHeader("Set-Cookie", "dummyLoggedIn=true; Max-Age=10");
  res.status(200).json({ message: "Logged in" });
};
