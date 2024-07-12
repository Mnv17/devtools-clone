/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react';
import { useNetworkContext } from '../Context/NetworkContext';
import "../App.css";

const RequestMonitor = ({ setSelectedRequest }) => {
  const { state } = useNetworkContext();

  const isDisplaySize = (type) => {
    return ["IMG", "CSS", "JS", "MEDIA", "DOC", "Manifest", "Font", "Other"].includes(type);
  };

  return (
    <div className="bg-gray-900 p-4 rounded mb-4 flex-1 overflow-y-auto h-64 border-none">
      <div className="sticky top-0 bg-gray-900 z-10">
        <div className="text-white mb-2">
          <div className="grid grid-cols-6 gap-4 p-2 bg-gray-800 rounded">
            <div className="truncate"><strong>Name</strong></div>
            <div className="truncate"><strong>Status</strong></div>
            <div className="truncate"><strong>Type</strong></div>
            <div className="truncate"><strong>Initiator</strong></div>
            <div className="truncate"><strong>Size</strong></div>
            <div className="truncate"><strong>Time</strong></div>
          </div>
        </div>
      </div>
      <ul className="text-white" role="list">
        {state.filteredRequests.map((request, index) => (
          <li
            key={index}
            onClick={() => setSelectedRequest(request.url)}
            className="p-2 cursor-pointer hover:bg-gray-800 grid grid-cols-6 gap-4 border-b border-gray-700"
            role="listitem"
          >
            <div className="truncate">{request.url}</div>
            <div className="truncate">200</div>
            <div className="truncate">{request.type}</div>
            <div className="truncate">{request.initiator}</div>
            <div className="truncate">{isDisplaySize(request.type) ? request.size : ''}</div>
            <div className="truncate">{request.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestMonitor;
