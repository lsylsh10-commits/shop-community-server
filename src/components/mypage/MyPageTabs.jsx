const tabs = [
  {
    id: "profile",
    label: "프로필",
  },
  {
    id: "wishlist",
    label: "찜한 상품",
  },
  {
    id: "cart",
    label: "장바구니",
  },
  {
    id: "posts",
    label: "내가 쓴 글",
  },
  {
    id: "liked",
    label: "좋아요한 글",
  },
  {
    id: "settings",
    label: "계정 설정",
  },
  {
    id: "notifications",
    label: "알림 설정",
  },
];

function MyPageTabs({ activeTab, onTabChange }) {
  return (
    <nav className="mypage-tabs" aria-label="마이페이지 메뉴">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`mypage-tabs__button ${
            activeTab === tab.id ? "is-active" : ""
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default MyPageTabs;