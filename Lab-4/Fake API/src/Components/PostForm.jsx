import "../App.css"; 

export default function PostForm({ newPost, handleChange, handleSubmit }) {
  return (
    <div className="postform-card">  
    <h2>Post Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
         {/* Input for post title */}
        <input 
          type="text" 
          id="title"
          name="title" 
          value={newPost.title} 
          onChange={handleChange} 
        />
        <br />
      
        {/* Input for post body */}
        <label htmlFor="body">Body:</label>
        <input 
          id="body"
          name="body" 
          value={newPost.body} 
          onChange={handleChange} 
        />
        <br />
        <br />
        {/* Submit button to add new post */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
