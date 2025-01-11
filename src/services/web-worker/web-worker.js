
function inLineWorker() {
  return `
console.log('web worker');
import * as indexedDB from './assets/scripts/indexed-db/indexed-db';
console.log('web worker');

fetch('/assets/data/properties.json')
  .then((response) => response.json())
  .then((data) => indexedDB.setItems(data, 'products'));

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
      case 'search':
        const result = await indexedDB.getItem(e.data.body, 'products');
        self.postMessage(result);
        break;
      default:
        self.postMessage('nothing found');
        break;
    }
  } catch (e) {
   self.postMessage({ type: 'error', body: e.message });
  }
});
`;
}

export function setupWorker() {
  try {
    //const content = inLineWorker();
    //const blob = new Blob([content], { type: 'text/javascript' });
    //const url = URL.createObjectURL(blob);
    const url = '/assets/scripts/worker/worker.js';
    const worker = new Worker(url, { type: 'module' });
    return worker;
  } catch (e) {
    console.error('Failed to setup web worker', e.message);
  }
}

/**
 * @param {Worker} worker
 * @param {object} message
 * @param {string} message.type
 * @param {string|number|object} message.body
 */
export function sendMessage(message, worker) {
  worker.postMessage(message);
}

/**
 * @param {Worker} worker
 * @param {Function} callback
 */
export function receiveMessage(worker, callback) {
  worker.addEventListener('message', (e) => {
    callback(e);
  });
}