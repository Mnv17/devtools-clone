import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NetworkProvider } from './Context/NetworkContext';

const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const response = await originalFetch(...args);
  logRequest(args, response.clone());
  return response;
};

const originalXhrOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(...args) {
  this.addEventListener('load', function() {
    logRequest(args, this);
  });
  originalXhrOpen.apply(this, args);
};

async function logRequest(args, response) {
  let responseBody;
  let isFetchResponse = response instanceof Response;

  if (isFetchResponse) {
    try {
      responseBody = await response.clone().text();
    } catch (error) {
      console.error('Error parsing response text:', error);
    }
  } else {
    responseBody = response.responseText;
  }

  const request = {
    url: args[1] ? args[1].url : args[0],
    type: isFetchResponse ? 'FETCH' : 'XHR',
    status: response.status,
    headers: isFetchResponse ? [...response.headers.entries()] : [],
    payload: args[1],
    response: responseBody,
    time: Date.now(),
  };

  const event = new CustomEvent('network-request', { detail: request });
  window.dispatchEvent(event);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NetworkProvider>
    <App />
  </NetworkProvider>
);

reportWebVitals();
