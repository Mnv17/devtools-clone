import React, { useState } from "react";
import axios from "axios";
import { useNetworkContext } from "../Context/NetworkContext";

const Filter = () => {
  const { dispatch } = useNetworkContext();
  const [url, setUrl] = useState("");
  const [allRequests, setAllRequests] = useState([]);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFetchRequests = async () => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    try {
      const response = await axios.get(`${proxyUrl}${url}`);
      const htmlContent = response.data;
  
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
  
      const fetchedRequests = [];
  
      doc
        .querySelectorAll("img")
        .forEach((img) =>
          fetchedRequests.push({
            type: "IMG",
            url: img.src,
            name: img.src.split("/").pop(), 
            status: 200,
            initiator: "IMG",
            size: "50 KB", 
            time: "100 ms" 
          })
        );
      doc
        .querySelectorAll('link[rel="stylesheet"]')
        .forEach((link) =>
          fetchedRequests.push({
            type: "CSS",
            url: link.href,
            name: link.href.split("/").pop(),
            status: 200,
            initiator: "CSS",
            size: "30 KB",
            time: "80 ms"
          })
        );
      doc
        .querySelectorAll("script")
        .forEach((script) =>
          fetchedRequests.push({
            type: "JS",
            url: script.src,
            name: script.src.split("/").pop(),
            status: 200,
            initiator: "JS",
            size: "70 KB",
            time: "150 ms"
          })
        );
      doc
        .querySelectorAll("video, audio")
        .forEach((media) =>
          fetchedRequests.push({
            type: "MEDIA",
            url: media.src,
            name: media.src.split("/").pop(),
            status: 200,
            initiator: "MEDIA",
            size: "1000 KB",
            time: "200 ms"
          })
        );
      doc
        .querySelectorAll("iframe")
        .forEach((iframe) =>
          fetchedRequests.push({
            type: "DOC",
            url: iframe.src,
            name: iframe.src.split("/").pop(),
            status: 200,
            initiator: "DOC",
            size: "300 KB",
            time: "250 ms"
          })
        );
      doc
        .querySelectorAll('link[rel="manifest"]')
        .forEach((manifest) =>
          fetchedRequests.push({
            type: "Manifest",
            url: manifest.href,
            name: manifest.href.split("/").pop(),
            status: 200,
            initiator: "Manifest",
            size: "10 KB",
            time: "30 ms"
          })
        );
      doc
        .querySelectorAll('link[rel="font"]')
        .forEach((font) =>
          fetchedRequests.push({
            type: "Font",
            url: font.href,
            name: font.href.split("/").pop(),
            status: 200,
            initiator: "Font",
            size: "40 KB",
            time: "70 ms"
          })
        );
      doc
        .querySelectorAll('link[rel="preload"]')
        .forEach((preload) =>
          fetchedRequests.push({
            type: "Other",
            url: preload.href,
            name: preload.href.split("/").pop(),
            status: 200,
            initiator: "Preload",
            size: "20 KB",
            time: "50 ms"
          })
        );
      doc
        .querySelectorAll('link[rel="stylesheet"][as="fetch"]')
        .forEach((fetch) =>
          fetchedRequests.push({
            type: "Fetch/XHR",
            url: fetch.href,
            name: fetch.href.split("/").pop(),
            status: 200,
            initiator: "Fetch/XHR",
            size: "25 KB",
            time: "60 ms"
          })
        );
      doc
        .querySelectorAll('link[rel="stylesheet"][as="websocket"]')
        .forEach((ws) =>
          fetchedRequests.push({
            type: "WS",
            url: ws.href,
            name: ws.href.split("/").pop(),
            status: 200,
            initiator: "WS",
            size: "15 KB",
            time: "40 ms"
          })
        );
  
      setAllRequests(fetchedRequests);
      dispatch({ type: "ADD_REQUESTS", payload: fetchedRequests });
    } catch (error) {
      console.error("Error fetching the URL:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      setError(error.message);
    }
  };
  

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    dispatch({ type: "SET_FILTER", payload: filterType });

    if (filterType === "All") {
      dispatch({ type: "ADD_REQUESTS", payload: allRequests });
    } else {
      const filteredRequests = allRequests.filter(
        (request) => request.type === filterType
      );
      dispatch({ type: "ADD_REQUESTS", payload: filteredRequests });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleFetchRequests();
    }
  };

  return (
    <div className="flex flex-col bg-gray-800 p-4 rounded mb-4 w-full mx-auto">
      <div className="flex gap-5 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="red"
          className="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
          <path
            fill="red"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 transform rotate-180"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="size-6"
        >
          <path
            fill="red"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 transform rotate-180"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
        </svg>

        <div className="flex items-center ml-4">
          <input
            type="checkbox"
            className="mr-2 h-5 w-5 border-gray-400 rounded text-gray-400 focus:ring-gray-400"
          />
          <span className="text-white">Preserve log</span>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 transform rotate-180"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
        </svg>

        <div className="flex items-center ml-4">
          <input
            type="checkbox"
            className="mr-2 h-5 w-5 border-gray-400 rounded text-gray-400 focus:ring-gray-400"
          />{" "}
          <span className="text-white">Disable cache</span>
        </div>

        <div>No throttling</div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 transform rotate-180"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
      </div>
      <div className="flex py-2 items-center">
        <input
          type="text"
          placeholder="Filter"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          className="px-2 py-0.5 bg-gray-700 text-white border border-gray-600 rounded mb-2 mr-2"
        />

        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="mr-1 h-5 w-5 border-gray-400 rounded text-gray-400 focus:ring-gray-400"
          />{" "}
          <span className="text-white">Invert</span>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 transform rotate-180 mr-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
        </svg>

        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="mr-1 h-5 w-5 border-gray-400 rounded text-gray-400 focus:ring-gray-400"
          />{" "}
          <span className="text-white">Hide data URLs</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-1 h-5 w-5 border-gray-400 rounded text-gray-400 focus:ring-gray-400"
          />{" "}
          <span className="text-white">Hide extension URLs</span>
        </div>
      </div>

      {error && (
        <div className="text-red-600 mb-2 ">Error fetching data: {error}</div>
      )}
      <div className="text-white mb-2 w-full align-middle ">
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-2 flex-wrap mb-4 ">
            {[
              "All",
              "Fetch/XHR",
              "DOC",
              "CSS",
              "JS",
              "Font",
              "IMG",
              "Media",
              "Menifest",
              "WS",
              "Wasm",
              "Other",
            ].map((filterType) => (
              <button
                key={filterType}
                onClick={() => handleFilterClick(filterType)}
                className={`px-4 border border-gray-600 rounded-lg ${
                  activeFilter === filterType
                    ? "bg-blue-100 text-gray-500"
                    : "bg-gray-800 text-white"
                }`}
              >
                {filterType}
              </button>
            ))}
          </div>
          <div className="flex  ">
            <input
              type="checkbox"
              className="mr-2 h-5 w-5 border-gray-400 rounded text-gray-400 focus:ring-gray-400"
            />{" "}
            <span className="text-white">Blocked response cookies</span>
          </div>
          <div className="flex  ml-4">
            <input
              type="checkbox"
              className="mr-2 h-5 w-5 border-gray-400 rounded text-gray-400 focus:ring-gray-400"
            />{" "}
            <span className="text-white">Blocked response</span>
          </div>
          <div className="flex ml-4">
            <input
              type="checkbox"
              className="mr-2 h-5 w-5 border-gray-400 rounded text-gray-400 focus:ring-gray-400"
            />{" "}
            <span className="text-white">3rd-party requests</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-gray-400 text-sm">
        Recording network activity...
      </div>
    </div>
  );
};

export default Filter;
