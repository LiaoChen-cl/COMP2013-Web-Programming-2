import { useState } from "react";
import colors from "../data/data";

export default function ColorBox() {
  // 每个 box 自己随机选择初始颜色
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
