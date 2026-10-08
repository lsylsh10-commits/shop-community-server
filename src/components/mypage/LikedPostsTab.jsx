import { useNavigate } from "react-router-dom";
import { likedPosts } from "../../data/mypage";

function LikedPostsTab() {
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/community/${postId}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="mypage-tab-content">
      <h1>저장한 게시물</h1>

      <div className="mypage-full-post-list">
        {likedPosts.map((post) => (
          <article
            key={post.id}
            className="mypage-post"
            onClick={() => handlePostClick(post.id)}
            style={{ cursor: "pointer" }}
          >
            <img src={post.image} alt="" />

            <div className="mypage-post__content">
              <h3>{post.title}</h3>
              <time>{post.date}</time>

              <div className="mypage-post__meta">
                <span>♡ {post.likes}</span>
                <span>○ {post.comments}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LikedPostsTab;