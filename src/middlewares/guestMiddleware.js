let guestMiddleware = (req, res, next) => {
  const admins = ["mishi"];
  if (!req.session.userLoggedIn) {
    next();
  } else {
    res.send("No tenes permiso para ver esta pagina");
  }
};

module.exports = guestMiddleware;
