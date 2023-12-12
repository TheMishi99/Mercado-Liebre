let authMiddleware = (req, res, next) => {
  const admins = ["mishi"];
  if (
    req.session.userLoggedIn &&
    admins.includes(req.session.userLoggedIn.userName)
  ) {
    next();
  } else {
    res.send("Debes de ser administrador para acceder a esta pagina");
  }
};

module.exports = authMiddleware;
