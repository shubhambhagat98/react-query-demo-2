import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { createPost } from "./api/posts";
import Post from "./Post";

export function CreatePost({ setCurrentPage }) {
  const titleRef = useRef();
  const bodyRef = useRef();
  const queryClient = useQueryClient();
  const {
    data,
    isError,
    error,
    isLoading,
    mutate: createNewPost,
  } = useMutation({
    mutationFn: createPost,
    // onMutate: (newPost) => {
    //   console.log("On Mutate called!", newPost);
    //   return { hi: "Hi, from On Mutate" };
    // },
    onSuccess: (data, newPost, context) => {
      //   console.log("printing context inside on Success :", context);
      queryClient.setQueryData(["posts", data.id], data);
      queryClient.invalidateQueries(["posts"], { exact: true });
      setCurrentPage(<Post id={data.id} />);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    createNewPost({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
  }

  return (
    <div>
      {isError && JSON.stringify(error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title </label>
          <input id="title" ref={titleRef} />
        </div>
        <br />
        <div>
          <label htmlFor="body">Body </label>
          <input id="body" ref={bodyRef} />
        </div>
        <br />
        <button disabled={isLoading}>
          {isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
}
