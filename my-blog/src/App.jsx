import { useState } from "react";
import React from "react";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import PostCard from "./component/PostCard";
import PostForm from "./component/PostForm";

function App() {
  const [post, setPost] = useState([
    {
      id: 1,
      title: "First Article",
      content: "This is the content of the first article.",
      date: "2026-04-06",
      likeCount: 9,
    },
    {
      id: 2,
      title: "Second Article",
      content: "This is the content of the second article.",
      date: "2026-04-07",
      likeCount: 6,
    },
  ]);

  const [showAddModel, setShowAddModel] = useState(false);

  function handleClickLikeButton(postId) {
    setPost((prevPost) =>
      prevPost.map((post) =>
        post.id === postId ? { ...post, likeCount: post.likeCount + 1 } : post,
      ),
    );
  }

  function handleDeleteCard(postId) {
    setPost((prevPost) => prevPost.filter((post) => post.id !== postId));
  }

  function handleAddPost(newPost) {
    setPost((prevPost) => [newPost, ...prevPost]);
  }

  return (
    <>
      <Header />
      <main>
        <button onClick={() => setShowAddModel(true)}>Add new article</button>
        {showAddModel && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "gray",
            }}
          >
            <div
              style={{
                background: "white",
                margin: "50px auto",
                width: "300px",
                padding: "20px",
              }}
            >
              <PostForm
                onAddPost={handleAddPost}
                onShowAddModel={setShowAddModel}
              />
              <button onClick={() => setShowAddModel(false)}>Cancel</button>
            </div>
          </div>
        )}
        {post.map((post) => (
          <React.Fragment key={post.id}>
            <PostCard
              key={post.id}
              title={post.title}
              content={post.content}
              date={post.date}
              likeCount={post.likeCount}
              onLike={() => handleClickLikeButton(post.id)}
              // Future improve: Might have performance issue
              onDelete={() => handleDeleteCard(post.id)}
            />
          </React.Fragment>
        ))}
      </main>
      <Footer />
    </>
  );
}

export default App;
