(function (database) {
    const mongoose = require('mongoose');

    database.init = (config) => {
        console.log("Connection String: " + config.db);
     
        const options = { 
            server: { 
                socketOptions: { 
                    keepAlive: 300000, 
                    connectTimeoutMS: 30000 
                } 
            }, 
            replset: { 
                socketOptions: { 
                    keepAlive: 300000,
                    connectTimeoutMS : 30000 
                } 
            } 
        };   
        mongoose.connect(config.db, options);
        
        const conn = mongoose.connection;             
        conn.on('error', console.error.bind(console, 'connection error:'));  
        
        conn.once('open', () => {
            console.log('Successfully connected to MongoDB');                       
        });
    };

})(module.exports);