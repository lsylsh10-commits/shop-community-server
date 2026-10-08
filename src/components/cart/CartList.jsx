import CartItem from "./CartItem";

function CartList({
  products,
  selectedIds,
  onSelect,
  onSelectAll,
  onDelete,
  onDeleteSelected,
  onIncrease,
  onDecrease,
  onToggleLike,
}) {
  const isAllSelected =
    products.length > 0 && selectedIds.length === products.length;

  return (
    <section className="cart-list">
      <div className="cart-list__toolbar">
        <label className="cart-list__select-all">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={onSelectAll}
          />

          <span>전체선택</span>
        </label>

        <button
          type="button"
          className="cart-list__delete-selected"
          onClick={onDeleteSelected}
          disabled={selectedIds.length === 0}
        >
          선택상품 삭제
        </button>
      </div>

      <div className="cart-list__items">
        {products.length > 0 ? (
          products.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              selected={selectedIds.includes(product.id)}
              onSelect={onSelect}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onDelete={onDelete}
              onToggleLike={onToggleLike}
            />
          ))
        ) : (
          <div className="cart-list__empty">
            <p>장바구니에 담긴 상품이 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartList;