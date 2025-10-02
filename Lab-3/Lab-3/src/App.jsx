import ColorBoxesContainer from "./components/ColorBoxesContainer";
import { useState } from "react";
import data from "./data/data";
import "./App.css";

// Function to generate a random number between 0 and numItems - 1
function getRandomNumber(numItems) {
  return Math.floor(Math.random() * numItems);
}


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
        style={{ backgroundColor: data[Math.floor(randomNumber)] }}
      />

      {/* 
        Container component that renders 25 ColorBox components 
        Each ColorBox is clickable and changes its color randomly
      */}
      <ColorBoxesContainer />
    </div>
  );
}

export default App;