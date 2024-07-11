import React from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = ['headers', 'payload', 'preview', 'response', 'initiator', 'timing', 'cookies'];

  return (
    <div className="flex mb-4 bg-gray-800">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 mr-2 ${activeTab === tab ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Navbar;
