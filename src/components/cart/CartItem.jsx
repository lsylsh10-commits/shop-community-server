import { useNavigate } from "react-router-dom";

function CartItem({
  product,
  selected,
  onSelect,
  onIncrease,
  onDecrease,
  onDelete,
  onToggleLike,
}) {
  const navigate = useNavigate();

  const goToProductDetail = () => {
    navigate(`/shop/${product.id}`);
  };

  return (
    <article className="cart-item">
      <div className="cart-item__check">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(product.id)}
          aria-label={`${product.name} 선택`}
        />
      </div>

      <div
        className="cart-item__image"
        onClick={goToProductDetail}
        style={{ cursor: "pointer" }}
      >
        <img src={product.image} alt={product.name} />
      </div>

      <div className="cart-item__content">
        <div className="cart-item__top">
          <div>
            <h3
              className="cart-item__name"
              onClick={goToProductDetail}
              style={{ cursor: "pointer" }}
            >
              {product.name}
            </h3>

            <p className="cart-item__option">
              옵션: {product.options.join(", ")}
            </p>

            <strong className="cart-item__price">
              {product.price.toLocaleString()}원
            </strong>
          </div>

          <button
            type="button"
            className={`cart-item__like ${
              product.liked ? "is-active" : ""
            }`}
            onClick={() => onToggleLike(product.id)}
            aria-label={
              product.liked
                ? `${product.name} 찜 해제`
                : `${product.name} 찜하기`
            }
            aria-pressed={product.liked}
          >
            <img
              src={
                product.liked
                  ? "https://lsylsh10-commits.github.io/shop-community-server/images/cart/hearton.svg"
                  : "https://lsylsh10-commits.github.io/shop-community-server/images/cart/heartoff.svg"
              }
              alt=""
            />
          </button>
        </div>

        <div className="cart-item__bottom">
          <div className="cart-quantity">
            <button
              type="button"
              onClick={() => onDecrease(product.id)}
              disabled={product.quantity <= 1}
              aria-label="수량 줄이기"
            >
              −
            </button>

            <span>{product.quantity}</span>

            <button
              type="button"
              onClick={() => onIncrease(product.id)}
              aria-label="수량 늘리기"
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="cart-item__delete"
            onClick={() => onDelete(product.id)}
          >
            삭제
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItem;