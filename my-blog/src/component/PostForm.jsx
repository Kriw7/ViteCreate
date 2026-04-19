import { useState } from "react";
import { format } from "date-fns";

function PostForm({ onAddPost, onShowAddModel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") {
      alert("The title and content can't be empty!");
      return;
    }

    onAddPost({
      id: Date.now(),
      title: title,
      content: content,
      date: format(new Date(), "yyyy-MM-dd"),
      likeCount: 0,
    });

    alert("New article added!");

    onShowAddModel(false);

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="The title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="The content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Add new article</button>
    </form>
  );
}

export default PostForm;
