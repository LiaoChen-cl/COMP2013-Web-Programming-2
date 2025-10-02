import ColorBox from "./ColorBox";
import colors from "../data/data";

export default function ColorBoxesContainer() {
  const initialColors = colors.slice(0, 25); 
  return (
    <div className="ColorBoxesContainer">
      {initialColors.map((color, index) => (
        <ColorBox key={index} colorProp={color} />
      ))}
    </div>
  );
}
