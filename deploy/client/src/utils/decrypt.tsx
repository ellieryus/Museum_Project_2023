var CryptoJS = require("crypto-js");

const ENC_KEY = "CloudXiMuseumkfk9vdOWU50XxO10cDe";
const IV = "CloudXiMuseumama";

var DECRYPT = ((encrypted : any) => {
  let cipher = CryptoJS.AES.decrypt(encrypted, CryptoJS.enc.Utf8.parse(ENC_KEY), {
    iv: CryptoJS.enc.Utf8.parse(IV),
    mode: CryptoJS.mode.CBC,
  });
  return JSON.parse(cipher.toString(CryptoJS.enc.Utf8));
});

export default DECRYPT;