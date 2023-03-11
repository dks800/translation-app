import "./App.css";
import { useState, useEffect } from "react";
import Dropdown from "./components/Dropdown";
import axios from "axios";
import Loading from "./components/Loading";
import API_Loading from "./img/infinite-loading.gif";

function App() {
  const [languageList, setLanguageList] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isAPILoading, setIsAPILoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://libretranslate.de/languages", {
        headers: { accept: "application/json" },
      })
      .then((res) => {
        setLanguageList(res?.data);
      });
  }, []);

  const translateMyText = () => {
    if (!to || !from) return alert("Please select To/From language");
    if (!input || input.length < 1)
      return alert("Please enter text to translate");
    setIsAPILoading(true);
    let params = new URLSearchParams();
    params.append("q", input);
    params.append("source", from);
    params.append("target", to);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
    axios
      .post("https://libretranslate.de/translate", params, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setOutput(res?.data?.translatedText);
        setIsAPILoading(false);
      })
      .catch((err) => {
        console.err(err);
        setIsAPILoading(false);
      });
  };

  return (
    <div className="App translate-app">
      <h1 className="translation-title">
        <img
          className="translation-logo"
          src="https://img.freepik.com/free-icon/language_318-410798.jpg"
          alt="Translation Logo"
        />{" "}
        Translation App
      </h1>
      <div className="translate-controls">
        <div>
          <div>
            <p>From:</p>
            {languageList.length < 1 ? (
              <Loading />
            ) : (
              <Dropdown
                value={from}
                valueUpdate={setFrom}
                data={languageList}
              />
            )}
          </div>
          <textarea
            value={input}
            onInput={(e) => setInput(e.target.value)}
            cols={40}
            rows={8}
            placeholder="Enter a phrase to translate"
          ></textarea>
        </div>
        <div>
          <div>
            <p>To:</p>
            {languageList.length < 1 ? (
              <Loading />
            ) : (
              <Dropdown value={to} valueUpdate={setTo} data={languageList} />
            )}
          </div>
          <textarea
            resize="false"
            value={output}
            cols={40}
            rows={8}
            readOnly
          ></textarea>
        </div>
      </div>
      {isAPILoading ? (
        <img
          className="api-loading"
          title="Loading..."
          src={API_Loading}
          alt="Loading..."
        />
      ) : (
        <button onClick={translateMyText}>Translate</button>
      )}
    </div>
  );
}

export default App;
