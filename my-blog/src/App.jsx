import { useState } from "react";
import React from "react";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import PostCard from "./component/PostCard";
import LikeButton from "./component/LikeButton";

function App() {
  const [post, setPost] = useState([
    {
      id: 1,
      title: "First Article",
      content: "This is the content of the first article.",
      date: "2026-04-06",
    },
    {
      id: 2,
      title: "Second Article",
      content: "This is the content of the second article.",
      date: "2026-04-07",
    },
  ]);

  return (
    <>
      <Header />
      <p>Test</p>
      <main>
        {post.map((post) => (
          <React.Fragment key={post.id}>
            <PostCard
              key={post.id}
              title={post.title}
              content={post.content}
              date={post.date}
            />
            <LikeButton />
          </React.Fragment>
        ))}
      </main>
      <Footer />
    </>
  );
}

export default App;
