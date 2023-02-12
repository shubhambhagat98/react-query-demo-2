import { useState } from "react";
import "./App.css";
import PostsList1 from "./PostsList1";
import PostsList2 from "./PostsList2";
import Post from "./Post";
import { CreatePost } from "./CreatePost";
import { PostListInfinite } from "./PostListInfinite";
import { PostListPaginated } from "./PostListPaginated";
import { useQueryClient } from "@tanstack/react-query";
import { getPost } from "./api/posts";

// /posts -> ["posts"]
// /posts/1 -> ["posts", post.id]
// /posts?authorId=1 -> ["posts", {authorId: 1}]
// /posts/2/comments -> ["posts", post.id, "comments"]

function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);
  const queryClient = useQueryClient();

  function onHoverPostOneLink() {
    queryClient.prefetchQuery({
      queryKey: ["posts", 1],
      queryFn: () => getPost(1),
    });
  }

  return (
    <div className="App">
      <h1>TanStack Query</h1>

      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        <h3>Posts List 1</h3>
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        <h3>Posts List 2</h3>
      </button>
      <button
        onMouseEnter={onHoverPostOneLink}
        onClick={() => setCurrentPage(<Post id={1} />)}
      >
        <h3>First Post</h3>
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        <h3>New Post</h3>
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        <h3>Post List Paginated</h3>
      </button>
      <button onClick={() => setCurrentPage(<PostListInfinite />)}>
        <h3>Post List Infinite</h3>
      </button>
      <br />
      {currentPage}
    </div>
  );
}

export default App;
