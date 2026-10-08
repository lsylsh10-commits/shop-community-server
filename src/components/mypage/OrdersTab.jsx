import { useNavigate } from "react-router-dom";
import { products } from "../../data/ShopData";

function OrdersTab() {
  const navigate = useNavigate();

  const recentProductIds = [12, 6, 19, 17, 4];

  const recentProducts = recentProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  const goToProductDetail = (productId) => {
    navigate(`/shop/${productId}`);
  };

  return (
    <section className="mypage-tab-content">
      <h1>구매 내역</h1>

      <div className="mypage-tab-products">
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

export default OrdersTab;