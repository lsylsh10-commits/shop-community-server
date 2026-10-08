import { useState } from "react";

function NotificationSettingsTab() {
  const [notifications, setNotifications] = useState({
    order: true,
    community: true,
    friend: false,
    marketing: false,
  });

  const handleToggle = (name) => {
    setNotifications((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const notificationItems = [
    {
      id: "order",
      title: "주문 및 배송 알림",
      description: "주문 상태와 배송 정보를 알려드려요.",
    },
    {
      id: "community",
      title: "커뮤니티 알림",
      description: "내 게시글의 댓글과 좋아요 소식을 알려드려요.",
    },
    {
      id: "friend",
      title: "친구 알림",
      description: "친구와 관련된 새로운 소식을 알려드려요.",
    },
    {
      id: "marketing",
      title: "혜택 및 이벤트 알림",
      description: "새로운 상품과 이벤트 소식을 알려드려요.",
    },
  ];

  return (
    <section className="mypage-tab-content notification-settings">
      <h1>알림 설정</h1>

      <div className="notification-settings__card">
        {notificationItems.map((item) => (
          <div
            key={item.id}
            className="notification-settings__item"
          >
            <div className="notification-settings__text">
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>

            <button
              type="button"
              className={`notification-toggle ${
                notifications[item.id] ? "is-active" : ""
              }`}
              onClick={() => handleToggle(item.id)}
              aria-pressed={notifications[item.id]}
              aria-label={`${item.title} ${
                notifications[item.id] ? "끄기" : "켜기"
              }`}
            >
              <span />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NotificationSettingsTab;