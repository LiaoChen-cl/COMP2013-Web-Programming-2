import "../App.css"; 

export default function PostCard({ post }) {
  return (
    <div className="card">
       {/* Display post */}
      <h3>{post.title}</h3>
      <br />
      <p>{post.body}</p>
    </div>
  );
}
