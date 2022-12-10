import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [size, setSize] = useState("small");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    generateImage(prompt, size);
  };

  const handleChange = (e) => {
    setSize(e.target.prompt);
  };

  const generateImage = async (prompt, size) => {
    try {
      const response = await fetch(
        "http://localhost:5001/openai/generateimage",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt,
            size,
          }),
        }
      );

      const data = await response.json();
      setImage(data);
      if (!response.ok) {
        throw new Error("That image could not be generated");
      }
    } catch (error) {
      throw new Error("That image could not be generated");
    }
  };

  return (
    <div className="App">
      <header>
        <div className="navbar">
          <div className="logo">
            <h2>OpenAI Image Generator</h2>
          </div>
          <div className="nav-links">
            <ul>
              <li>
                <a href="https://beta.openai.com/docs" target="_blank">
                  OpenAI API Docs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main>
        <section className="showcase">
          <form id="image-form" onSubmit={handleSubmit}>
            <h1>Describe An Image</h1>
            <div className="form-control">
              <input
                type="text"
                id="prompt"
                placeholder="Enter Text"
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="form-control">
              <select name="size" id="size" onChange={handleChange}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn"
              onClick={() => {
                setLoading(true);
              }}
            >
              {loading && (
                <FontAwesomeIcon className="spinner" icon={faSpinner} />
              )}
              Generate
            </button>
          </form>
        </section>

        <section className="image">
          <div className="image-container">
            <img src={image.data} alt="" id="image" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
