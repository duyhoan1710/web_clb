const {createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const moment = require('moment');
let path = require('path');


let customTimestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
const myFormat = printf(({ level, message}) => {
    return `${customTimestamp} '[${level.toUpperCase()}]': ${message}`;
});

const myCustomLevels = {
    levels: {
        debug: 0,
        info : 1,
        warn: 2,
        error: 3
    },
    colors: {
        debug: 'blue',
        info: 'green',
        warn: 'yellow',
        error: 'red'
    }
};


const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat,
        format.colorize()
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            level : 'info',
            filename: path.resolve(__dirname , '../logger' , 'logger.log'),
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: true
        })
    ],
});

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

module.exports = logger;