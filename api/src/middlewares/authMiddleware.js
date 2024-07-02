let authMiddleware = (req, res, next) => {
  if (req.session.userLoggedIn && req.session.userLoggedIn.authLevel == 1) {
    next();
  } else {
    res.send("Debes de ser administrador para acceder a esta pagina");
  }
};

module.exports = authMiddleware;
