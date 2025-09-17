export default function Card(props) {
  return (
    <div className="Card-Component">
      <img src={props.image} alt="" width="100" />
      <h2>Princess</h2>
      <p>$1,350</p>
    </div>
  );
}
