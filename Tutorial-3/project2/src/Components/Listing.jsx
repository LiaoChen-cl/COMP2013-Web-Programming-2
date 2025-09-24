export default function Listing(props) {
    return (
    <div className="listing">
        <h2>{props.country}</h2>
        <img src={props.pic} alt="" width="100" />
        <h3>{props.location}</h3>
        <p>Rating: {props.rating} ★</p>
        <p>Price: {props.price}</p>
    </div>
    );
}