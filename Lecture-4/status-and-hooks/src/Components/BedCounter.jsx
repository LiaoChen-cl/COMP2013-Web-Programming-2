// This is not the correct way to store, manipulate, and display state in React

export default function BedCounter() {
    let count = 0
    return(
        <div>
            <p>Count: {count}</p>
            <button onClick={() => { 
                count++; 
                console.log(count) }}
                >
                    Add to Count
            </button>
        </div>
    )
}