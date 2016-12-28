(function (data) {
    const database = require("./database");

    data.init = (config) => {
        database.init(config);
    };

})(module.exports);