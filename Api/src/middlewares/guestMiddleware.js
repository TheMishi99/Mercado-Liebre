let guestMiddleware = (req, res, next) => {
  const admins = ["mishi"];
  if (!req.session.userLoggedIn) {
    next();
  } else {
    res.send("No debes estar logueado para acceder a esta pagina");
  }
};

module.exports = guestMiddleware;
