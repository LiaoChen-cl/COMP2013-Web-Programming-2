//This is a event onClick function aka handler
const msgOnClick = (msg) => console.log(msg);


export default function ClickerWithProps({ message, btnText }) {
    //if a handler has parameter and needs an argument,
    //we must use a lamda function into the event
  return <button onClick={() => msgOnClick(message)}>{btnText}</button>;
}
