import React, { useState } from "react";
import ReactDOM from "react-dom/client";

// VERY SIMPLE ONE-FILE MAFIA GAME APP

function App() {
  // ----- STATE -----
  const [screen, setScreen] = useState("start");
  const [currentRound, setCurrentRound] = useState(1);
  const mafia = "Lady Whiskers";

  // Story for each round
  const story = [
    "Round 1: She collapsed! Someone poisoned her coffee! Everyone reacts differently, but clues are unclear.",
    "Round 2: A rare poisonous herb is found in the cup. Security footage shows someone lingering, but unclear who.",
    "Round 3: Interviews reveal odd behavior, and there's a faint coffee smell near Lady Whiskers' purse.",
    "Round 4: A tiny smudge on a napkin holder and a vague shadow in footage. Nothing certain.",
    "Round 5: Detective reveals the mafia: Lady Whiskers!"
  ];

  // ----- FUNCTIONS -----

  function startGame() {
    setCurrentRound(1);
    setScreen("round");
  }

  function continueRound() {
    if (currentRound < 5) {
      setCurrentRound(currentRound + 1);
      setScreen("round");
    } else {
      setScreen("end");
    }
  }

  function guessMafia() {
    setScreen("vote");
  }

  function vote(name) {
    if (name === mafia) {
      setScreen("end");
    } else {
      setScreen("wrong");
    }
  }

  function restart() {
    setCurrentRound(1);
    setScreen("start");
  }

  // ----- UI COMPONENT (ALL SIMPLE INLINE STYLES) -----
  const btn = {
    padding: "10px 20px",
    margin: "10px",
    fontSize: "18px",
    cursor: "pointer"
  };

  const box = {
    padding: "20px",
    fontSize: "20px",
    maxWidth: "600px",
    margin: "auto",
    textAlign: "center"
  };

  // ----- SCREENS -----

  if (screen === "start") {
    return (
      <div style={box}>
        <h1>The Case of the Poisoned Coffee</h1>
        <button style={btn} onClick={startGame}>Start Game</button>
      </div>
    );
  }

  if (screen === "round") {
    return (
      <div style={box}>
        <h2>Round {currentRound}</h2>
        <p>{story[currentRound - 1]}</p>
        <button style={btn} onClick={continueRound}>Continue</button>
        <button style={btn} onClick={guessMafia}>Guess Mafia</button>
      </div>
    );
  }

  if (screen === "vote") {
    const characters = [
      "Detective Pickles",
      "Lady Whiskers",
      "Professor Boom",
      "Officer Donut",
      "Quiet Farmer Bob",
      "Chef Pepperoni",
      "Tina Torch"
    ];

    return (
      <div style={box}>
        <h2>Who is the Mafia?</h2>
        {characters.map((c) => (
          <button key={c} style={btn} onClick={() => vote(c)}>{c}</button>
        ))}
      </div>
    );
  }

  if (screen === "wrong") {
    return (
      <div style={box}>
        <h2>Wrong Guess!</h2>
        <p>That character is not the mafia.</p>
        <button style={btn} onClick={continueRound}>Continue Story</button>
        <button style={btn} onClick={restart}>Restart Game</button>
      </div>
    );
  }

  if (screen === "end") {
    return (
      <div style={box}>
        <h1>Game Over</h1>
        <h2>The Mafia Was: Lady Whiskers</h2>
        <button style={btn} onClick={restart}>Play Again</button>
      </div>
    );
  }
}

// ----- RENDER APP -----
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
