export default function ToDoCard({ 
    title, 
    checked, 
    handleOnCheck, 
    handleOnDelete,
    index
}) {
  return (
    <div>
    {/* Checkbox to mark the todo item as completed or not */}
      <input 
        type="checkbox" 
        name="checked" 
        checked={checked} 
        onChange={(e) => handleOnCheck(e, index)} />
      {/* Display the title of the todo item inside a span */}
      <span style={{ textDecoration: checked ? 'line-through' : 'none' }}>
        {title}
      </span>
      <button onClick={()=> handleOnDelete(index)}>Delete</button>
    </div>
  );
}
