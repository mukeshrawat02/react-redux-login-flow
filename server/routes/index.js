(function (apiRoutes) {
    const userRoute = require("./userRoute");

    apiRoutes.init = (routes) => {
        userRoute.init(routes);
    };
})(module.exports);