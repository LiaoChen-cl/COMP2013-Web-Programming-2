import ColorBox from "./ColorBox";
import "../App.css";
import colors from "../data/data";

export default function ColorBoxesContainer() {
  return (
    <div className="ColorBoxesContainer">
      {colors.map((color, index) => (
        <ColorBox key={index} colors={colors} />
      ))}


    </div>
  );
}
