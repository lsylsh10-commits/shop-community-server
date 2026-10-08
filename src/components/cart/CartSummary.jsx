function CartSummary({
  productTotal,
  discount,
  shippingFee,
  totalPrice,
  selectedCount,
}) {
  const handlePurchase = () => {
    if (selectedCount === 0) {
      alert("구매할 상품을 선택해주세요.");
      return;
    }

    // 추후 팀의 주문/결제 페이지가 연결되면
    // 이 위치에서 이동 기능을 연결합니다.
    // 현재는 공통 라우팅 파일을 수정하지 않습니다.
    alert("주문/결제 페이지 연결 예정입니다.");
  };

  return (
    <aside className="cart-summary">
      <h2 className="cart-summary__title">주문 예상 금액</h2>

      <div className="cart-summary__price-list">
        <div className="cart-summary__row">
          <span>상품 금액</span>
          <strong>{productTotal.toLocaleString()}원</strong>
        </div>

        <div className="cart-summary__row">
          <span>할인 금액</span>
          <strong>
            {discount > 0 ? "-" : ""}
            {discount.toLocaleString()}원
          </strong>
        </div>

        <div className="cart-summary__row">
          <span>배송비</span>
          <strong>{shippingFee.toLocaleString()}원</strong>
        </div>
      </div>

      <div className="cart-summary__total">
        <span>총 상품 금액</span>

        <strong>
          {totalPrice.toLocaleString()}
          <small>원</small>
        </strong>
      </div>

      <button
        type="button"
        className="cart-summary__purchase"
        onClick={handlePurchase}
        disabled={selectedCount === 0}
      >
        구매하기
      </button>
    </aside>
  );
}

export default CartSummary;