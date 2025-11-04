export default function FormComponent({
  todo = { title: "" },
  handleOnChange,
  handleAddToDo,
  handleSubmit
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={todo.title}
          onChange={handleOnChange}
        />
        <button type="button" onClick={handleAddToDo}>Add task to list</button>
      </form>
    </div>
  );
}
