import { ConfigService } from '@nestjs/config';
var CryptoJS = require('crypto-js');

export function encodeString(plainString: string | number) {
  try {
    if (!plainString) {
      return '';
    }

    const secret = new ConfigService().get('secret');
    const ciphertext = CryptoJS.AES.encrypt(plainString, secret).toString();
    return ciphertext;
  } catch (error) {
    console.log(error);
  }
}
