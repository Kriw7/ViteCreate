import { useParams, Link } from "react-router";
import ReactMarkdown from "react-markdown";

function PostDetail({posts}) {
    const {id} = useParams();
    const post = posts.find((p) => p.id === Number(id));

    if(!post) {
        return (
            <div>
                <p>文章不存在</p>
                <Link to="/">返回首页</Link>
            </div>
        );
    }

    return(
       <article>
        <h3>{post.title}</h3>
        <ReactMarkdown>{post.content}</ReactMarkdown>
        <p>{post.date}</p>
        <p>{post.likeCount}</p>
        <Link to="/">返回首页</Link>
       </article>
    );
}

export default PostDetail;