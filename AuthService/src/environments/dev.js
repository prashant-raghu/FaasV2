module.exports = {
    service: {
        name: 'authservice'
    },
    server: {
        url: 'http://127.0.0.1:8001',
        ip: '127.0.0.1',
        port: 8001,
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
        DB: "faasv2_auth",
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
        clientId: 'faasv2_auth',
        events: ['register', 'login', 'update', 'get']
    }
};
