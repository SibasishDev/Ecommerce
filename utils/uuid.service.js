"use stricts";

const {v4 : uuidv4} = require('uuid');

module.exports = {
    createUuid : () => {
        return uuidv4();
    }
}