import ColorBox from "./ColorBox";
import "../App.css";


// "ColorBoxesContainer" that will take a colors array as a prop. 
// This component should populate all 25 colour boxes
export default function ColorBoxesContainer({ colors }) {
  return (
    <div className="ColorBoxesContainer">
      {colors.map((color,index) => (
        <ColorBox key={index} />
      ))}


    </div>
  );
}
