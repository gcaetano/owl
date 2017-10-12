/**
 * Created by Giuliano Ferreira Caetano on 08/03/2017.
 * All configs have to be placed here
 */
var config = {
    log4js: {
        appenders: {
            default: {
                type: 'dateFile', filename: 'logs/default', "pattern": "-dd-MM-yyyy.log", alwaysIncludePattern: true
            }
        },
        categories: {
            default: {appenders: ['default'], level: 'info'}
        },
        route: {
            default: 'default'
        }
    },
    appender: 'dateFile',
    mongo: {
        database: {
            owl: {
                host: "localhost",
                port: 27017,
                name: "owl",
                collections: {
                    sessions: "sessions",
                    profiles: "profiles"
                }
            }
        }
    },
    server: {
        host: 'localhost',
        port: 8008
    }
};

module.exports = config;