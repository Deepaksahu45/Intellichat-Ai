import { useState, useRef, useEffect } from "react";
import { URL } from "./Constant";
import RecentSearch from "./Components/RecentSearch";
import QuestionAnswer from "./Components/QuestionAnswer";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    if (!username) {
      const name = prompt("Please enter your name:");
      if (name) {
        const formattedName =
          name.trim().charAt(0).toUpperCase() + name.trim().slice(1);
        localStorage.setItem("username", formattedName);
        setUsername(formattedName);
      }
    }
  }, []);

  const askQuestion = async () => {
    if (!question && !selectedHistory) return;

    if (question) {
      let history = JSON.parse(localStorage.getItem("history")) || [];
      history = history.slice(0, 19);
      history = [question, ...history];
      history = history.map(
        (item) => item.charAt(0).toUpperCase() + item.slice(1).trim()
      );
      history = [...new Set(history)];
      localStorage.setItem("history", JSON.stringify(history));
      setRecentHistory(history);
    }

    const payloadData = question ? question : selectedHistory;

    const payload = {
      contents: [
        {
          parts: [{ text: payloadData }],
        },
      ],
    };

    setLoader(true);
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());

    setResult((prev) => [
      ...prev,
      { type: "q", text: question ? question : selectedHistory },
      { type: "a", text: dataString },
    ]);
    setQuestion("");

    setTimeout(() => {
      if (scrollToAns.current) {
        scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
      }
    }, 500);

    setLoader(false);
  };

  const isEnter = (event) => {
    if (event.key === "Enter") {
      askQuestion();
    }
  };

  useEffect(() => {
    if (selectedHistory) askQuestion();
  }, [selectedHistory]);

  return (
    <div className="dark:bg-zinc-900 bg-white min-h-screen text-zinc-800 dark:text-zinc-300">
      <div className="grid grid-cols-1 md:grid-cols-5 h-screen text-center">
        <RecentSearch
          recentHistory={recentHistory}
          setRecentHistory={setRecentHistory}
          setSelectedHistory={setSelectedHistory}
        />

        <div className="col-span-1 md:col-span-4 p-4 md:p-10 overflow-hidden">
          <h1 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700 mb-3">
            Intellichat Ai
          </h1>
          <h1 className="text-xl sm:text-4xl pb-2 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700">
            Hello {username || "User"}, Ask me Anything
          </h1>

          <div
            ref={scrollToAns}
            className="container h-2/3 mt-4 overflow-y-auto overflow-x-hidden mb-4 hide-scrollbar"
          >
            <ul>
              {result.map((item, index) => (
                <QuestionAnswer key={index} item={item} index={index} />
              ))}
            </ul>
          </div>

          <div className="dark:bg-zinc-800 bg-zinc-100 w-full sm:w-3/4 md:w-1/2 p-1 pr-3 m-auto border border-zinc-400 dark:border-zinc-700 flex h-14 sm:h-16 rounded-full">
            <input
              type="text"
              value={question}
              onKeyDown={isEnter}
              onChange={(event) => setQuestion(event.target.value)}
              className="w-full h-full p-3 outline-none bg-transparent"
              placeholder="Ask me anything"
            />
            <button onClick={askQuestion}>Ask</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
