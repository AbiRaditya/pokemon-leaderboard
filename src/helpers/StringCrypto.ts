import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
var CryptoJS = require('crypto-js');
const envAccess = new ConfigService();

export function encodeString(plainString: string | number): string {
  try {
    if (!plainString) {
      return '';
    }

    const secret = envAccess.get('CRYPT_SECRET');
    const ciphertext = CryptoJS.AES.encrypt(plainString, secret).toString();
    return ciphertext;
  } catch (error) {
    console.log(error);
  }
}

export function decodeHash(hashedString: string): string {
  try {
    if (!hashedString) {
      return '';
    }
    // CRYPT_SECRET;
    const secret = envAccess.get('CRYPT_SECRET');
    const deciphered = CryptoJS.AES.decrypt(hashedString, secret).toString(
      CryptoJS.enc.Utf8,
    );
    return deciphered;
  } catch (error) {
    console.log(error);
  }
}
