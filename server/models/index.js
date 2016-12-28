(function (model) {
    const mongoose = require('mongoose');
    const userModel = require("./user")(mongoose);

    model.User = userModel;

})(module.exports);