import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [headline, setHeadline] = useState("");
  const [article, setArticle] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    fake: 0,
    suspicious: 0,
    genuine: 0,
  });

  const [history, setHistory] = useState([]);

  const analyzeNews = async () => {
    if (!headline || !article) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://fake-news-backend-dolg.onrender.com/api/news/analyze",
        {
          headline,
          article,
        }
      );

      setResult(response.data);

      setHistory((prev) => [
        {
          headline,
          result: response.data.result,
          confidence: response.data.confidence,
        },
        ...prev,
      ]);

      setStats((prev) => ({
        total: prev.total + 1,

        fake:
          response.data.result ===
            "Likely Fake"
            ? prev.fake + 1
            : prev.fake,

        suspicious:
          response.data.result ===
            "Suspicious"
            ? prev.suspicious + 1
            : prev.suspicious,

        genuine:
          response.data.result ===
            "Likely Genuine"
            ? prev.genuine + 1
            : prev.genuine,
      }));

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getResultColor = () => {
    if (!result) return "#333";

    if (result.result === "Likely Fake") return "red";
    if (result.result === "Suspicious") return "orange";

    return "green";
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="heading">
          📰 Fake News Detector
        </h1>

        <div className="statsBox">
          <div className="statCard">
            <h3>{stats.total}</h3>
            <p>Total Checks</p>
          </div>

          <div className="statCard">
            <h3>{stats.fake}</h3>
            <p>Fake</p>
          </div>

          <div className="statCard">
            <h3>{stats.suspicious}</h3>
            <p>Suspicious</p>
          </div>

          <div className="statCard">
            <h3>{stats.genuine}</h3>
            <p>Genuine</p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Enter headline"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="input"
        />

        <textarea
          placeholder="Paste article content..."
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          className="textarea"
        />

        <button
          onClick={analyzeNews}
          className="button"
        >
          {loading
            ? "⏳ Analyzing..."
            : "🔍 Analyze News"}
        </button>

        <button
          onClick={() => {
            setHeadline("");
            setArticle("");
            setResult(null);
          }}
          className="resetButton"
        >
          Reset
        </button>

        {history.length > 0 && (
          <div className="historyBox">
            <h3>Recent Checks</h3>

            {history.map((item, index) => (
              <div
                key={index}
                className="historyCard"
              >
                <strong>
                  {item.headline}
                </strong>

                <p>
                  {item.result} (
                  {item.confidence}%)
                </p>
              </div>
            ))}
          </div>
        )}

        {result && (
          <div className="resultBox">
            <div
              style={{
                background: getResultColor(),
                color: "white",
                display: "inline-block",
                padding: "10px 20px",
                borderRadius: "25px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              {result.result}
            </div>

            <p>
              <strong>Confidence:</strong>{" "}
              {result.confidence}%
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {result.category}
            </p>

            {/* Progress Bar */}
            <div className="progressContainer">
              <div
                className="progressFill"
                style={{
                  width: `${result.confidence}%`,
                  backgroundColor: getResultColor(),
                }}
              />
            </div>

            <h3>Why this result?</h3>

            <div className="reasonContainer">
              {result.reasons.length > 0 ? (
                result.reasons.map((reason, index) => (
                  <div
                    key={index}
                    className="reasonCard"
                  >
                    ⚠️ {reason}
                  </div>
                ))
              ) : (
                <div className="goodCard">
                  ✅ No suspicious patterns detected
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default App;