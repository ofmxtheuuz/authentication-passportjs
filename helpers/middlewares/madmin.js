module.exports = {
    admin: function(req, res, next) {
        if(req.isAuthenticated && req.user.admin == 1) {
            next();
        } else {
            req.flash('error_msg', 'Você precisa estar autenticado como um administrador para acessar esta área.')
        }
    }
}