import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  MainVisual,
  CategorySection,
  ProductSection,
  CommunityPreview,
  PromotionBanner,
} from "../components/home/HomeSections";

import "../styles/home.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/shop-data.json`
        );

        if (!response.ok) {
          throw new Error("상품 데이터를 불러오지 못했습니다.");
        }

        const data = await response.json();

        setProducts(data.products || []);
      } catch (error) {
        console.error("상품 데이터 로딩 실패:", error);
        setProducts([]);
      }
    };

    loadProducts();
  }, []);

  // NEW 상품
  const newProducts = products
    .filter((product) => product.isNew)
    .slice(0, 4);

  // BEST 상품
  const bestProducts = products
    .filter((product) => product.isBest)
    .slice(0, 4);

  return (
    <main className="home">
      {/* 메인 비주얼 */}
      <MainVisual />

      {/* 1168px 콘텐츠 영역 */}
      <div className="home-inner">
        {/* 캐릭터 카테고리 */}
        <CategorySection />

        {/* 신상품 */}
        <ProductSection
          title="NEW FRIENDS"
          products={newProducts}
        />

        {/* 인기 상품 */}
        <ProductSection
          title="BEST GOODS"
          products={bestProducts}
        />

        {/* 커뮤니티 */}
        <CommunityPreview />

        {/* 브랜드 스토리 */}
        <Link
          to="/brand"
          aria-label="브랜드 스토리 보러가기"
          style={{ display: "block" }}
        >
          <PromotionBanner />
        </Link>
      </div>
    </main>
  );
}

export default Home;