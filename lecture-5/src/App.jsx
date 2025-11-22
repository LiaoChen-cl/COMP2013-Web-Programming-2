import './App.css';
import data from './data/data';
import ProductCardsContainer from './Components/ProductCardsContainer.jsx';

function App() {
  return (
    <>
      <ProductCardsContainer data={data} />
    </>
  );
}


export default App
