import { useState } from "react";


export default function ColorBox({ colors }) {
  const [color, setColor] = useState(
    colors[Math.floor(Math.random() * colors.length)]
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
