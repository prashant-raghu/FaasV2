module.exports = {
    service: {
        name: 'functionhandlerservice'
    },
    server: {
        url: 'http://127.0.0.1:8002',
        ip: '127.0.0.1',
        port: 8002,
    },
    auth: {
        jwtSecret: 'secret',
        passport: {
        },
    },
    db: {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "Admin@1234",
        DB: "faasv2_functionhandler",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    admin: {
        email: 'admin@admin.com',
        password: 'admin',
        userName: 'admin',
    },
    autoVerifyEmail: true,
    passport: {
    },
    kafka:{
        brokers: ['192.168.0.109:9092'],
        clientId: 'faasv2_functionhandler',
        events: ['create', 'read', 'update', 'delete']
    }
};
