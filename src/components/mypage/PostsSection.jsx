import { useNavigate } from "react-router-dom";
import { savedPosts, myPosts } from "../../data/mypage";

function PostList({ title, posts }) {
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/community/${postId}`);
  };

  return (
    <section className="mypage-post-group">
      <div className="mypage-post-group__header">
        <h2>{title}</h2>
      </div>

      <div>
        {posts.map((post) => (
          <article
            key={post.id}
            className="mypage-post"
            onClick={() => handlePostClick(post.id)}
            style={{ cursor: "pointer" }}
          >
            <img src={post.image} alt="" />

            <div className="mypage-post__content">
              <h3>{post.title}</h3>

              {post.date && <time>{post.date}</time>}

              <div className="mypage-post__meta">
                <span>♡ {post.likes}</span>

                <span>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    style={{
                      width: "14px",
                      height: "14px",
                      verticalAlign: "-2px",
                      marginRight: "4px",
                    }}
                  >
                    <path
                      d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>

                  {post.comments}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PostsSection() {
  return (
    <div className="mypage-posts">
      <PostList title="저장한 게시물" posts={savedPosts} />
      <PostList title="내가 쓴 글" posts={myPosts} />
    </div>
  );
}

export default PostsSection;