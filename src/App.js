import "./App.css";
import { useState, useEffect } from "react";
import Dropdown from "./components/Dropdown";
import axios from "axios";

function App() {
  const [languageList, setLanguageList] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

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
      });
  };

  return (
    <div className="App translate-app">
      <h1>Translation App</h1>
      <div className="translate-controls">
        <div>
          <div>
            <p>From:</p>
            <Dropdown value={from} valueUpdate={setFrom} data={languageList} />
          </div>
          <textarea
            value={input}
            onInput={(e) => setInput(e.target.value)}
            cols={50}
            rows={8}
            placeholder="Enter a phrase to translate"
          ></textarea>
        </div>
        <div>
          <div>
            <p>To:</p>
            <Dropdown value={to} valueUpdate={setTo} data={languageList} />
          </div>
          <textarea
            resize="false"
            value={output}
            cols={50}
            rows={8}
            readOnly
          ></textarea>
        </div>
      </div>
      <button onClick={translateMyText}>Translate</button>
    </div>
  );
}

export default App;
