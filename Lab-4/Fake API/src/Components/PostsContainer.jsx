import PostCard from "./PostCard";

export default function PostsContainer({ posts }) {
  return (
    <div>
      {/* Map through posts array and render each post using PostCard */}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
