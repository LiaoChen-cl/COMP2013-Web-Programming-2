import './App.css'
import BedCounter from './Components/BedCounter'  
import Counter from './Components/Counter';
import CounterWithLimits from './Components/CounterWithLimits';
import Toggle from './Components/toggle';
import EmojiStore from './Components/EmojiStore';   

function App() {
  return (
    <>
      <BedCounter />
      <Counter />
      <CounterWithLimits />
      <Toggle />
      <EmojiStore />
    </>
  );
}

export default App;
