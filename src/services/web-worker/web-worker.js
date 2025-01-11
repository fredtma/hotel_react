
function inLineWorker() {
  return `
self.addEventListener('message', (e) => {
  switch (e.data.type) {
    case 'search':
      self.postMessage(e.data.body);
      break;
    default:
      self.postMessage('nothing found');
      break;
  }
});
`;
}

export function setupWorker() {
  try {
    const content = inLineWorker();
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
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

export function receiveMessage(worker, callback) {
  worker.addEventListener('message', (e) => {
    callback(e);
  });
}