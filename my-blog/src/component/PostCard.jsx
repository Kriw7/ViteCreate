function PostCard(props) {
  return (
    <div
      className="post-card"
      style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
    >
      <h3>{props.title}</h3>
      <p>{props.content}</p>
      <p>{props.date}</p>
      <button onClick={props.deleteCard}> Delete </button>
    </div>
  );
}

export default PostCard;
