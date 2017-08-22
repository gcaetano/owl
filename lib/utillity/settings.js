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

    sms_express: {
        url: 'https://smsexpress.cloud.ptempresas.pt/smsexpress-wsdl/SubmissionManager2.wsdl',
        authentication: {
            application: 'tlk-backoffice',
            password: '49773f9b',
            username: 'trackit2'
        },
        submission: {
            notification: true,
            notificationRecipient: 'http://smsexpress.trackit.pt/notification',
            notificationType: 'HTTPGET',
            recipients: {item: 917936552},
            sender: '351925507401',
            validity: 1,
            alphabet: 0,
            message: "test",
            useSubstitutions: false
        },
        price: 0.045,
        timeout: 10000
    },
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
    mssql: {
        userName: 'datatronics',
        password: 'datatronics',
        server: '10.0.0.12',
        options: {
            database: 'conexa_europa_q108',
            rowCollectionOnDone: true,
            rowCollectionOnRequestCompletion: true
        }
    },
    server: {
        host: 'localhost',
        port: 8008
    }
};

module.exports = config;