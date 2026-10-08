import { useNavigate } from "react-router-dom";
import { products } from "../../data/ShopData";

function ProductSection() {
  const navigate = useNavigate();

  const recentProductIds = [12, 6, 19, 17, 4];

  const recentProducts = recentProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  const goToProductDetail = (productId) => {
    navigate(`/shop/${productId}`);
  };

  return (
    <section className="mypage-section">
      <div className="mypage-section__header">
        <h2>최근 구매 상품</h2>
      </div>

      <div className="mypage-products">
        {recentProducts.map((product) => (
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

export default ProductSection;