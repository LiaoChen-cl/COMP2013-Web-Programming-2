import './App.css'
import Listing from './Components/Listing'
import ListingContainer from './Components/ListingContainer';
import data from './data/data';

function App() {
 
  return (
    <>
      <h1>Resorts life</h1>
      <ListingContainer items={data}/>

    </>
  
  );
}

export default App
