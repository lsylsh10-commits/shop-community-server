import { cartItems } from "../../data/mypage";

function CartTab() {
  return (
    <section className="mypage-tab-content">
      <h1>장바구니</h1>

      <div className="cart-list">
        {cartItems.map((item) => (
          <article key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />

            <div>
              <h3>{item.name}</h3>
              <p>수량 {item.quantity}</p>
              <strong>{item.price.toLocaleString()}원</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CartTab;