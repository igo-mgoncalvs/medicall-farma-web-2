import { openDB } from "idb";

const dbPromise = openDB('my-database', 1, {
  upgrade(db) {
    // Só cria se não existir
    if (!db.objectStoreNames.contains('home')) {
      db.createObjectStore('home');
    }
  },
});


export default dbPromise