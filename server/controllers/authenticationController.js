(function (authenticationController) {
    const jwt = require('jsonwebtoken');
    const User = require('../models').User;

    // POST /api/signin
    authenticationController.signin = (req, res) => {
        User.getAuthenticated(req.body.username, req.body.password, (err, user, reason) => {
            if (err) {
                res.status(500).send(err);
            }

            // login was successful if we have a user
            if (user) {
                // handle login success

                // creating jwt token
                const token = jwt.sign({
                    _id: user._id,
                    username: user.username
                },
                    req.app.get('jwtTokenSecret'), {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Login success!',
                    content: ({ username: user.username }),
                    token: token
                });
            }

            // otherwise we can determine why we failed
            const reasons = User.failedLogin;
            switch (reason) {
                case reasons.NOT_FOUND:
                    res.status(401).send("Authentication failed. User not found!");
                        // .json({
                        //     success: false,
                        //     error: "Authentication failed. User not found!"
                        // });
                    break;
                case reasons.PASSWORD_INCORRECT:
                    res.status(401).send("Authentication failed. Incorrect Password!");
                        // .json({
                        //     success: false,
                        //     error: "Authentication failed. Incorrect Password!"
                        // });
                    break;
            }
        });
    };

})(module.exports);