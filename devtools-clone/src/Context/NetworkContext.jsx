import React, { createContext, useReducer, useContext } from 'react';

const NetworkContext = createContext();

const initialState = {
  requests: [],
  filteredRequests: [],
  filterType: 'All',
};

const networkReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REQUESTS':
      return { ...state, requests: action.payload, filteredRequests: action.payload };
    case 'SET_FILTER':
      const filteredRequests = state.requests.filter((request) => {
        if (action.payload === 'All') return true;
        return request.type === action.payload;
      });
      return { ...state, filterType: action.payload, filteredRequests };
    default:
      return state;
  }
};

export const NetworkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(networkReducer, initialState);

  return (
    <NetworkContext.Provider value={{ state, dispatch }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetworkContext = () => useContext(NetworkContext);
