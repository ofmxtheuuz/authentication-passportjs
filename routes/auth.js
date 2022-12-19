const express = require("express")
const router = express.Router()
const passport = require("passport")

router.get("/login", (req, res) => {
    if(req.query.fl) {
        req.flash('error_msg', 'Usuário e/ou senha inexistentes!')
        res.redirect("/auth/login")
    } else {
        res.render("auth/login")
    }
})
router.post('/service/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login?fl=1'
}));
module.exports = router;