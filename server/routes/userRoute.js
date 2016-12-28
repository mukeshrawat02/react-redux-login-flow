(function (userRoute) {

    const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
    const authenticationController = require("../controllers/authenticationController");
    const userController = require("../controllers/userController");
    
    userRoute.init = function (apiRouter) {
        apiRouter.route('/signup')
            .post(userController.signup);

        apiRouter.route('/signin')
            .post(authenticationController.signin);

        // route middleware to verify a token
        apiRouter.use((req, res, next) => {
            // check header or url parameters or post parameters for token
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            // decode token
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, req.app.get('jwtTokenSecret'), (err, decoded) => {
                    if (err) {
                        return res.json({
                            success: false,
                            error: 'Failed to authenticate token.'
                        });
                    }
                    else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        next();
                    }
                });
            }
            else {
                // if there is no token return an error
                return res.status(403).send({
                    success: false,
                    error: 'No token provided.'
                });
            }
        });

        apiRouter.route('/users')
            .get(userController.getUsers);

        apiRouter.route('/user')
            .get(userController.getUser)
            .put(userController.updateUser);
    };

})(module.exports);