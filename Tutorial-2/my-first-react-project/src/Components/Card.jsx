export default function Card(props) {
  return (
    <div className={props.sale ? "Card-Component Card-Sale-Glow" : "Card-Component"}>
      <img src={props.image} alt="" width="100" />
      <h2>{props.name}</h2>
      {props.sale ? <h3 className="Card-Sale">Sale</h3> : <h3>&nbsp;</h3>}
      <p>{props.price}</p>
      <button>Buy now</button>
    </div>
  );
}

//props.sale && “message" => if props.sale === true, show "message"
//props.sale || “message" => if props.sale === false, show "message"