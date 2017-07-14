"use strict";
var passport = require("passport");
var BasicStrategy = require("passport-http").BasicStrategy;

module.exports = function (models) {
    passport.use(new BasicStrategy(
            function (userid, password,done) {
                models.Users.findOne({
                    where: {
                        username: userid,
                        password: password
                    },
                }).then(function (user) {
                    return done(null, user);
                })
            }
    ));
    return passport;
}


