import { useEffect, useState } from "react";

import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";
import RecommendedProducts from "../components/cart/RecommendedProducts";

import "../styles/cart.css";

// --------------------------------------------------
// 장바구니 가격 설정
// --------------------------------------------------

const cartPriceConfig = {
  discount: 0,
  shippingFee: 3000,
};

function Cart() {
  // --------------------------------------------------
  // localStorage에서 실제 장바구니 상품 불러오기
  // --------------------------------------------------

  const getSavedCartProducts = () => {
    try {
      const savedCart = localStorage.getItem("cartProducts");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  };

  const [cartProducts, setCartProducts] = useState(
    getSavedCartProducts
  );

  // 처음에는 모든 상품 선택
  const [selectedIds, setSelectedIds] = useState(() =>
    getSavedCartProducts().map((product) => product.id)
  );

  // --------------------------------------------------
  // 추천 상품
  // 서버 상품 데이터에서 장바구니 상품 제외 후 랜덤 4개
  // --------------------------------------------------

  const [recommendedProducts, setRecommendedProducts] =
    useState([]);

  useEffect(() => {
    const loadRecommendedProducts = async () => {
      try {
        const response = await fetch(
          "https://lsylsh10-commits.github.io/shop-community-server/data/shop-data.json"
        );

        if (!response.ok) {
          throw new Error("상품 데이터를 불러오지 못했습니다.");
        }

        const data = await response.json();
        const products = data.products || [];

        const savedCartProducts = getSavedCartProducts();

        const availableProducts = products.filter(
          (product) =>
            !savedCartProducts.some(
              (cartProduct) => cartProduct.id === product.id
            )
        );

        const recommended = [...availableProducts]
          .sort(() => Math.random() - 0.5)
          .slice(0, 4)
          .map((product) => ({
            ...product,
            image: product.mainImage,
          }));

        setRecommendedProducts(recommended);
      } catch (error) {
        console.error("추천 상품 데이터 로딩 실패:", error);
        setRecommendedProducts([]);
      }
    };

    loadRecommendedProducts();
  }, []);

  // --------------------------------------------------
  // 장바구니 변경 내용을 localStorage에도 저장
  // --------------------------------------------------

  const updateCartProducts = (newProducts) => {
    setCartProducts(newProducts);

    localStorage.setItem(
      "cartProducts",
      JSON.stringify(newProducts)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // --------------------------------------------------
  // 개별 상품 선택
  // --------------------------------------------------

  const handleSelect = (productId) => {
    setSelectedIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }

      return [...prev, productId];
    });
  };

  // --------------------------------------------------
  // 전체 선택
  // --------------------------------------------------

  const handleSelectAll = () => {
    const isAllSelected =
      cartProducts.length > 0 &&
      selectedIds.length === cartProducts.length;

    if (isAllSelected) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(cartProducts.map((product) => product.id));
  };

  // --------------------------------------------------
  // 수량 증가
  // --------------------------------------------------

  const handleIncrease = (productId) => {
    const updatedProducts = cartProducts.map((product) =>
      product.id === productId
        ? {
            ...product,
            quantity: product.quantity + 1,
          }
        : product
    );

    updateCartProducts(updatedProducts);
  };

  // --------------------------------------------------
  // 수량 감소
  // 최소 수량은 1
  // --------------------------------------------------

  const handleDecrease = (productId) => {
    const updatedProducts = cartProducts.map((product) =>
      product.id === productId
        ? {
            ...product,
            quantity: Math.max(1, product.quantity - 1),
          }
        : product
    );

    updateCartProducts(updatedProducts);
  };

  // --------------------------------------------------
  // 개별 상품 삭제
  // --------------------------------------------------

  const handleDelete = (productId) => {
    const updatedProducts = cartProducts.filter(
      (product) => product.id !== productId
    );

    updateCartProducts(updatedProducts);

    setSelectedIds((prev) =>
      prev.filter((id) => id !== productId)
    );
  };

  // --------------------------------------------------
  // 선택 상품 삭제
  // --------------------------------------------------

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      return;
    }

    const updatedProducts = cartProducts.filter(
      (product) => !selectedIds.includes(product.id)
    );

    updateCartProducts(updatedProducts);

    setSelectedIds([]);
  };

  // --------------------------------------------------
  // 찜 상태 변경
  // --------------------------------------------------

  const handleToggleLike = (productId) => {
    const updatedProducts = cartProducts.map((product) =>
      product.id === productId
        ? {
            ...product,
            liked: !product.liked,
          }
        : product
    );

    updateCartProducts(updatedProducts);
  };

  // --------------------------------------------------
  // 선택된 상품
  // --------------------------------------------------

  const selectedProducts = cartProducts.filter((product) =>
    selectedIds.includes(product.id)
  );

  // --------------------------------------------------
  // 상품 금액 계산
  // --------------------------------------------------

  const productTotal = selectedProducts.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  // --------------------------------------------------
  // 할인 금액
  // --------------------------------------------------

  const discount =
    selectedProducts.length > 0
      ? cartPriceConfig.discount
      : 0;

  // --------------------------------------------------
  // 배송비
  // --------------------------------------------------

  const shippingFee =
    selectedProducts.length === 0
      ? 0
      : productTotal >= 30000
        ? 0
        : cartPriceConfig.shippingFee;

  // --------------------------------------------------
  // 최종 결제 예상 금액
  // --------------------------------------------------

  const totalPrice =
    productTotal - discount + shippingFee;

  return (
    <main className="cart-page">
      <div className="cart-page__inner">
        {/* 페이지 제목 */}

        <header className="cart-page__header">
          <h1>장바구니</h1>

          <p>
            데려갈 친구들을 한 번 더 확인해보세요.
          </p>
        </header>

        {/* 장바구니 메인 */}

        <div className="cart-page__main">
          <CartList
            products={cartProducts}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
            onDelete={handleDelete}
            onDeleteSelected={handleDeleteSelected}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onToggleLike={handleToggleLike}
          />

          <CartSummary
            productTotal={productTotal}
            discount={discount}
            shippingFee={shippingFee}
            totalPrice={totalPrice}
            selectedCount={selectedProducts.length}
          />
        </div>

        {/* 추천 상품 */}

        <RecommendedProducts
          products={recommendedProducts}
        />
      </div>
    </main>
  );
}

export default Cart;