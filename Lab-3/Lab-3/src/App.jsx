import ColorBoxesContainer from "./components/ColorBoxesContainer";
import { useState } from "react";
import colors from "./data/data"; 
import "./App.css";

// Function to generate a random number between 0 and numItems - 1
function getRandomNumber(numItems) {
  return Math.floor(Math.random() * numItems);
}

// import the "colors" list, defined as an array of hexadecimal strings representing colours, from "data.js.
function App() {
  const numItems = 25; // Total number of colors in the data array
  // Declare a state variable 'randomNumber' to store the current random index
  const [randomNumber, setRandomNumber] = useState(getRandomNumber(numItems));

  return (
    <div className="App">
      <h1>Lab-3: Hooks and States</h1>

      {/* Single clickable color box that changes color randomly when clicked*/}
      <div
        className="RandomNumber"
        onClick={() => setRandomNumber(getRandomNumber(numItems))}
        style={{ backgroundColor: colors[Math.floor(randomNumber)] }}
      />

      {/* 
        Container component that renders 25 ColorBox components 
        Each ColorBox is clickable and changes its color randomly
      */}
      <ColorBoxesContainer colors={colors} />
    </div>
  );
}

export default App;