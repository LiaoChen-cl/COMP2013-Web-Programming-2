import './App.css'
import Clicker from './Components/Clicker';
import ClickerWithProps from './Components/ClickerWithProps';
import EmptyForm from './Components/EmptyForm';
import Listing from './Components/Listing'
import ListingContainer from './Components/ListingContainer';
import data from './data/data';

function App() {
 
  return (
    <>
      <h1>Resorts life</h1>
      <ListingContainer items={data}/>
      <br />
      <Clicker />
      <EmptyForm />
      <ClickerWithProps message={"This is a click message as a prop"} 
      btnText="Click me for message" />
      <ClickerWithProps message={"This is another message for another component"}
      btnText="Click 2" />
    </>
  
  );
}

export default App;

