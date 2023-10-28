const bcrypt = require("bcrypt");
const { decrypt } = require("dotenv");
const { error } = require("./response.handler");
const saltRounds = 10;

module.exports =  {
  encryptPassword:  function (password){
    return new Promise((resolve, reject) => {
      bcrypt
        .hash(password, saltRounds)
        .then((hash) => resolve(hash))
        .catch((error) => {
          reject("Internal server error.");
        });
    });
  },

  matchPassword : function({password, hash}){
    return new Promise((resolve, reject) => {
      bcrypt
        .compare(password, hash)
        .then((match) => resolve(match))
        .catch((error) => {
          reject("Internal server error.");
        });
    });
  }
}
