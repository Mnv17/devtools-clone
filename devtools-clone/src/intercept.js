window.addEventListener('message', (event) => {
    if (event.data.type === 'injectScript') {
      const script = document.createElement('script');
      script.src = `${event.origin}/intercept.js`;
      document.head.appendChild(script);
    }
  });
  
  (function() {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      const responseClone = response.clone();
      const responseData = await responseClone.json().catch(() => responseClone.text());
      const request = {
        url: args[0],
        type: 'fetch',
        status: response.status,
        headers: [...response.headers.entries()],
        payload: args[1],
        response: responseData,
        time: Date.now(),
      };
      window.parent.postMessage(request, '*');
      return response;
    };
  })();
  