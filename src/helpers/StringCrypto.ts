import { ConfigService } from '@nestjs/config';
var CryptoJS = require('crypto-js');

export function encodeString(plainString: string | number) {
  try {
    if (!plainString) {
      return '';
    }

    const secret = new ConfigService().get('CRYPT_SECRET');
    const ciphertext = CryptoJS.AES.encrypt(plainString, secret).toString();
    return ciphertext;
  } catch (error) {
    console.log(error);
  }
}
export function decodeHash(hashedString: string | number) {
  try {
    if (!hashedString) {
      return '';
    }
    // CRYPT_SECRET;
    const secret = new ConfigService().get('CRYPT_SECRET');
    const deciphered = CryptoJS.AES.decrypt(hashedString, secret).toString(
      CryptoJS.enc.Utf8,
    );
    return deciphered;
  } catch (error) {
    console.log(error);
  }
}
