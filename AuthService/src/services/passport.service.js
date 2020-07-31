const
    passport = require('passport'),
    bcrypt = require('bcrypt'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    AnonymousStrategy = require('passport-anonymous').Strategy,
    FacebookStrategy = require('passport-facebook-token'),
    AppleStrategy = require('passport-apple');


User = require('../modules/user/user.model.js')
Config = require('../environments/index');

const CustomGoogleStrategy = require('passport-custom').Strategy
const { OAuth2Client } = require('google-auth-library')

const ConfigPassport = Config.passport
const opts = {
    jwt: {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: Config.auth.jwtSecret,
        passReqToCallback: true
    },
};

module.exports = () => {

    passport.use('anonymous', new AnonymousStrategy);

    passport.use('user', new JwtStrategy(opts.jwt, function (req, jwt_payload, done) {
        User.findOne({
            where: {
                id: jwt_payload
            }
        })
            .then(u => {
                if (u) {
                    req.isUser = true;
                    done(null, u);
                } else done(null, false);
                return null;
            })
            .catch(e => done(e, false));
    }));
}
