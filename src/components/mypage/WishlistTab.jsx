import { useNavigate } from "react-router-dom";
import { products } from "../../data/ShopData";

function WishlistTab() {
  const navigate = useNavigate();

  const wishlistProductIds = [17, 20, 19];

  const wishlist = wishlistProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  const goToProductDetail = (productId) => {
    navigate(`/shop/${productId}`);
  };

  return (
    <section className="mypage-tab-content">
      <h1>찜한 상품</h1>

      <div className="mypage-tab-products">
        {wishlist.map((product) => (
          <article
            key={product.id}
            className="mypage-product-card"
            onClick={() => goToProductDetail(product.id)}
          >
            <div className="mypage-product-card__image">
              <img
                src={product.mainImage}
                alt={product.name}
              />
            </div>

            <div className="mypage-product-card__info">
              <h3>{product.name}</h3>
              <strong>{product.price.toLocaleString()}원</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WishlistTab;