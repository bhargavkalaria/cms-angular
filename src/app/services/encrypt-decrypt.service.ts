import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Constant} from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor() {
  }

  encrypt(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), Constant.encryptionKey).toString();
  }

  decrypt(cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, Constant.encryptionKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}
