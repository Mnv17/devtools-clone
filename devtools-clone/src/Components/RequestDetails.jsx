import React, { useState } from "react";
import { useNetworkContext } from "../Context/NetworkContext";
import Navbar from "./Navbar";

const RequestDetails = ({ selectedRequest, onClose }) => {
  const { state } = useNetworkContext();
  const [activeTab, setActiveTab] = useState("headers");

  if (!selectedRequest) {
    return <div className="text-white">Select a request to see details</div>;
  }

  const request = state.requests.find((req) => req.url === selectedRequest);

  if (!request) {
    return <div className="text-white">Request details not found</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "headers":
        return <pre>{JSON.stringify(request.headers, null, 2)}</pre>;
      case "payload":
        return <pre>{JSON.stringify(request.payload, null, 2)}</pre>;
      case "preview":
        return request.preview ? (
          <img src={request.preview} alt="Preview" />
        ) : (
          "No preview available"
        );
      case "response":
        return <pre>{JSON.stringify(request.response, null, 2)}</pre>;
      case "initiator":
        return <pre>{JSON.stringify(request.initiator, null, 2)}</pre>;
      case "timing":
        return <pre>{JSON.stringify(request.timing, null, 2)}</pre>;
      case "cookies":
        return <pre>{JSON.stringify(request.cookies, null, 2)}</pre>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded ml-4 flex-1 ">
      <div className="flex justify-between items-center mb-4">
      <button
  onClick={onClose}
  className="text-white focus:outline-none"
  title="Close"
>
  <svg
    className="h-5 w-5 fill-current"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
</button>


        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="text-white">
        <p>
          <strong>URL:</strong> {request.url}
        </p>
        <p>
          <strong>Type:</strong> {request.type}
        </p>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default RequestDetails;
