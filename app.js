// modules
    // .ent
        require("dotenv").config();
    // express
        const express = require("express");
        const app = express()
    // handlebars
        const handlebars = require("express-handlebars");
    // path
        const path = require("path");
    // chalk
        const chalk = require("chalk");
    // sessions
        const session = require("express-session");
    // messages
        const flash = require("connect-flash");
        const { serverMessage, databaseMessage, errorMessage } = require("./helpers/messages")
    // authentication
        const passport = require("passport")
        require("./config/auth")(passport)

        const cookieParser = require('cookie-parser');
        const logger = require('morgan');
    // orm, database
        const mongoose = require("mongoose");

// application configs

    // handlebars
        app.engine('handlebars', handlebars.engine({ defaultLayout: "main"}))
        app.set('view engine', 'handlebars');

    // uses
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(flash());

    // session
         app.use(session({
             secret: "5b7adacb65767ac95ae39b8b0940237f78d534614e3c669c1cbbc0719c9487af",
             resave: true,
             saveUninitialized: true,
             cookie: { maxAge: 30 * 60 * 1000 }
         }));

    // passport
        app.use(passport.initialize())
        app.use(passport.session())


    // middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg");
            res.locals.error_msg = req.flash("error_msg");
            res.locals.error = req.flash("error")
            next();
        })

    // mongoose
        mongoose.connect('mongodb://localhost:27017/authentication').then(() => {
            databaseMessage("MongoDB conectado")
        }).catch(err => {
            errorMessage(err)
        })

    // routes
        app.use("/", require("./routes/client"))
        app.use("/auth", require("./routes/auth"))

    // configuration
        app.listen(process.env.PORT, () => {
            serverMessage(`servidor aberto e operando na porta ${process.env.PORT}`)
        });
