/* eslint-disable no-restricted-globals */
import * as indexedDB from '../indexed-db/indexed-db.js';

fetch('/assets/data/properties.json')
  .then((response) => response.json())
  .then((data) => indexedDB.setItems(data, 'products'))
  .catch((err) => console.error(err));

self.addEventListener('message', async (e) => {
  try {
    switch (e.data.type) {
      case 'add:products':
        await indexedDB.setItem(e.data.body, 'products');
        break;
      case 'read:products':
        await indexedDB.getItem(e.data.body, 'products');
        break;
      case 'remove:products':
        await indexedDB.removeItem(e.data.body, 'products');
        break;
      case 'search:products':
        const search = e.data.body;
        const query = {name: search, description: search};
        const result = await indexedDB.getItems(query, 'nameDescIndex', 'products');
        self.postMessage(result);
        break;
      case 'all:products':
        const all = await indexedDB.getAllItems('products');
        self.postMessage(all);
        break;
      default:
        self.postMessage('nothing found');
        break;
    }
  } catch (e) {
   self.postMessage({ type: 'error', body: e.message });
  }
});