import { useState } from "react";

/* ---------- MATH (PURE FUNCTIONS) ---------- */
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function prob(i, j, theta) {
  return sigmoid(theta[i] - theta[j]);
}

function generateComparisons(theta, numItems, numSamples) {
  const comps = [];

  for (let k = 0; k < numSamples; k++) {
    let i = Math.floor(Math.random() * numItems);
    let j = Math.floor(Math.random() * numItems);
    while (j === i) {
      j = Math.floor(Math.random() * numItems);
    }

    const p = sigmoid(theta[i] - theta[j]);
    const winner = Math.random() < p ? i : j;

    comps.push({ i, j, winner });
  }

  return comps;
}

function fitBradleyTerry(comparisons, numItems, lr = 0.1, steps = 200) {
  let theta = Array(numItems).fill(0);
  const lossHistory = [];

  for (let step = 0; step < steps; step++) {
    let totalLoss = 0;

    for (const c of comparisons) {
      const i = c.i;
      const j = c.j;
      const y = c.winner === i ? 1 : 0;

      const p = sigmoid(theta[i] - theta[j]);
      const error = y - p;

      // gradient update
      theta[i] += lr * error;
      theta[j] -= lr * error;

      // negative log-likelihood
      totalLoss += -(
        y * Math.log(p + 1e-8) +
        (1 - y) * Math.log(1 - p + 1e-8)
      );
    }

    totalLoss /= comparisons.length;
    lossHistory.push(totalLoss);

    // identifiability fix (mean zero)
    const mean =
      theta.reduce((a, b) => a + b, 0) / numItems;
    theta = theta.map((v) => v - mean);
  }

  return { theta, lossHistory };
}

/* ---------- SVG LOSS CURVE ---------- */
function lossToSvgPath(lossHistory, width, height) {
  if (lossHistory.length === 0) return "";

  const maxLoss = Math.max(...lossHistory);
  const minLoss = Math.min(...lossHistory);

  return lossHistory
    .map((loss, i) => {
      const x = (i / (lossHistory.length - 1)) * width;
      const y =
        height -
        ((loss - minLoss) / (maxLoss - minLoss + 1e-8)) * height;
      return `${i === 0 ? "M" : "L"} ${x},${y}`;
    })
    .join(" ");
}

/* ---------- APP ---------- */
function App() {
  const [items] = useState(["A", "B", "C", "D"]);
  const [thetaTrue, setThetaTrue] = useState([1, 0.5, -0.5, -1]);

  const [comparisons, setComparisons] = useState([]);
  const [numSamples, setNumSamples] = useState(50);

  const [thetaHat, setThetaHat] = useState(
    Array(items.length).fill(0)
  );
  const [lossHistory, setLossHistory] = useState([]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Bradley–Terry Visualizer</h1>

      {/* ---- TRUE STRENGTHS ---- */}
      <h3>True Strengths (θ)</h3>
      {items.map((item, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <label>
            {item}: {thetaTrue[i].toFixed(2)}
          </label>
          <br />
          <input
            type="range"
            min="-3"
            max="3"
            step="0.1"
            value={thetaTrue[i]}
            onChange={(e) => {
              const copy = [...thetaTrue];
              copy[i] = parseFloat(e.target.value);
              setThetaTrue(copy);
            }}
          />
        </div>
      ))}

      {/* ---- GENERATE DATA ---- */}
      <h3>Generate Preference Data</h3>
      <label>Number of comparisons: {numSamples}</label>
      <br />
      <input
        type="range"
        min="10"
        max="500"
        step="10"
        value={numSamples}
        onChange={(e) => setNumSamples(parseInt(e.target.value))}
      />
      <br /><br />
      <button
        onClick={() => {
          const comps = generateComparisons(
            thetaTrue,
            items.length,
            numSamples
          );
          setComparisons(comps);
        }}
      >
        Generate Comparisons
      </button>

      {/* ---- PROBABILITY MATRIX ---- */}
      <h3>Pairwise Win Probabilities</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th></th>
            {items.map((item, i) => (
              <th key={i}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((itemI, i) => (
            <tr key={i}>
              <th>{itemI}</th>
              {items.map((_, j) => (
                <td key={j}>
                  {i === j ? "-" : prob(i, j, thetaTrue).toFixed(2)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---- SAMPLE COMPARISONS ---- */}
      <h4>Sample Comparisons</h4>
      <ul>
        {comparisons.slice(0, 10).map((c, idx) => (
          <li key={idx}>
            {items[c.i]} vs {items[c.j]} → winner:{" "}
            <b>{items[c.winner]}</b>
          </li>
        ))}
      </ul>

      {/* ---- LEARNING ---- */}
      <h3>Learn Strengths from Preferences</h3>
      <button
        onClick={() => {
          if (comparisons.length === 0) return;
          const result = fitBradleyTerry(
            comparisons,
            items.length
          );
          setThetaHat(result.theta);
          setLossHistory(result.lossHistory);
        }}
      >
        Fit Bradley–Terry Model
      </button>

      {/* ---- TRUE vs LEARNED ---- */}
      <h3>True vs Learned Strengths</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Item</th>
            <th>True θ</th>
            <th>Learned θ̂</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item}</td>
              <td>{thetaTrue[i].toFixed(2)}</td>
              <td>{thetaHat[i].toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---- LOSS CURVE (SVG) ---- */}
      <h3>Training Loss Curve</h3>
      <svg width="400" height="200" style={{ border: "1px solid black" }}>
        <path
          d={lossToSvgPath(lossHistory, 400, 200)}
          fill="none"
          stroke="blue"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export default App;
