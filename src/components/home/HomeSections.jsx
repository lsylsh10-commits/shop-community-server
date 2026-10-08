import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  characters,
} from "../../data/homeData";



// 섹션 제목과 더보기
function SectionHeading({ title, href }) {
  return (
    <div className="home-section-heading">
      <h2>{title}</h2>

      <Link to={href} className="home-more">
        더보기 <span aria-hidden="true">›</span>
      </Link>
    </div>
  );
}


// 메인 비주얼 - 4장 자동 슬라이드
export function MainVisual() {
  const banners = [
    "https://lsylsh10-commits.github.io/shop-community-server/images/home/banner01.jpg",
    "https://lsylsh10-commits.github.io/shop-community-server/images/home/banner02.png",
    "https://lsylsh10-commits.github.io/shop-community-server/images/home/banner03.png",
    "https://lsylsh10-commits.github.io/shop-community-server/images/home/banner04.png",
  ];

  const [current, setCurrent] = useState(0);

  // 5초마다 자동 전환
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // 이전 / 다음 배너
  const previous = () => {
    setCurrent((prev) =>
      (prev - 1 + banners.length) % banners.length
    );
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  return (
    <section
      className="home-main-visual"
      aria-label="하찮 메인 배너"
    >
      {/* 배너 이미지 */}
      <div className="home-banner-slides">
        {banners.map((banner, index) => (
          <img
            key={banner}
            src={banner}
            alt={`하찮 메인 배너 ${index + 1}`}
            className={
              index === current ? "active" : ""
            }
          />
        ))}
      </div>

      {/* 이전 / 다음 버튼 */}
      <button
        type="button"
        className="home-banner-arrow prev"
        onClick={previous}
        aria-label="이전 배너"
      >
        ‹
      </button>

      <button
        type="button"
        className="home-banner-arrow next"
        onClick={next}
        aria-label="다음 배너"
      >
        ›
      </button>

      {/* 하단 페이지 표시 */}
      <div className="home-banner-dots">
        {banners.map((banner, index) => (
          <button
            key={banner}
            type="button"
            className={
              index === current ? "active" : ""
            }
            onClick={() => setCurrent(index)}
            aria-label={`${index + 1}번 배너 보기`}
            aria-current={
              index === current ? "true" : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}


// 캐릭터 카드
function CategoryCard({ character }) {
  return (
    <Link
      to={`/shop/products?character=${character.id}`}
      className="home-category-card"
    >
      <div className="home-category-image">
        <img
          src={character.image}
          alt={character.name}
          loading="lazy"
        />
      </div>

      <span>{character.name}</span>
    </Link>
  );
}


// 캐릭터 카테고리
export function CategorySection() {
  return (
    <section className="home-section">
      <SectionHeading
        title="오늘의 하찮은 친구들"
        href="/shop/products?character=all"
      />

      <div className="home-category-grid">
        {characters.map((character) => (
          <CategoryCard
            key={character.id}
            character={character}
          />
        ))}
      </div>
    </section>
  );
}


// 상품 카드
function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="home-product-card">
      <Link
        to={`/shop/${product.id}`}
        className="home-product-image"
        aria-label={product.name}
      >
        <img
          src={product.mainImage}
          alt={product.name}
          loading="lazy"
        />

        {product.isNew && (
          <span className="home-new-badge">
            NEW
          </span>
        )}
      </Link>

      <div className="home-product-info">
        <Link
          to={`/shop/${product.id}`}
          className="home-product-text"
        >
          <h3>{product.name}</h3>

          <strong>
            {product.price.toLocaleString("ko-KR")}원
          </strong>
        </Link>

        <button
          type="button"
          className={`home-like-button ${
            liked ? "is-liked" : ""
          }`}
          onClick={() => setLiked(!liked)}
          aria-label={
            liked ? "관심상품 해제" : "관심상품 등록"
          }
          aria-pressed={liked}
        >
          {liked ? "♥" : "♡"}
        </button>
      </div>
    </article>
  );
}


// NEW / BEST 공통 상품 섹션
export function ProductSection({
  title,
  products,
}) {
  const moreHref =
    title === "NEW FRIENDS"
      ? "/shop/best-new?tab=new"
      : title === "BEST GOODS"
        ? "/shop/best-new?tab=best"
        : "/shop";

  return (
    <section className="home-section">
      <SectionHeading
        title={title}
        href={moreHref}
      />

      <div className="home-product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}




// 커뮤니티 카드
function CommunityCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const detailHref = `/community/${post.id}`;

  return (
    <article className="home-community-card">
      <Link
        to={detailHref}
        className="home-community-image"
        aria-label={`${post.title} 상세글 보기`}
      >
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
        />
      </Link>

      <div className="home-community-content">
        <div className="home-community-user">
          <img
            src={post.characterImage}
            alt=""
          />

          <div>
            <strong>{post.author}</strong>
            <span>{post.time}</span>
          </div>
        </div>

        <Link
          to={detailHref}
          className="home-post-text"
        >
          {post.title}
        </Link>

        <div className="home-community-actions">

          {/* 좋아요 */}
          <button
            type="button"
            onClick={() => setLiked(!liked)}
            aria-pressed={liked}
            aria-label="좋아요"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={liked ? "#e77688" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
            </svg>

            <span>{post.likes + (liked ? 1 : 0)}</span>
          </button>

          {/* 댓글 */}
          <Link
            to={detailHref}
            aria-label="댓글 보기"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>

            <span>{post.comments}</span>
          </Link>

          {/* 북마크 */}
          <button
            type="button"
            className={`home-bookmark-button ${
              bookmarked ? "is-bookmarked" : ""
            }`}
            aria-label="게시글 저장"
            aria-pressed={bookmarked}
            onClick={() =>
              setBookmarked((prev) => !prev)
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={
                bookmarked ? "currentColor" : "none"
              }
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>

        </div>
      </div>
    </article>
  );
}


// 커뮤니티 미리보기
export function CommunityPreview() {
    const [communityPosts, setCommunityPosts] = useState([]);

  useEffect(() => {
    const loadCommunityPosts = async () => {
      try {
        const response = await fetch(
          "https://lsylsh10-commits.github.io/shop-community-server/data/shop-data.json"
        );

        if (!response.ok) {
          throw new Error("커뮤니티 데이터를 불러오지 못했습니다.");
        }

        const data = await response.json();
        const products = data.products || [];

        const posts = [
          {
            ...products
              .find((product) => product.id === 1)
              ?.communityReviews.find(
                (review) => review.id === "product-1-02"
              ),
            characterImage:
              "https://lsylsh10-commits.github.io/shop-community-server/images/shop/popo.png",
          },
          {
            ...products
              .find((product) => product.id === 2)
              ?.communityReviews.find(
                (review) => review.id === "product-2-01"
              ),
            characterImage:
              "https://lsylsh10-commits.github.io/shop-community-server/images/shop/jjagi.png",
          },
        ].filter((post) => post.id);

        setCommunityPosts(posts);
      } catch (error) {
        console.error("홈 커뮤니티 데이터 로딩 실패:", error);
        setCommunityPosts([]);
      }
    };

    loadCommunityPosts();
  }, []);  
  return (
    <section className="home-section">
      <SectionHeading
        title="하찮은 친구들은 오늘 뭐했을까?"
        href="/community"
      />

      <div className="home-community-grid">
        {communityPosts.map((post) => (
          <CommunityCard
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </section>
  );
}


// 브랜드 스토리 배너
export function PromotionBanner() {
  return (
    <section
      className="home-promotion"
      aria-label="하찮 브랜드 스토리"
    >
      <picture>
        <img
          src="https://lsylsh10-commits.github.io/shop-community-server/images/home/promotion.jpg"
          alt="별일 없어도, 우리는 잘 지내. 하찮은 친구들의 브랜드 스토리"
          loading="lazy"
        />
      </picture>
    </section>
  );
}