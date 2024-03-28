exports.unprotected = (req, res, next) => {
  return res.status(200).json({
    message: "Unprotected route reached!",
  });
};

exports.protected = (req, res, next) => {
  return res.status(200).json({ message: "protected route reached!" });
};
