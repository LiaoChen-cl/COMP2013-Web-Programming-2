import{ useState } from 'react';
export default function Counter() {

    // we define the variable and setter function than we assign useState to them
    // and add the initial value foe the variable as a argument for useState function

    let intitialState = 2000;
    const [counter, setCounter] = useState(intitialState);

    return<div>
        <p>Count: {counter}</p>
        <button 
            onClick={() => {
                setCounter(counter + 1); 
                
            }}
        >Add to Count
        </button>

         <button 
            onClick={() => {
                setCounter(counter - 1); 
                
            }}
        >Subtract to counter
        </button>
        <button onClick={() => setCounter(intitialState)}>Reset</button>
           
        </div>
}