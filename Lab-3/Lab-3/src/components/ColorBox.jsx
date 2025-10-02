import { useState } from "react";
import colors from "../data/data";

export default function ColorBox({ colorProp }) {
  const [color, setColor] = useState(colorProp);

  return (
    <div
      className="ColorBox"
      style={{ backgroundColor: color }}
      onClick={() => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        setColor(colors[randomIndex]);
      }}
    />
  );
}
