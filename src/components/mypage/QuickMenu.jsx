const quickMenus = [
  {
    id: "orders",
    title: "구매 내역",
    description: "주문한 상품을 확인해보세요.",
    icon: "/shop-community/images/mypage/bag.svg",
  },
  {
    id: "friends",
    title: "나의 친구",
    description: "나와 함께하는 하찮은 친구들",
    icon: "/shop-community/images/mypage/users.svg",
  },
  {
    id: "wishlist",
    title: "찜한 상품",
    description: "찜해둔 상품을 모아봤어요.",
    icon: "/shop-community/images/mypage/heart.svg",
  },
  {
    id: "liked",
    title: "저장한 게시물",
    description: "나중에 다시 볼 게시물이에요.",
    icon: "/shop-community/images/mypage/bookmark.svg",
  },
];

function QuickMenu({ onTabChange }) {
  return (
    <div className="quick-menu">
      {quickMenus.map((item) => (
        <button
          key={item.id}
          type="button"
          className="quick-menu__card"
          onClick={() => onTabChange(item.id)}
        >
          <img
            src={item.icon}
            alt=""
            className="quick-menu__icon"
          />

          <div className="quick-menu__text">
            <strong>{item.title}</strong>
            <small>{item.description}</small>
          </div>

          <img
            src="/shop-community/images/mypage/next.svg"
            alt=""
            className="quick-menu__arrow"
          />
        </button>
      ))}
    </div>
  );
}

export default QuickMenu;