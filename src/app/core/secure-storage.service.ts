import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {
  private dbName = 'PhotoPicDB';
  private storeName = 'secureStore';
  private secretKey = 'mi_clave_secreta_123'; 

  private async getDB() {
    return await openDB(this.dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('secureStore')) {
          db.createObjectStore('secureStore');
        }
      }
    });
  }

  async setItem(key: string, value: any): Promise<void> {
    const db = await this.getDB();
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), this.secretKey).toString();
    await db.put(this.storeName, encrypted, key);
  }

  async getItem<T>(key: string): Promise<T | null> {
    const db = await this.getDB();
    const encrypted = await db.get(this.storeName, key);
    if (!encrypted) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, this.secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted) as T;
    } catch (error) {
      console.error('Error al descifrar el dato:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    const db = await this.getDB();
    await db.delete(this.storeName, key);
  }

  constructor() { }
}
