const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")

require("../models/Account")
const Account = mongoose.model("accounts")

// const users = [{
//     _id: 1,
//     username: "adm",
//     password: "$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW",
//     email: "contato@luiztools.com.br"
// }];


module.exports = function(passport) {

    function findUser(email) {
        Account.findOne({ email: email }, (error, result) => {
            if(error) console.log(error)
            return findUserByEmail(email);
        })
        //return users.find(user => user.email === email);
    }

    function findUserById(id) {
        Account.findById(id).then(user => {
            return user;
        })
        //return users.find(user => user._id === id);
    }

    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser((user, done) => {
        try {
            // Account.findById(id).then(user => {
            //     done(null, user);
            // })
            done(null, user)
        } catch (err) {
            done(err, null);
        }
    })
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            try {
                Account.findOne({email: email}, (err, user) => {

                    // usuário inexistente
                    if (!user) { return done(null, false) }

                    // comparando as senhas
                    const isValid = bcrypt.compareSync(password, user.password);
                    if (!isValid) return done(null, false)

                    return done(null, user)
                })
            } catch (err) {
                console.log(err)
                done(err, false);
            }
        }
    ));
}