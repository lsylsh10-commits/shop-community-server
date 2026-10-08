import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductSection() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(
          "https://lsylsh10-commits.github.io/shop-community-server/data/shop-data.json"
        );

        if (!response.ok) {
          throw new Error("상품 데이터를 불러오지 못했습니다.");
        }

        const data = await response.json();

        setProducts(data.products || []);
      } catch (error) {
        console.error("최근 구매 상품 데이터 로딩 실패:", error);
        setProducts([]);
      }
    };

    loadProducts();
  }, []);

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