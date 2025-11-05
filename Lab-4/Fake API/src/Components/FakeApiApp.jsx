import { useState, useEffect } from "react";
import PostsContainer from "./PostsContainer";
import PostForm from "./PostForm";

export default function FakeApiApp() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  
  // State to store posts fetched from API and newly added posts
  const [data, setData] = useState([]);
  // State to indicate whether data is still loading
  const [loading, setLoading] = useState(true);
  // State to store the new post being created in the form
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  // Fetch posts from API when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);
  
  // Function to fetch posts from the fake API
  const fetchPosts = async () => {
    const response = await fetch(URL);
    const posts = await response.json();
    setData(posts);
    setLoading(false);
  };

  // Handle changes in form inputs (title and body)
  const handleChange = (e) => {
    setNewPost(prevPost => ({
      ...prevPost,
      [e.target.name]: e.target.value // Update the corresponding field dynamically
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevent adding empty posts
    if (!newPost.title || !newPost.body) return;

    // Generate a new ID for the post
   const newId = data.length + 1;   
   // Create a new post object
   const postToAdd = { ...newPost, id: newId };

    // Add new post to the beginning of the data array (descending order)
    setData(prevData => [postToAdd, ...prevData]); 
    // Reset form inputs
    setNewPost({ title: "", body: "" }); 

  };

  return (
    <div>
      <h1>Fake API Posts</h1>
      <PostForm 
        newPost={newPost} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
      />
       {/* Loading indicator or posts list (true: show loading, false: show posts)*/}
      {loading ? <p>Loading posts...</p> : <PostsContainer posts={data} />}
    </div>
  );
}
