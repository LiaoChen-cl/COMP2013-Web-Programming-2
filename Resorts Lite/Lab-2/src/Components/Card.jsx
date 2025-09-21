export default function Card(props) {
  // Determine rating color: green if > 4, otherwise red
  const ratingColor = props.rating > 4 ? "Rating-Green" : "Rating-Red";

  return (
    //  add conditional styling using props
    <div className="Card-Component">
      <img src={props.image} alt={props.hotel} />
      <h2>{props.country}</h2>
      <p className="hotel">{props.hotel}</p>
      <p className={ratingColor}>{props.rating}★</p>
      <p className="price">${props.price}/night</p>
    </div>
  );
}
