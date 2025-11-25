import { openDB } from 'idb';

export function dbPromise() {
  if (typeof window === 'undefined') return Promise.resolve(undefined);

  return openDB('my-database', 3, {
    upgrade(db) {
      const stores = [
        'home',
        'footer',
        'footerSocial',
        'footerLinks',
        'addresses',
        'aboutUsLayout',
        'privacyPolicy',
        'products',
        'topProducts',
        'featuredProducts',
        'listGroups',
        'suppliers',
        'clients',
        'floatButtons',
        'contactPhone',
        'contactEmail',
        'catalogLink',
      ];

      for (const store of stores) {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store);
        }
      }
    },
  });
}