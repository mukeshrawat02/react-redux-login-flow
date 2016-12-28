(function (userController) {
    const User = require('../models').User;
    const jwt = require('jsonwebtoken');

    // POST /api/signup
    userController.signup = (req, res) => {
        let user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;

        // Save the user and check for errors
        user.save((err, result) => {
            if (err) {
                res.status(500).send(err);
            }
            // creating jwt token
            const token = jwt.sign({
                _id: result._id,
                username: result.username
            },
                req.app.get('jwtTokenSecret'), {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });

            res.json({
                success: true,
                message: 'User has been added!',
                content: ({ username: result.username }),
                token: token
            });
        });
    };

    // GET /api/users
    userController.getUsers = function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.status(500).send(err);
            }
            res.json({
                success: true,
                content: users
            });
        });
    };

    // GET /api/user
    userController.getUser = function (req, res) {
        User.findById(req.decoded._id, function (err, user) {
            if (err) {
                res.status(500).send(err);
            }
            res.json({
                success: true,
                content: user
            });
        });
    };

    // PUT /api/user
    userController.updateUser = function (req, res) {
        User.findById(req.decoded._id, function (err, user) {
            if (err) {
                res.status(500).send(err);
            }
            // Update only data that exists in request
            if (req.body.name) {
                user.name = req.body.name;
            }
            if (req.body.email) {
                user.email = req.body.email;
            }
            if (req.body.username) {
                user.username = req.body.username;
            }

            user.updated_at = Date.now();

            user.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                }

                res.json({
                    success: true,
                    message: 'User updated.',
                    content: user
                });
            });
        });
    };
})(module.exports);