import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  communityPosts,
  popularPosts,
  communityCategories,
} from './community.js'

import './community.css'

function Community() {
  const navigate = useNavigate()

  // ========================================
  // 상태 관리
  // ========================================

  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortType, setSortType] = useState('latest')
  const [currentPage, setCurrentPage] = useState(1)
  const [bookmarkedPosts, setBookmarkedPosts] = useState([])

  // 카테고리, 검색, 정렬 변경 시 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchTerm, sortType])

  // ========================================
  // 게시글 필터 및 정렬
  // ========================================

  const filteredPosts = communityPosts
    .filter((post) => {
      const categoryMatch =
        selectedCategory === '전체' ||
        post.category === selectedCategory

      const searchMatch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())

      return categoryMatch && searchMatch
    })
    .sort((a, b) => {
      if (sortType === 'popular') {
        return b.likes - a.likes
      }

      if (sortType === 'comments') {
        return b.comments - a.comments
      }

      return new Date(b.createdAt) - new Date(a.createdAt)
    })

  // ========================================
  // 페이지네이션
  // 실제 게시글 기준 8개씩 표시
  // ========================================

  const postsPerPage = 8

  const startIndex = (currentPage - 1) * postsPerPage

  const totalPages = Math.ceil(
    filteredPosts.length / postsPerPage
  )

  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  )

  // ========================================
  // 북마크
  // ========================================

  const toggleBookmark = (id) => {
    setBookmarkedPosts((prev) =>
      prev.includes(id)
        ? prev.filter((postId) => postId !== id)
        : [...prev, id]
    )
  }

  // ========================================
  // 게시글 상세 이동
  // 상세페이지 이동 시 스크롤 맨 위로
  // ========================================

  const goToCommunityDetail = (id) => {
    navigate(`/community/${id}`)
    window.scrollTo(0, 0)
  }

  // ========================================
  // 페이지 이동
  // 페이지 변경 후 최신 게시글 영역으로 스크롤
  // ========================================

  const handlePageChange = (page) => {
    setCurrentPage(page)

    setTimeout(() => {
      document
        .getElementById('community-latest')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    }, 0)
  }

  return (
    <main className="community">
      <div className="community-inner">

        {/* ========================================
            커뮤니티 인트로
        ======================================== */}

        <section className="community-intro">
          <div className="community-intro-text">

            <h1>
              별 일 없어도, 우리는 잘 지내.
            </h1>

            <p>
              하찮은 친구들과 보낸 오늘을 함께 나눠요.
            </p>

            {/* 카테고리 */}

            <div className="community-categories">
              {communityCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    selectedCategory === category
                      ? 'active'
                      : ''
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

          </div>

          {/* 인트로 배너 */}

          <div className="community-banner">
            <img
              src="https://lsylsh10-commits.github.io/shop-community-server/images/community/community banner.png"
              alt="커뮤니티 캐릭터 배너"
            />
          </div>
        </section>

        {/* ========================================
            인기 게시글
        ======================================== */}

        <section className="community-popular">
          <div className="community-section-title">

            <div>
              <h2>
                지금 많이 보고 있어요.
              </h2>

              <p>
                요즘 하찮은 친구들과의 따뜻한 이야기가 인기예요.
              </p>
            </div>

          </div>

          {/* 인기 게시글 목록 */}

          <div className="community-popular-list">
            {popularPosts.map((post, index) => (
              <article
                className="community-card"
                key={post.id}
                onClick={() => goToCommunityDetail(post.id)}
              >

                <div className="community-card-image">
                  <img
                    src={post.image}
                    alt={post.title}
                  />

                  <span className="community-rank">
                    {index + 1}
                  </span>
                </div>

                <div className="community-card-content">
                  <h3>{post.title}</h3>

                  <p>{post.content}</p>

                  {/* 작성자 정보 */}

                  <div className="community-card-meta">
                    <span className="community-profile"></span>
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>

                  {/* 좋아요 / 댓글 / 북마크 */}

                  <div className="community-card-bottom">

                    <div className="community-card-stats">

                      {/* 좋아요 */}

                      <span className="community-stat">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>

                        {post.likes}
                      </span>

                      {/* 댓글 */}

                      <span className="community-stat">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
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

                    {/* 북마크 */}

                    <button
                      type="button"
                      className={`community-bookmark ${
                        bookmarkedPosts.includes(post.id)
                          ? 'active'
                          : ''
                      }`}
                      aria-label="북마크"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleBookmark(post.id)
                      }}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M6 3h12v18l-6-4-6 4V3Z"
                          fill={
                            bookmarkedPosts.includes(post.id)
                              ? 'currentColor'
                              : 'none'
                          }
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>

                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========================================
            최신 게시글
        ======================================== */}

        <section
          className="community-latest"
          id="community-latest"
        >

          <div className="community-latest-head">

            <div>
              <h2>최신 게시글</h2>

              <p>
                하찮지만 소중한 이야기들이 모여 있어요.
              </p>
            </div>

            {/* 검색 / 정렬 / 글쓰기 */}

            <div className="community-tools">

              {/* 검색 */}

              <div className="community-search-box">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M16 16L21 21"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>

                <input
                  type="text"
                  placeholder="게시글, 태그, 사용자 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* 정렬 */}

              <select
                className="community-filter"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="latest">
                  최신순
                </option>

                <option value="popular">
                  인기순
                </option>

                <option value="comments">
                  댓글순
                </option>
              </select>

              {/* 글쓰기 */}

              <button
                type="button"
                className="community-write-button"
                onClick={() => navigate('/community/write')}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M13.5 8.5l3 3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>

                <span>글쓰기</span>
              </button>

            </div>
          </div>

          {/* ========================================
              최신 게시글 목록
          ======================================== */}

          <div className="community-latest-list">

            {currentPosts.length === 0 ? (

              <div className="community-empty">
                <p>검색 결과가 없어요.</p>

                <span>
                  다른 검색어나 카테고리를 선택해보세요.
                </span>
              </div>

            ) : (

              currentPosts.map((post) => (
                <article
                  className="community-latest-card"
                  key={post.id}
                  onClick={() => goToCommunityDetail(post.id)}
                >

                  {/* 게시글 이미지 */}

                  <div className="community-latest-image">
                    <img
                      src={post.image}
                      alt={post.title}
                    />
                  </div>

                  <div className="community-latest-content">

                    <h3>{post.title}</h3>

                    {/* 작성자 정보 */}

                    <div className="community-card-meta">
                      <span className="community-profile"></span>
                      <span>{post.author}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>

                    {/* 게시글 하단 */}

                    <div className="community-latest-bottom">

                      <div className="community-card-stats">

                        {/* 좋아요 */}

                        <span className="community-stat">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>

                          {post.likes}
                        </span>

                        {/* 댓글 */}

                        <span className="community-stat">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>

                          {post.comments}
                        </span>

                        {/* 태그 */}

                        {post.tags?.slice(0, 2).map((tag) => (
                          <span
                            className="community-tag"
                            key={tag}
                          >
                            #{tag}
                          </span>
                        ))}

                      </div>

                      {/* 북마크 */}

                      <button
                        type="button"
                        className={`community-bookmark ${
                          bookmarkedPosts.includes(post.id)
                            ? 'active'
                            : ''
                        }`}
                        aria-label="북마크"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleBookmark(post.id)
                        }}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M6 3h12v18l-6-4-6 4V3Z"
                            fill={
                              bookmarkedPosts.includes(post.id)
                                ? 'currentColor'
                                : 'none'
                            }
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </button>

                    </div>
                  </div>
                </article>
              ))

            )}

          </div>

          {/* ========================================
              페이지네이션
          ======================================== */}

          {totalPages > 0 && (
            <div className="community-pagination">

              {Array.from(
                { length: totalPages },
                (_, index) => {
                  const page = index + 1

                  return (
                    <button
                      key={page}
                      type="button"
                      className={
                        currentPage === page
                          ? 'active'
                          : ''
                      }
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  )
                }
              )}

              {/* 다음 페이지 */}

              {currentPage < totalPages && (
                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(currentPage + 1)
                  }
                  aria-label="다음 페이지"
                >
                  ›
                </button>
              )}

            </div>
          )}

        </section>
      </div>
    </main>
  )
}

export default Community