import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import PostCard from "./component/PostCard";
import PostForm from "./component/PostForm";
import Admonition from "./Admonition";
import { Route, Routes } from "react-router";
import PostDetail from "./component/PostDetail";
import About from "./component/About";

function App() {
  // 从 localStorage 恢复数据，没有就用默认值
  const [post, setPost] = useState(() => {
    const savedPosts = localStorage.getItem("my-blog-posts");
    return savedPosts
      ? JSON.parse(savedPosts)
      : [
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
        ];
  });

  const [admonition, setAdmonition] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddModel,   setShowAddModel] = useState(false);

  useEffect(() => {
    localStorage.setItem("my-blog-posts", JSON.stringify(post));

    if (post.length === 0) {
      document.title = "My Blog - Write your first article!";
    } else {
      document.title = `My Blog (${post.length} articles)`;
    }
  }, [post]);

  async function loadPosts() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setAdmonition(data.slice(0, 10));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function handleClickLikeButton(postId) {
    setPost((prevPost) =>
      prevPost.map((p) =>
        p.id === postId ? { ...p, likeCount: p.likeCount + 1 } : p,
      ),
    );
  }

  function handleDeleteCard(postId) {
    setPost((prevPost) => prevPost.filter((p) => p.id !== postId));
  }

  function handleAddPost(newPost) {
    setPost((prevPost) => [newPost, ...prevPost]);
  }

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element = {
            <>
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
            {post.map((item) => (
              <React.Fragment key={item.id}>
                <PostCard
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  content={item.content}
                  date={item.date}
                  likeCount={item.likeCount}
                  onLike={() => handleClickLikeButton(item.id)}
                  // Future improve: Might have performance issue
                  onDelete={() => handleDeleteCard(item.id)}
                />
              </React.Fragment>
            ))}
            <h2>🌐 Explore Posts</h2>
            {loading && (
              <div className="status-loading">
                <div className="spinner"></div>
                Loading explore posts...
              </div>
            )}

            {!loading && error && (
              <div className="error-box">
                <p>❌ Failed to load: {error}</p>
                <button onClick={() => loadPosts()}>Retry</button>
              </div>
            )}

            {!loading &&
              !error &&
              admonition.map((item) => (
                <React.Fragment key={item.id}>
                  <Admonition
                    key={item.id}
                    title={item.title}
                    content={item.body}
                  />
                </React.Fragment>
              ))} 
            </>
          }/>

          <Route path='/posts/:id' element={<PostDetail posts={post} />}/>

          <Route path='/about' element={<About/>}/>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
