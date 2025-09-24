import Listing from './Listing'; // import the Listing component to be used inside this component
export default function ListingContainer({ items }) {
  return (
    <div className="ListingContainer">
      {items.map((item) => (
        <Listing key={item.id} {...item} />
          
      ))}
    </div>
  );

  //<div className="ListingContainer">
      //{items.map((item) => (
        //<Listing
          //key={item.id}
          //pic={item.pic}
          //country={item.country}
          //location={item.location}
          //rating={item.rating}
          //price={item.price}
        ///>
      //))}
    //</div>
  //let listings = [];// empty array to store all  the new listings of data
    //items.forEach(item => {
        //listings.push(
        //<Listing
            //pic={item.pic}
            //country={item.country}
            //location={item.location}
            //rating={item.rating}
            //price={item.price} />
        //);
    //});
    //return <div className="ListingContainer">{listings}</div>; // return all the new listings after filling out the array
   
}


   


