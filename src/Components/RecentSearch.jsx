import React from "react";

const RecentSearch = ({
  recentHistory,
  setRecentHistory,
  setSelectedHistory,
}) => {
  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };

  const clearSelectedHistory = (selectedItem) => {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history = history.filter((item) => item !== selectedItem);
    setRecentHistory(history);
    localStorage.setItem("history", JSON.stringify(history));
  };

  return (
    <div className="col-span-1 md:block hidden dark:bg-zinc-800 bg-red-100 pt-3 px-2 overflow-y-auto">
      <h1 className="text-lg md:text-xl font-semibold dark:text-white text-zinc-800 flex items-center justify-between px-3">
        <span>Recent Search</span>
        <button onClick={clearHistory} className="cursor-pointer ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#EFEFEF"
          >
            <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
          </svg>
        </button>
      </h1>

      <ul className="text-left mt-3 space-y-1 max-h-[75vh] overflow-y-auto pr-1 hide-scrollbar">
        {recentHistory &&
          recentHistory.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center px-3 py-1"
            >
              <span
                onClick={() => setSelectedHistory(item)}
                className="flex-grow truncate dark:text-zinc-400 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 dark:hover:text-zinc-200 hover:bg-red-200 hover:text-zinc-800 rounded px-2 py-1"
              >
                {item}
              </span>
              <button
                onClick={() => clearSelectedHistory(item)}
                className="cursor-pointer hover:bg-zinc-900 bg-zinc-700 px-2 py-1 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#EFEFEF"
                >
                  <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                </svg>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RecentSearch;
