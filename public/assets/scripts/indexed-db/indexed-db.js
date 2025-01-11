/** @type {IDBDatabase} */
let DB;
/** @type {Observable<IDBDatabase>} */
let DB$;
const dbName = 'halo';
const store = 'cache';

function deffered() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  promise.resolve = resolve;
  promise.reject = reject;
  return {
    promise,
    resolve,
    reject,
  };
}

export function setupIndexedDB() {
  DB$ = new Promise((resolve, reject) => {

    if (DB) {
      resolve(DB);
      setTimeout(() => DB.close(), 5 * 60 * 1000); // release the connection after 5 minutes, if not used
      return;
    }
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = onUpgradeNeeded(resolve, reject);
    request.onsuccess = onSuccess(resolve);
    request.onerror = (error) => reject(error);
  });
  return DB$;

  function onSuccess(resolve) {
    return (event) => {
      DB = event.target.result;
      resolve(DB);
    };
  }

  function onUpgradeNeeded(resolve, reject) {
    return (event) => {
      DB = event.target.result;
      createCacheStore(DB);
      createProductsStore(DB);
      resolve(DB);
    };
  }
}

export function getItem(key, myStore = store) {
  return setupIndexedDB().then(
    ((db) => {
      const defer = deffered();
      const transaction = db.transaction([myStore]);
      const objectStore = transaction.objectStore(myStore);
      const request = objectStore.get(key);
      const data = new Set();

      request.onerror = (e) => defer.reject(e);
      request.onsuccess = () => data.add(request.result);
      transaction.oncomplete = () => defer.resolve(data);

      return defer.promise;
    }),
  );
}

export function getItems(query, index, myStore = store) {
  return setupIndexedDB().then(((db) => {
    const defer = deffered();
    const transaction = db.transaction([myStore]);
    const objectStore = transaction.objectStore(myStore);
    const iDbIndex = objectStore.index(index);
    //const range = IDBKeyRange.bound(query[0], `${query[0]}\uffff`);
    const data = new Set();

    iDbIndex.openCursor().onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        const result = cursor.value;
        const matchSearch = ([key, value]) => result[key].toLowerCase().includes(value.toLowerCase());
        const found = Object.entries(query).some(matchSearch);
        if (!found) {
          cursor.continue();
        } else {
          data.add(result);
          cursor.continue();
        }
      } else {
        defer.resolve(data);
      }
    };

    return defer.promise;
  }));
}

export function getAllItems(myStore = store) {
  return setupIndexedDB().then(((db) => {
    const defer = deffered();
    const transaction = db.transaction([myStore]);
    const objectStore = transaction.objectStore(myStore);
    const data = new Set();

    objectStore.openCursor().onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        data.add(cursor.value);
        cursor.continue();
      } else {
        defer.resolve(data);
      }
    };

    return defer.promise;
  }));
}

export function setItems(data, myStore = store) {
  return setupIndexedDB().then(
    (db) => {
      const defer = deffered();
      const transaction = db.transaction([myStore], 'readwrite');
      const objectStore = transaction.objectStore(myStore);

      data.forEach((value) => objectStore.put(value));
      transaction.oncomplete = () => defer.resolve();
      transaction.onerror = (e) => defer.reject(e);

      return defer.promise;
    },
  );
}

export function removeItem(key, myStore = store) {
  return setupIndexedDB().then(
    (db) => {
      const defer = deffered();
      const transaction = db.transaction([myStore], 'readwrite');
      const objectStore = transaction.objectStore(myStore);
      const request = objectStore.delete(key);

      request.onerror = (e) => defer.reject(e);
      request.onsuccess = () => defer.resolve();
      transaction.oncomplete = () => defer.resolve();

      return defer.promise;
    },
  );
}

function createCacheStore(db) {
  const objectStore = db.createObjectStore(store, { keyPath: 'key' });
  objectStore.createIndex('key', 'key', { unique: true });
}

function createProductsStore(db) {
  const objectStore = db.createObjectStore('products', { keyPath: 'id' });
  objectStore.createIndex('id', 'id', { unique: true });
  objectStore.createIndex('nameIndex', 'name', { unique: false });
  objectStore.createIndex('descriptionIndex', 'description', { unique: false });
  objectStore.createIndex('nameDescIndex', ['name', 'description'], { unique: false });
}