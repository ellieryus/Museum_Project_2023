var CryptoJS = require("crypto-js");

const ENC_KEY = "CloudXiMuseumkfk9vdOWU50XxO10cDe";
const IV = "CloudXiMuseumama";

var ENCRYPT = ((val: any) => {
  let cipher = CryptoJS.AES.encrypt(JSON.stringify(val), CryptoJS.enc.Utf8.parse(ENC_KEY), {
    iv: CryptoJS.enc.Utf8.parse(IV),
    mode: CryptoJS.mode.CBC,
  });
  return cipher.toString();
});

export default ENCRYPT;