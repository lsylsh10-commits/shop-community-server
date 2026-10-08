import { useEffect, useState } from 'react'

import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import { communityPosts } from './community.js'

import '../styles/ProductList.css'

function ProductList() {
  const navigate = useNavigate()
    const [products, setProducts] = useState([])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(
          'https://lsylsh10-commits.github.io/shop-community-server/data/shop-data.json'
        )

        if (!response.ok) {
          throw new Error('상품 데이터를 불러오지 못했습니다.')
        }

        const data = await response.json()

        setProducts(data.products || [])
      } catch (error) {
        console.error('상품 데이터 로딩 실패:', error)
        setProducts([])
      }
    }

    loadProducts()
  }, [])
  const [searchParams, setSearchParams] =
    useSearchParams()

  const characterParam =
    searchParams.get('character')

  const categoryParam =
    searchParams.get('category')

  // 헤더에서 전달된 검색어
  const searchParam =
    searchParams.get('search') || ''

  // 헤더 검색으로 들어온 경우에만 통합검색 모드
  const isHeaderSearch =
    Boolean(searchParam.trim())

  // URL 기준으로 화면 상태 결정
  const isCharacterOpen =
    characterParam !== null

  const selectedCharacter =
    characterParam === 'all'
      ? null
      : characterParam

  const selectedCategory =
    categoryParam || 'all'

  const characterOptions = [
    { id: 'all', label: '전체' },
    { id: 'popo', label: '포포' },
    { id: 'mungchi', label: '뭉치' },
    { id: 'jjagi', label: '짝이' },
    { id: 'bbangi', label: '빵이' },
    { id: 'bandi', label: '반디' },
    { id: 'giuni', label: '기운이' },
  ]

  const characterSearchMap = {
    popo: '포포',
    mungchi: '뭉치',
    jjagi: '짝이',
    bbangi: '빵이',
    bandi: '반디',
    giuni: '기운이',
  }

  const [currentPage, setCurrentPage] =
    useState(1)

  const [selectedSort, setSelectedSort] =
    useState('recommended')

  const [isFilterOpen, setIsFilterOpen] =
    useState(false)

  const [selectedPrice, setSelectedPrice] =
    useState('all')

  const [likedProducts, setLikedProducts] =
    useState([])

  // 헤더 검색어가 있으면 검색창에 반영
  const [searchTerm, setSearchTerm] =
    useState(searchParam)

  const [windowWidth, setWindowWidth] =
    useState(window.innerWidth)

  // 헤더에서 새로운 검색어가 들어오면
  // ProductList 검색창과 상품 결과도 같이 변경
  useEffect(() => {
    setSearchTerm(searchParam)
    setCurrentPage(1)
  }, [searchParam])

  // 화면 크기 확인
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener(
      'resize',
      handleResize
    )

    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      )
    }
  }, [])

  // 페이지당 상품 수
  // PC 8 / 태블릿 6 / 모바일 8
  const ITEMS_PER_PAGE =
    windowWidth <= 767
      ? 8
      : windowWidth <= 1199
        ? 6
        : 8

  useEffect(() => {
    setCurrentPage(1)
  }, [ITEMS_PER_PAGE])

  // 찜
  const handleToggleLike = (productId) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter(
            (id) => id !== productId
          )
        : [...prev, productId]
    )
  }

  // 일반 카테고리
  const handleCategoryClick = (category) => {
    setSearchTerm('')
    setCurrentPage(1)

    if (category === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({
        category,
      })
    }
  }

  // 캐릭터
  const handleCharacterClick = (
    characterId
  ) => {
    setSearchTerm('')
    setCurrentPage(1)

    setSearchParams({
      character: characterId,
    })
  }

  // 전체 상품으로 바로 이동
  const handleGoToAllProducts = () => {
    setSearchTerm('')
    setCurrentPage(1)

    navigate('/shop/products')
  }

  // ProductList 자체 검색
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  // 정렬
  const handleSortChange = (e) => {
    setSelectedSort(e.target.value)
    setCurrentPage(1)
  }

  // 가격 필터
  const handlePriceFilter = (
    priceRange
  ) => {
    setSelectedPrice(priceRange)
    setCurrentPage(1)
  }

  // =========================
  // 상품 필터링
  // =========================

  const normalizedSearchTerm =
    searchTerm.trim().toLowerCase()

  let filteredProducts = products

  /*
    검색어가 있을 때는
    현재 카테고리/캐릭터 선택에 갇히지 않고
    전체 상품에서 검색
  */
  if (normalizedSearchTerm) {
    filteredProducts =
      products.filter((product) => {
        const productName =
          product.name
            ?.toLowerCase() || ''

        const characterNames =
          product.characters
            ?.map(
              (characterId) =>
                characterSearchMap[
                  characterId
                ] || ''
            )
            .join(' ')
            .toLowerCase() || ''

        return (
          productName.includes(
            normalizedSearchTerm
          ) ||
          characterNames.includes(
            normalizedSearchTerm
          )
        )
      })
  } else {
    // 일반 카테고리 필터
    if (selectedCategory !== 'all') {
      filteredProducts =
        filteredProducts.filter(
          (product) =>
            product.categories?.includes(
              selectedCategory
            )
        )
    }

    // 캐릭터 필터
    if (isCharacterOpen) {
      if (selectedCharacter) {
        filteredProducts =
          filteredProducts.filter(
            (product) =>
              product.characters?.includes(
                selectedCharacter
              )
          )
      } else {
        filteredProducts =
          filteredProducts.filter(
            (product) =>
              Array.isArray(
                product.characters
              ) &&
              product.characters.length > 0
          )
      }
    }
  }

  // 가격 필터
  if (selectedPrice === 'under10000') {
    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.price <= 10000
      )
  }

  if (
    selectedPrice === '10000to20000'
  ) {
    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.price > 10000 &&
          product.price <= 20000
      )
  }

  if (selectedPrice === 'over20000') {
    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.price > 20000
      )
  }

  // =========================
  // 게시글 검색
  // 헤더 검색일 때만 사용
  // =========================

  const normalizedHeaderSearch =
    searchParam.trim().toLowerCase()

  const relatedPosts =
    isHeaderSearch
      ? communityPosts
          .filter((post) => {
            const title =
              post.title?.toLowerCase() || ''

            const content =
              post.content?.toLowerCase() || ''

            const author =
              post.author?.toLowerCase() || ''

            const tags =
              Array.isArray(post.tags)
                ? post.tags
                    .map((tag) => {
                      const tagText =
                        String(tag)

                      return `${tagText} ${
                        characterSearchMap[
                          tagText
                        ] || ''
                      }`
                    })
                    .join(' ')
                    .toLowerCase()
                : ''

            const postSearchText = [
              title,
              content,
              author,
              tags,
            ]
              .join(' ')
              .toLowerCase()

            return postSearchText.includes(
              normalizedHeaderSearch
            )
          })
          .slice(0, 4)
      : []

  // =========================
  // 정렬
  // =========================

  const sortedProducts = [
    ...filteredProducts,
  ].sort((a, b) => {
    if (selectedSort === 'newest') {
      return b.id - a.id
    }

    if (selectedSort === 'popular') {
      return (
        (b.popularity || 0) -
        (a.popularity || 0)
      )
    }

    if (selectedSort === 'lowPrice') {
      return a.price - b.price
    }

    if (selectedSort === 'highPrice') {
      return b.price - a.price
    }

    return 0
  })

  // =========================
  // 페이지네이션
  // =========================

  const totalPages = Math.ceil(
    sortedProducts.length /
      ITEMS_PER_PAGE
  )

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE

  const currentProducts =
    sortedProducts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    )

  // 모바일 페이지 변경 시
  // 상품 목록 시작 위치로 이동
  const handlePageChange = (page) => {
    setCurrentPage(page)

    if (window.innerWidth <= 767) {
      setTimeout(() => {
        document
          .getElementById('product-list-results')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
      }, 0)
    }
  }

  return (
    <main className="product-list-page">
      <div className="product-list-inner">

        {/* ========================================
            일반 상품 페이지에서만
            배너 + 카테고리 표시
        ======================================== */}
        {!isHeaderSearch && (
          <>
            {/* BANNER */}
            <section className="product-list-banner">
              <img
                src={
                  isCharacterOpen
                    ? 'https://lsylsh10-commits.github.io/shop-community-server/images/shop/character-banner.png'
                    : 'https://lsylsh10-commits.github.io/shop-community-server/images/shop/all-goods-banner.png'
                }
                alt={
                  isCharacterOpen
                    ? '캐릭터 상품 배너'
                    : '전체 상품 배너'
                }
              />
            </section>

            {/* CATEGORY */}
            {isCharacterOpen ? (
              <section className="product-list-category product-list-character-category">
                {characterOptions.map(
                  (character) => (
                    <button
                      type="button"
                      key={character.id}
                      className={
                        character.id === 'all'
                          ? !selectedCharacter
                            ? 'active'
                            : ''
                          : selectedCharacter ===
                              character.id
                            ? 'active'
                            : ''
                      }
                      onClick={() =>
                        handleCharacterClick(
                          character.id
                        )
                      }
                    >
                      {character.label}
                    </button>
                  )
                )}

                <button
                  type="button"
                  className="product-list-back-button"
                  onClick={handleGoToAllProducts}
                >
                  전체 상품으로 돌아가기
                </button>
              </section>
            ) : (
              <section className="product-list-category">
                <button
                  type="button"
                  className={
                    selectedCategory === 'all'
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    handleCategoryClick('all')
                  }
                >
                  전체
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleCharacterClick('all')
                  }
                >
                  캐릭터
                </button>

                <button
                  type="button"
                  className={
                    selectedCategory ===
                    'commute'
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    handleCategoryClick(
                      'commute'
                    )
                  }
                >
                  출근/등교
                </button>

                <button
                  type="button"
                  className={
                    selectedCategory === 'life'
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    handleCategoryClick('life')
                  }
                >
                  생활
                </button>

                <button
                  type="button"
                  className={
                    selectedCategory === 'desk'
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    handleCategoryClick('desk')
                  }
                >
                  데스크
                </button>

                <button
                  type="button"
                  className={
                    selectedCategory === 'gift'
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    handleCategoryClick('gift')
                  }
                >
                  선물
                </button>
              </section>
            )}
          </>
        )}

        {/* 헤더 검색 결과 제목 */}
        {isHeaderSearch && (
          <div className="product-list-search-result-head">
            <h1>
              “{searchParam}” 검색 결과
            </h1>
          </div>
        )}

        {/* TOOLBAR */}
        <div
          className="product-list-toolbar"
          id="product-list-results"
        >
          <p className="product-list-count">
            상품 {filteredProducts.length}개
          </p>

          <div className="product-list-controls">

            {/* PC / TABLET SEARCH */}
            <div className="product-list-search product-list-search-desktop">
              <input
                type="text"
                value={searchTerm}
                onChange={
                  handleSearchChange
                }
                placeholder="상품 검색"
                aria-label="상품 검색"
              />

              <span
                className="product-list-search-icon"
                aria-hidden="true"
              >
                ⌕
              </span>
            </div>

            {/* SORT */}
            <select
              className="product-list-sort"
              value={selectedSort}
              onChange={handleSortChange}
            >
              <option value="recommended">
                추천순
              </option>

              <option value="newest">
                최신순
              </option>

              <option value="popular">
                인기순
              </option>

              <option value="lowPrice">
                낮은순
              </option>

              <option value="highPrice">
                높은순
              </option>
            </select>

            {/* FILTER */}
            <button
              type="button"
              className={`product-list-filter ${
                selectedPrice !== 'all' ||
                searchTerm
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                setIsFilterOpen(
                  !isFilterOpen
                )
              }
            >
              <img
                src="https://lsylsh10-commits.github.io/shop-community-server/images/shop/icons/filter.svg"
                alt=""
                className="product-list-filter-icon"
              />

              <span>필터</span>
            </button>
          </div>
        </div>

        {/* FILTER PANEL */}
        {isFilterOpen && (
          <div className="product-filter-panel">

            {/* MOBILE SEARCH */}
            <div className="product-list-search product-list-search-mobile">
              <input
                type="text"
                value={searchTerm}
                onChange={
                  handleSearchChange
                }
                placeholder="상품 검색"
                aria-label="상품 검색"
              />

              <span
                className="product-list-search-icon"
                aria-hidden="true"
              >
                ⌕
              </span>
            </div>

            <p className="product-filter-title">
              가격대
            </p>

            <div className="product-filter-options">
              <button
                type="button"
                className={
                  selectedPrice === 'all'
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  handlePriceFilter('all')
                }
              >
                전체
              </button>

              <button
                type="button"
                className={
                  selectedPrice ===
                  'under10000'
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  handlePriceFilter(
                    'under10000'
                  )
                }
              >
                1만원 이하
              </button>

              <button
                type="button"
                className={
                  selectedPrice ===
                  '10000to20000'
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  handlePriceFilter(
                    '10000to20000'
                  )
                }
              >
                1만원 ~ 2만원
              </button>

              <button
                type="button"
                className={
                  selectedPrice ===
                  'over20000'
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  handlePriceFilter(
                    'over20000'
                  )
                }
              >
                2만원 이상
              </button>
            </div>
          </div>
        )}

        {/* PRODUCT GRID */}
        {currentProducts.length > 0 ? (
          <section className="product-list-grid">
            {currentProducts.map(
              (product) => {
                const isLiked =
                  likedProducts.includes(
                    product.id
                  )

                return (
                  <article
                    className="product-list-card"
                    key={product.id}
                    onClick={() =>
                      navigate(
                        `/shop/${product.id}`
                      )
                    }
                  >
                    <div className="product-list-image">
                      <img
                        src={
                          product.mainImage
                        }
                        alt={product.name}
                      />
                    </div>

                    <div className="product-list-info">
                      <div>
                        <p className="product-list-name">
                          {product.name}
                        </p>

                        <strong className="product-list-price">
                          {product.price.toLocaleString()}
                          원
                        </strong>
                      </div>

                      <button
                        type="button"
                        className={`product-list-heart ${
                          isLiked
                            ? 'is-liked'
                            : ''
                        }`}
                        aria-label={`${product.name} 관심상품 등록`}
                        aria-pressed={
                          isLiked
                        }
                        onClick={(e) => {
                          e.stopPropagation()

                          handleToggleLike(
                            product.id
                          )
                        }}
                      >
                        {isLiked
                          ? '♥'
                          : '♡'}
                      </button>
                    </div>
                  </article>
                )
              }
            )}
          </section>
        ) : (
          <div className="product-list-empty">
            검색 결과가 없습니다.
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="product-list-pagination">
            {Array.from(
              {
                length: totalPages,
              },
              (_, index) => {
                const page =
                  index + 1

                return (
                  <button
                    type="button"
                    key={page}
                    className={
                      currentPage ===
                      page
                        ? 'active'
                        : ''
                    }
                    onClick={() =>
                      handlePageChange(page)
                    }
                  >
                    {page}
                  </button>
                )
              }
            )}
          </div>
        )}

        {/* ========================================
            HEADER SEARCH - COMMUNITY RESULTS
            헤더 검색일 때만 표시
        ======================================== */}
        {isHeaderSearch && (
          <section className="product-list-community-results">

            <div className="product-list-community-head">
              <div>
                <h2>관련 게시글</h2>

                <p>
                  “{searchParam}”와 관련된 이야기를 모아봤어요.
                </p>
              </div>
            </div>

            {relatedPosts.length > 0 ? (
              <div className="product-list-community-grid">
                {relatedPosts.map((post) => (
                  <article
                    className="product-list-community-card"
                    key={post.id}
                    onClick={() =>
                      navigate(
                        `/community/${post.id}`
                      )
                    }
                  >
                    <div className="product-list-community-image">
                      <img
                        src={post.image}
                        alt={post.title}
                      />
                    </div>

                    <div className="product-list-community-content">
                      <h3>
                        {post.title}
                      </h3>

                      <p className="product-list-community-text">
                        {post.content}
                      </p>

                      <div className="product-list-community-meta">
                        <span>
                          {post.author}
                        </span>

                        <span>·</span>

                        <span>
                          {post.date}
                        </span>
                      </div>

                      <div className="product-list-community-bottom">
                        <span>
                          ♡ {post.likes}
                        </span>

                        <span>
                          댓글 {post.comments}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="product-list-community-empty">
                관련 게시글이 없습니다.
              </div>
            )}

          </section>
        )}

      </div>
    </main>
  )
}

export default ProductList