import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../styles/BestNew.css'

function BestNew() {
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
        console.error('BEST & NEW 상품 데이터 로딩 실패:', error)
        setProducts([])
      }
    }

    loadProducts()
  }, [])
  const [searchParams, setSearchParams] = useSearchParams()

  const initialTab =
    searchParams.get('tab') === 'new' ? 'new' : 'best'

  const [selectedTab, setSelectedTab] = useState(initialTab)
  const [likedProducts, setLikedProducts] = useState([])
  const [currentNewPage, setCurrentNewPage] = useState(1)

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState('all')

  const NEW_ITEMS_PER_PAGE = 8

  /* =========================
     BEST
  ========================= */

  const bestProducts = products.filter(
    (product) => product.isBest
  )

  const displayedBestProducts = bestProducts.slice(0, 6)

  /* =========================
     NEW
  ========================= */

  let newProducts = products.filter(
    (product) => product.isNew
  )

  /* 가격 필터 */

  if (selectedPrice === 'under10000') {
    newProducts = newProducts.filter(
      (product) => product.price <= 10000
    )
  }

  if (selectedPrice === '10000to20000') {
    newProducts = newProducts.filter(
      (product) =>
        product.price > 10000 &&
        product.price <= 20000
    )
  }

  if (selectedPrice === 'over20000') {
    newProducts = newProducts.filter(
      (product) => product.price > 20000
    )
  }

  /* 페이지네이션 */

  const totalNewPages = Math.ceil(
    newProducts.length / NEW_ITEMS_PER_PAGE
  )

  const newStartIndex =
    (currentNewPage - 1) * NEW_ITEMS_PER_PAGE

  const currentNewProducts = newProducts.slice(
    newStartIndex,
    newStartIndex + NEW_ITEMS_PER_PAGE
  )

  /* =========================
     HEART
  ========================= */

  const toggleLike = (productId) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  /* =========================
     TAB
  ========================= */

  const handleTabClick = (tab) => {
    setSelectedTab(tab)
    setSearchParams({ tab })

    const target = document.getElementById(
      tab === 'best' ? 'best-section' : 'new-section'
    )

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  /* =========================
     PRICE FILTER
  ========================= */

  const handlePriceFilter = (priceRange) => {
    setSelectedPrice(priceRange)
    setCurrentNewPage(1)
  }

  /* =========================
     HEART RENDER
  ========================= */

  const renderHeart = (product) => {
    const isLiked = likedProducts.includes(product.id)

    return (
      <button
        type="button"
        className={`best-new-heart ${
          isLiked ? 'is-liked' : ''
        }`}
        onClick={() => toggleLike(product.id)}
        aria-label={`${product.name} 찜하기`}
        aria-pressed={isLiked}
      >
        {isLiked ? '♥' : '♡'}
      </button>
    )
  }

  return (
    <main className="best-new-page">
      <div className="best-new-inner">

        {/* =========================
            BANNER
        ========================= */}

        <section className="best-new-banner">
          <img
            src="https://lsylsh10-commits.github.io/shop-community-server/images/shop/all-goods-banner.png"
            alt="BEST & NEW 배너"
          />
        </section>

        {/* =========================
            BEST / NEW TAB
        ========================= */}

        <section className="best-new-tabs">
          <button
            type="button"
            className={
              selectedTab === 'best' ? 'active' : ''
            }
            onClick={() => handleTabClick('best')}
          >
            BEST
          </button>

          <button
            type="button"
            className={
              selectedTab === 'new' ? 'active' : ''
            }
            onClick={() => handleTabClick('new')}
          >
            NEW
          </button>
        </section>

        {/* =========================
            BEST
        ========================= */}

        <section
          className="best-new-section"
          id="best-section"
        >
          <div className="best-new-section-header">
            <h2>BEST</h2>
            <p>요즘 자꾸 데려가는 친구들</p>
          </div>

          <div className="best-products-grid">
            {displayedBestProducts.map(
              (product, index) => (
                <article
                  className="best-new-card"
                  key={product.id}
                >
                  <div className="best-new-image">
                    <span className="best-new-rank">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <img
                      src={product.mainImage}
                      alt={product.name}
                    />
                  </div>

                  <div className="best-new-info">
                    <div>
                      <p className="best-new-name">
                        {product.name}
                      </p>

                      <strong className="best-new-price">
                        {product.price.toLocaleString()}원
                      </strong>
                    </div>

                    {renderHeart(product)}
                  </div>
                </article>
              )
            )}
          </div>
        </section>

        {/* =========================
            NEW
        ========================= */}

        <section
          className="best-new-section"
          id="new-section"
        >
          <div className="best-new-section-row">
            <div className="best-new-section-header">
              <h2>NEW</h2>
              <p>새로 온 하찮은 것들</p>
            </div>

            <div className="best-new-controls">

              <select
                className="best-new-sort"
                defaultValue="newest"
              >
                <option value="newest">최신순</option>
                <option value="recommended">추천순</option>
                <option value="popular">인기순</option>
                <option value="lowPrice">낮은순</option>
                <option value="highPrice">높은순</option>
              </select>

              <button
                type="button"
                className={`best-new-filter ${
                  selectedPrice !== 'all'
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  setIsFilterOpen((prev) => !prev)
                }
              >
                <img
                  src="https://lsylsh10-commits.github.io/shop-community-server/images/shop/icons/filter.svg"
                  alt=""
                  className="best-new-filter-icon"
                />

                <span>필터</span>
              </button>
            </div>
          </div>

          {/* =========================
              PRICE FILTER PANEL
          ========================= */}

          {isFilterOpen && (
            <div className="best-new-filter-panel">
              <p className="best-new-filter-title">
                가격대
              </p>

              <div className="best-new-filter-options">
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
                    selectedPrice === 'under10000'
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    handlePriceFilter('under10000')
                  }
                >
                  1만원 이하
                </button>

                <button
                  type="button"
                  className={
                    selectedPrice === '10000to20000'
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    handlePriceFilter('10000to20000')
                  }
                >
                  1만원 ~ 2만원
                </button>

                <button
                  type="button"
                  className={
                    selectedPrice === 'over20000'
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    handlePriceFilter('over20000')
                  }
                >
                  2만원 이상
                </button>
              </div>
            </div>
          )}

          {/* =========================
              NEW PRODUCT GRID
          ========================= */}

          <div className="new-products-grid">
            {currentNewProducts.map((product) => (
              <article
                className="best-new-card"
                key={product.id}
              >
                <div className="best-new-image">
                  <span className="best-new-badge">
                    NEW
                  </span>

                  <img
                    src={product.mainImage}
                    alt={product.name}
                  />
                </div>

                <div className="best-new-info">
                  <div>
                    <p className="best-new-name">
                      {product.name}
                    </p>

                    <strong className="best-new-price">
                      {product.price.toLocaleString()}원
                    </strong>
                  </div>

                  {renderHeart(product)}
                </div>
              </article>
            ))}
          </div>

          {/* =========================
              PAGINATION
          ========================= */}

          {totalNewPages > 1 && (
            <div className="best-new-pagination">
              {Array.from(
                { length: totalNewPages },
                (_, index) => {
                  const page = index + 1

                  return (
                    <button
                      type="button"
                      key={page}
                      className={
                        currentNewPage === page
                          ? 'active'
                          : ''
                      }
                      onClick={() =>
                        setCurrentNewPage(page)
                      }
                    >
                      {page}
                    </button>
                  )
                }
              )}

              {currentNewPage < totalNewPages && (
                <button
                  type="button"
                  className="best-new-pagination-next"
                  onClick={() =>
                    setCurrentNewPage((prev) =>
                      Math.min(
                        prev + 1,
                        totalNewPages
                      )
                    )
                  }
                  aria-label="다음 페이지"
                >
                  <img
                    src="https://lsylsh10-commits.github.io/shop-community-server/images/shop/icons/pagination-next.svg"
                    alt=""
                  />
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default BestNew