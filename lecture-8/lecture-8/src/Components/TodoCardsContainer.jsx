import ToDoCard from "./ToDoCard";

export default function TodoCardsContainer({ 
  todolists, 
  handleOnCheck, 
  handleOnDelete 
}) {
  return (
    <div>
      {todolists.map((item, index) => (
        <ToDoCard 
          {...item}
          handleOnCheck={ handleOnCheck} 
          handleOnDelete={handleOnDelete} 
          key={index}  
          index={index}
        />
      ))}
    </div>
  );
}
