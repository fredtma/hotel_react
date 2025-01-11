/**
 * Utility function to handle the response from a fetch.
 * @param {Response} response The response object from fetch.
 * @returns {Promise<any>} A promise that resolves to the JSON response,
 * or rejects with an error if the response was not ok.
 */
export function fetchOk(response) {
  if (response.ok) {
    return response.json();
  }
  return response.text().then((text) => {
    throw new Error(text);
  });
}