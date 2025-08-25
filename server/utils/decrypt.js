const crypto = require('crypto');

const encryption = require("../config/encryption");

/**
 * encrypts the information received
 * 
 * @param {*} encrypted 
 * @returns the encrypted information
 */
var DECRYPT = ((encrypted) => {
  let decipher = crypto.createDecipheriv('aes-256-cbc', encryption.ENC_KEY, encryption.IV);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  return (JSON.parse(decrypted + decipher.final('utf8')));
});

module.exports={
  DECRYPT
}