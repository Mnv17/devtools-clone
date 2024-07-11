import React, { useState } from 'react';
import { NetworkProvider } from './Context/NetworkContext';
import RequestMonitor from './Components/RequestMonitor';
import RequestDetails from './Components/RequestDetails';
import Filter from './Components/Filter';
// import './App.css';

const App = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleCloseDetails = () => {
    setSelectedRequest(null); 
  };

  return (
    <NetworkProvider>
      <div className="min-h-screen bg-gray-800 text-gray-200 flex flex-col items-center p-4">
        <h1 className="text-3xl text-blue-500 mb-4">DevTools Clone</h1>
        <Filter />
        <div className="flex w-full mt-4">
          <div className="overflow-y-auto max-h-96 w-1/2">
            <RequestMonitor setSelectedRequest={setSelectedRequest} />
          </div>
          {selectedRequest && (
            <div className="overflow-y-auto max-h-96 w-1/2">
              <RequestDetails selectedRequest={selectedRequest} onClose={handleCloseDetails} />
            </div>
          )}
        </div>
      </div>
    </NetworkProvider>
  );
};

export default App;
