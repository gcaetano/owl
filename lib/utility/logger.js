/**
 * log4js base configuration
 * using:
 * var logger = require('../../../lib/logger')
 * logger.info("message")
 * logger.error("message")
 * logger.warn("message")
 * logger.debug("message")
 * A daily routing will used to organize them. The log files can be find into ./logs/ directory
 */


var log4js = require("log4js"),
    settings = require('./settings');

// Path to where log4js configuration file is.
log4js.configure(settings.log4js, {});

// load appender (appender can be console, datafiles...), this system uses just dateFile
// log4js.loadAppender(settings.log4js.appender);

var logger = log4js.getLogger(settings.log4js.route.default);

module.exports = logger;