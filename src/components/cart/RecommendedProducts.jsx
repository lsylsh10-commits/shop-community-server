import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RecommendedProducts({ products }) {
  const navigate = useNavigate();

  // 추천상품 찜 상태
  const [likedProducts, setLikedProducts] = useState([]);

  // 상품 상세페이지 이동
  const handleProductClick = (productId) => {
    navigate(`/shop/${productId}`);
  };

  // 전체 상품 페이지 이동
  const handleMoreClick = () => {
    navigate("/shop/products");
    window.scrollTo(0, 0);
  };

  const handleLike = (event, productId) => {
    event.stopPropagation();

    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="cart-recommend">
      <div className="cart-recommend__header">
        <h2>같이 데려가면 좋은 친구들</h2>

        <button
          type="button"
          className="cart-recommend__more"
          onClick={handleMoreClick}
        >
          전체보기
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="cart-recommend__grid">
        {products.map((product) => {
          const isLiked = likedProducts.includes(product.id);

          return (
            <article
              key={product.id}
              className="cart-recommend-card"
              onClick={() => handleProductClick(product.id)}
            >
              <button
                type="button"
                className="cart-recommend-card__image-button"
                onClick={() => handleProductClick(product.id)}
                aria-label={`${product.name} 상품 보기`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-recommend-card__image"
                />
              </button>

              <div className="cart-recommend-card__bottom">
                <div className="cart-recommend-card__info">
                  <h3>{product.name}</h3>

                  <strong>
                    {product.price.toLocaleString()}원
                  </strong>
                </div>

                <button
                  type="button"
                  className="cart-recommend-card__like"
                  onClick={(event) =>
                    handleLike(event, product.id)
                  }
                  aria-label={
                    isLiked
                      ? `${product.name} 찜 해제`
                      : `${product.name} 찜하기`
                  }
                  aria-pressed={isLiked}
                >
                  <img
                    src={
                      isLiked
                        ? "https://lsylsh10-commits.github.io/shop-community-server/images/cart/hearton.svg"
                        : "https://lsylsh10-commits.github.io/shop-community-server/images/cart/heartoff.svg"
                    }
                    alt=""
                  />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default RecommendedProducts;