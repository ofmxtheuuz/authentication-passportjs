const expresss = require("express")
const mongoose = require("mongoose");
const router = expresss.Router();
const bcrypt = require("bcryptjs")
const { serverMessage, databaseMessage, errorMessage } = require("../helpers/messages")
const { admin } = require("../helpers/middlewares/madmin")

require("../models/Account")
const Account = mongoose.model("accounts")

router.get("/", (req, res) => {

    // bcrypt.genSalt(10, (err, salt) => {
    //     if(err) errorMessage(err)
    //     bcrypt.hash("Matheus123!", salt, (err, hash) => {
    //         if(err) errorMessage(err)
    //         new Account({
    //             name: "Matheus Piccoli",
    //             email: "mategame2402@gmail.com",
    //             password: hash,
    //             admin: 1
    //         }).save().then(() => {
    //             req.flash('success_msg', 'Usuário registrado com sucesso, realize o log-in!');
    //             res.redirect("/auth/login")
    //         }).catch(err => {
    //             errorMessage(err)
    //         })
    //     })
    // })
    res.render("client/index", { usr: req.user })
})

router.get("/user", admin, (req, res, next) => {
    res.render("client/user", { usr: req.user })
})

module.exports = router;