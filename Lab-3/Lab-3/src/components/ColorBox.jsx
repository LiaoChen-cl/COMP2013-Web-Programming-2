import { useState } from "react";
import colors from "../data/data";

// "ColorBox," which accepts a colour prop. The ColorBox should be clickable, 
// //and clicking on it should change its colour randomly
export default function ColorBox({ colour }) {
 
  // Initialize the state 'color' with the prop 'colour' if provided; 
// otherwise, pick a random color from the 'colors' array
  const [color, setColor] = useState(
    colour ?? colors[Math.floor(Math.random() * colors.length)]
  );

  return (
    <div
      className="ColorBox"
      style={{ backgroundColor: color }}
      onClick={() =>
        setColor(colors[Math.floor(Math.random() * colors.length)])
      }
    />
  );
}
