const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'main-log.txt');

const logMiddleware = (req, res, next) => {
    let info = "Se ingresó a: " + req.url + "\n";
    fs.appendFileSync(logPath, info);
    next();
}

module.exports = logMiddleware;