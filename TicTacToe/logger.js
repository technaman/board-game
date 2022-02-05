const fs = require('fs');

const logger = (req, res, next) => {
    log(req.url);
    next();
}

const log = (message) => {
    fs.writeFile(`${__dirname}/tmp/log.txt`, `${Date.now()}: ${message}\n`, {flag: 'a'}, err => {
        if(err){
            console.error(err);
        }
    });
    console.log(`${Date.now()}: ${message}`);
}

module.exports = logger;