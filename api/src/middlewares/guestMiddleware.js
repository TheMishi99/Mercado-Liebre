let guestMiddleware = (req, res, next) => {
  if (!req.session.userLoggedIn) {
    next();
  } else {
    res.send("No debes estar logueado para acceder a esta pagina");
  }
};

module.exports = guestMiddleware;
