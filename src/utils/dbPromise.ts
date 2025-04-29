import { openDB } from "idb";

const dbPromise = openDB('my-database', 1, {
  upgrade(db) {
    // Só cria se não existir
    if (!db.objectStoreNames.contains('home')) {
      db.createObjectStore('home');
    }
    
    if (!db.objectStoreNames.contains('footer')) {
      db.createObjectStore('footer');
    }
    if (!db.objectStoreNames.contains('footerSocial')) {
      db.createObjectStore('footerSocial');
    }
    if (!db.objectStoreNames.contains('footerLinks')) {
      db.createObjectStore('footerLinks');
    }
    if (!db.objectStoreNames.contains('addresses')) {
      db.createObjectStore('addresses');
    }
    if (!db.objectStoreNames.contains('aboutUsLayout')) {
      db.createObjectStore('aboutUsLayout');
    }
    if (!db.objectStoreNames.contains('privacyPolicy')) {
      db.createObjectStore('privacyPolicy');
    }
  },
});


export default dbPromise