const crypto = require('crypto');
const { DECRYPT } = require('./decrypt');

const encryption = require("../config/encryption");

/**
 * decrypts the information received
 * 
 * @param {*} val 
 * @returns the decrypted information
 */
var ENCRYPT = ((val) => {
  let cipher = crypto.createCipheriv('aes-256-cbc', encryption.ENC_KEY, encryption.IV);
  let encrypted = cipher.update(JSON.stringify(val), 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
});


module.exports={
  ENCRYPT
}