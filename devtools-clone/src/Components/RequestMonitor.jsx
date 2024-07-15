import React from 'react';
import { useNetworkContext } from '../Context/NetworkContext';
import "../App.css";

const RequestMonitor = ({ setSelectedRequest }) => {
  const { state } = useNetworkContext();

  const isDisplaySize = (type) => {
    return ["IMG", "CSS", "JS", "MEDIA", "DOC", "Manifest", "Font", "Other"].includes(type);
  };

  return (
    <div className="request-monitor-container">
      {state.filteredRequests.length === 0 ? (
        <div className="no-activity-message-container">
          <div className="no-activity-message">Recording Network Activity...</div>
          <div className="no-activity-suggestion">
            Perform a request or hit <kbd>Ctrl + R</kbd> to record the reload.
          </div>
          <div>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="learn-more-link">Learn more</a>
          </div>
        </div>
      ) : (
        <table className="request-table">
          <thead className="request-table-header">
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Type</th>
              <th>Initiator</th>
              <th>Size</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody className="request-table-body">
            {state.filteredRequests.map((request, index) => (
              <tr
                key={index}
                onClick={() => setSelectedRequest(request.url)}
                className="request-row"
              >
                <td className="truncate">{request.url}</td>
                <td className="truncate">200</td>
                <td className="truncate">{request.type}</td>
                <td className="truncate">{request.initiator}</td>
                <td className="truncate">{isDisplaySize(request.type) ? request.size : ''}</td>
                <td className="truncate">{request.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RequestMonitor;
