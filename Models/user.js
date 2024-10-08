const { Schema, model } = require('mongoose');
const { randomBytes, createHmac } = require('crypto');
const {createTokenForUser} = require('../Services/authentication')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePhotoURL: {
        type: String,
        default : '/images/default.png'
    },
    salt: {
        type: String,
    },
    role: {
        type: String,
        enum: ["USER", "ADMINISTRATOR"],
        default: "USER",
    }
});

// Pre-save middleware to hash the password
userSchema.pre('save', function (next) {
    const user = this;

    // Check if password has been modified
    if (!user.isModified('password')) {
        return next();
    }

    // Generate a salt and hash the password
    const salt = randomBytes(16).toString('hex');
    const hashedPass = createHmac('sha256', salt).update(user.password).digest('hex');

    // Set the salt and hashed password
    user.salt = salt;
    user.password = hashedPass;

    // Continue to the next middleware
    next();
});

userSchema.static('matchingPasswordAndGeneratingToken',async function(email,password){
    const user = await this.findOne({email});
    if(!user)  throw new Error("user not found");

    const salt = user.salt;
    const hashedPass = user.password;
    const userHash = createHmac('sha256', salt).update(password).digest('hex');
     
    if(hashedPass!==userHash) throw new Error("wrong password");

    const token = createTokenForUser(user);

    return token;
})


const User = model('User', userSchema);



module.exports = { User };
