const GoogleStrategy = require('passport-google-oauth2')
    .Strategy;
const secret = require("./const");

module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: secret.clientId,
        clientSecret: secret.clientSecret,
        callbackURL: secret.redirect
    }, (token, refreshToken, profile, done) => {
        console.log(profile)
        return done(null, {
            profile: profile,
            token: token
        });
    }));
};