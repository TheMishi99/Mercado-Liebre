let authMiddleware = (req, res, next) => {
  const admins = ["mishi"];
  if (
    req.session.userLoggedIn &&
    admins.includes(req.session.userLoggedIn.userName)
  ) {
    next();
  } else {
    res.send("No tenes permiso para ver esta pagina");
  }
};

module.exports = authMiddleware;
