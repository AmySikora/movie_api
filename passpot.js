const passpot = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('./models.js');
    passportJWT = require('passport-jwt');

let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJWT;

passport.use(
    new LocalStrategy(
        {

            usernameField: 'Username',
            passwordField: 'Password',
        },
        async (username, password, callback) => {
            console.log(`${username} ${password}`);
            await Users.findOne({ Usernam: username })
            .then((user) => {
                if (!user) {
                    console.log('incorrect username');
                    return callback(null, false, {
                        message: 'Incorrect username or password.',
                    });
                }
                console.log('finished');
                return callback(null, user);
            })
            .catch((error) => {
                console.log(error);
                if (error) {
                    console.log(error);
                    return callback(error);
                }
            })
        }
    )
);