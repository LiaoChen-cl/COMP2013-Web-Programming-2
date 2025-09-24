const clickMessage = () => {
    console.log('Button clicked!');
}

export default function Clicker() {
    //to make an external function work properly in the event handler, we need to remove
    return <button onClick={clickMessage}>Click me</button>;

}
