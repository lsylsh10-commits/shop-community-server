const menuItems = [
  {
    id: "profile",
    label: "마이페이지",
    icon: "https://lsylsh10-commits.github.io/shop-community-server/images/mypage/profile.svg",
  },
  {
    id: "orders",
    label: "구매 내역",
    icon: "https://lsylsh10-commits.github.io/shop-community-server/images/mypage/cart.svg",
  },
  {
    id: "friends",
    label: "나의 친구",
    icon: "https://lsylsh10-commits.github.io/shop-community-server/images/mypage/users.svg",
  },
  {
    id: "wishlist",
    label: "찜한 상품",
    icon: "https://lsylsh10-commits.github.io/shop-community-server/images/mypage/heart.svg",
  },
  {
    id: "liked",
    label: "저장한 게시물",
    icon: "https://lsylsh10-commits.github.io/shop-community-server/images/mypage/bookmark.svg",
  },
  {
    id: "settings",
    label: "계정 설정",
    icon: "https://lsylsh10-commits.github.io/shop-community-server/images/mypage/Account Settings.svg",
  },
  {
    id: "notifications",
    label: "알림 설정",
    icon: "https://lsylsh10-commits.github.io/shop-community-server/images/mypage/bell.svg",
  },
  {
    id: "logout",
    label: "로그아웃",
    icon: "https://lsylsh10-commits.github.io/shop-community-server/images/mypage/Log Out.svg",
  },
];

function MyPageSidebar({ activeTab, onTabChange }) {
  const handleClick = (id) => {
    onTabChange(id);
  };

  return (
    <aside className="mypage-sidebar">
      <nav className="mypage-sidebar__nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`mypage-sidebar__item ${
              activeTab === item.id ? "is-active" : ""
            }`}
            onClick={() => handleClick(item.id)}
          >
            <img
              src={item.icon}
              alt=""
              className="mypage-sidebar__icon"
            />

            <span className="mypage-sidebar__label">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default MyPageSidebar;