<<<<<<< HEAD
const winston = require('winston');
=======
const winston = require('winston')
>>>>>>> 95695079f31b2638641622279f4b3a9f2bb65f72

// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
<<<<<<< HEAD
};
=======
}
>>>>>>> 95695079f31b2638641622279f4b3a9f2bb65f72

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
// function level() {
//     const env = process.env.NODE_ENV || 'development';
//     const isDevelopment = env === 'development';
//     return isDevelopment ? 'debug' : 'warn';
// }
function level() {
<<<<<<< HEAD
    return 'debug';
=======
    return 'debug'
>>>>>>> 95695079f31b2638641622279f4b3a9f2bb65f72
}

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
<<<<<<< HEAD
};

// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors(colors);
=======
}

// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors(colors)
>>>>>>> 95695079f31b2638641622279f4b3a9f2bb65f72

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    // Tell Winston that the logs must be colored
    winston.format.colorize({ all: true }),
    // Define the format of the message showing the timestamp, the level and the message
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
<<<<<<< HEAD
);
=======
)
>>>>>>> 95695079f31b2638641622279f4b3a9f2bb65f72

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const transports = [
    // Allow the use the console to print the messages
    new winston.transports.Console(),
    // Allow to print all the error level messages inside the error.log file
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    }),
    // Allow to print all the error message inside the all.log file
    // (also the error log that are also printed inside the error.log(
    new winston.transports.File({ filename: 'logs/all.log' }),
<<<<<<< HEAD
];
=======
]
>>>>>>> 95695079f31b2638641622279f4b3a9f2bb65f72

// Create the logger instance that has to be exported
// and used to log messages.
const Logger = winston.createLogger({
    level: level(),
    levels: levels,
    format: format,
    transports,
<<<<<<< HEAD
});

module.exports = Logger;
=======
})

module.exports = Logger
>>>>>>> 95695079f31b2638641622279f4b3a9f2bb65f72
