import { Link } from "react-router";

function PostCard(props) {
  return (
    <div
      className="post-card"
      style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
    >
      <h3><Link to={`/posts/${props.id}`}> {props.title}</Link></h3>
      <p>{props.content}</p>
      <p>{props.date}</p>
      <button onClick={props.onLike}>
        👍 {props.likeCount > 0 ? props.likeCount : 0}
      </button>
      <button onClick={props.onDelete}> Delete </button>
    </div>
  );
}

export default PostCard;
