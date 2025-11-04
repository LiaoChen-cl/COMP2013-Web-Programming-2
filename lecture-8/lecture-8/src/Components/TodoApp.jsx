import { useState } from 'react';
import FormComponent from './FormComponent';
import TodoCardsContainer from './TodoCardsContainer';

export default function TodoApp() {
  const [todo, setTodo] = useState({
    title: "",
    checked: false,
  });

  const [todoList, setTodoList] = useState([]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todo.title === ""){
      alert("Please add a title first before adding a item");
    }else{
      setTodoList(prevList => {
         return [...prevList, todo];
      }
       
      );
    setTodo({ 
      title: "", 
      checked: false });
    }
    
  };

  const handleOnChange = (e) => {
  // This function will handle the onChange event to enable change on the title input in FormComponent
  setTodo((prevTodo) => {
    return {
      ...prevTodo,
      [e.target.name]: e.target.value,
    };
  });
};
  
  const handleOnChecked = (e, index) => {
  // This function will handle the checked form for the todo item
  // If the index matches the index of the item we are clicking on,
  // change the checked value to the current value
  setTodoList(
    todoList.map((item, i) =>
      i === index ? { ...item, checked: e.target.checked } : item
    )
  );
};


  const handleOnDelete = (index) =>
  // This function will handle the deletion of an item
  setTodoList((prevList) => {
    return prevList.filter((item, i) => i !== index);
  });

  return (
    <div>
      <h1>Todo List</h1>
      <FormComponent
        handleOnChange={handleOnChange}
        handleAddToDo={handleAddTodo}
        todo={todo}
      />
      <TodoCardsContainer
        handleOnCheck={handleOnChecked}
        handleOnDelete={handleOnDelete}
        todolists={todoList}
      />
    </div>
  );
}
