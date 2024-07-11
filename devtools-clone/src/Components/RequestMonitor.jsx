import React from 'react';
import { useNetworkContext } from '../Context/NetworkContext';
import "../App.css"

const RequestMonitor = ({ setSelectedRequest }) => {
  const { state } = useNetworkContext();

  return (
    <div className="bg-gray-800 p-4 rounded mb-4 flex-1 overflow-y-auto h-64 border-none ">
      <ul className="text-white">
        {state.filteredRequests.map((request, index) => (
          <li
            key={index}
            onClick={() => setSelectedRequest(request.url)}
            className="p-2 cursor-pointer hover:bg-gray-700"
          >
            <strong className="text-blue-400">{request.type}</strong> {request.url}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestMonitor;
