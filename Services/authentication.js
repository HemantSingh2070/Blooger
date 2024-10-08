const JWT = require('jsonwebtoken');

const secret = "God15great";

function createTokenForUser(user) {
    const payload = {
        _id :   user.id,
        name  : user.name,
        email : user.email,
        profilePhotoURL : user.profilePhotoURL,
        role : user.role,
    };
    const token = JWT.sign(payload,secret);
    return token;
}

function validateToken(token){
   const payload = JWT.verify(token,secret);
   return payload;
}

module.exports = {createTokenForUser,validateToken};