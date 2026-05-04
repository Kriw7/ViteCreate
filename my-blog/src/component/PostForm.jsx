import { useState, useEffect } from "react";
import { format } from "date-fns";

function PostForm({ onAddPost, onShowAddModel }) {
  const [title, setTitle] = useState(() => {
    const savedTitle = localStorage.getItem('last-title');
    return savedTitle ? savedTitle : "";
  });
  const [content, setContent] = useState(() => {
    const savedContent = localStorage.getItem('last-content');
    return savedContent ? savedContent : "";
  });

  useEffect(() => {
    if(title) {
      localStorage.setItem("last-title", title);
    } else {
      localStorage.removeItem("last-title");
    }
    if(content) {
      localStorage.setItem("last-content", content);
    } else {
      localStorage.removeItem("last-content");
    }
  }, [title, content]); 

  const handleClearAll = () => {
    setTitle("");
    setContent("");
  } 

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

    localStorage.removeItem("last-title");
    localStorage.removeItem("last-content");
    onShowAddModel(false);
  };

  return (
    <>
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
        <button type="button" onClick={() => handleClearAll()}>Clear the content</button>
      </form>
    </>
  );
}

export default PostForm;
