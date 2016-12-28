const User = (mongoose) => {

    const bcrypt = require('bcrypt-nodejs');

    // Define our user schema
    let UserSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: {
            type: String, required: true, select: true // do not select in query by default
        },
        created_at: { type: Date, default: Date.now() },
        updated_at: Date
    });

    UserSchema.pre('save', function(next) {
        let user = this;

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) {
            return next();
        }

        // generate a salt
        bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return next(err);
                }

                // hash password with our new salt
                bcrypt.hash(user.password,
                    salt,
                    null,
                    (err, hash) => {
                        if (err) {
                            return next(err);
                        }

                        // override the cleartext password with the hashed one
                        user.password = hash;
                        next();
                    });
            });
    });

    // method to compare a given password with the database hash
    UserSchema.methods.comparePassword = function (password, cb) {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            if (err) {
                return cb(err);
            }

            cb(null, isMatch);
        });
    };

    // expose enum on the model, and provide an internal convenience reference 
    const reasons = UserSchema.statics.failedLogin = {
        NOT_FOUND: 0,
        PASSWORD_INCORRECT: 1,
    };

    // statics are pretty much the same as methods but allow for defining functions that exist directly on your Model.
    // getAuthenticated is a helper method to check username and password from the database and return the response
    UserSchema.statics.getAuthenticated = function (username, password, cb) {
        this.findOne({ username: username }, (err, user) => {
            if (err) {
                return cb(err);
            }

            // No user found with that username
            if (!user) {
                return cb(null, null, reasons.NOT_FOUND);
            }

            // Make sure the password is correct
            user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    return cb(err);
                }

                // password did not match
                if (!isMatch) {
                    return cb(null, null, reasons.PASSWORD_INCORRECT);
                }

                // success
                return cb(null, user);
            });
        });
    };

    // Export the Mongoose model
    return mongoose.model('User', UserSchema);
};

module.exports = User;