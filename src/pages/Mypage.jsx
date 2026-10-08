import { useState, useEffect } from "react";
import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import MyPageSidebar from "../components/mypage/MyPageSidebar";
import ProfileSection from "../components/mypage/ProfileSection";
import MyPageTabs from "../components/mypage/MyPageTabs";
import FriendsSection from "../components/mypage/FriendsSection";
import ProductSection from "../components/mypage/ProductSection";
import PostsSection from "../components/mypage/PostsSection";

import WishlistTab from "../components/mypage/WishlistTab";
import CartTab from "../components/mypage/CartTab";
import MyPostsTab from "../components/mypage/MyPostsTab";
import LikedPostsTab from "../components/mypage/LikedPostsTab";
import OrdersTab from "../components/mypage/OrdersTab";
import FriendsTab from "../components/mypage/FriendsTab";
import AccountSettingsTab from "../components/mypage/AccountSettingsTab";
import NotificationSettingsTab from "../components/mypage/NotificationSettingsTab";
import LogoutModal from "../components/mypage/LogoutModal";

import "../styles/mypage.css";

function MyPage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const [isLogoutModalOpen, setIsLogoutModalOpen] =
    useState(false);

  const activeTab =
    searchParams.get("tab") || "profile";

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  // 로그아웃 상태에서는 마이페이지 접근 차단
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleTabChange = (tabId) => {
    if (tabId === "logout") {
      setIsLogoutModalOpen(true);
      return;
    }

    if (tabId === "profile") {
      setSearchParams({});
      return;
    }

    setSearchParams({ tab: tabId });
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("isLoggedIn");

    window.dispatchEvent(
      new Event("loginStatusChanged")
    );

    setIsLogoutModalOpen(false);

    navigate("/login", { replace: true });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersTab />;

      case "friends":
        return <FriendsTab />;

      case "wishlist":
        return <WishlistTab />;

      case "cart":
        return <CartTab />;

      case "posts":
        return <MyPostsTab />;

      case "liked":
        return <LikedPostsTab />;

      case "settings":
        return <AccountSettingsTab />;

      case "notifications":
        return <NotificationSettingsTab />;

      default:
        return (
          <>
            <ProfileSection />
            <FriendsSection />
            <ProductSection />
            <PostsSection />
          </>
        );
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <main className="mypage">
        <div className="mypage__inner">
          <MyPageSidebar
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          <section className="mypage__content">
            <MyPageTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            {renderContent()}
          </section>
        </div>
      </main>

      {isLogoutModalOpen && (
        <LogoutModal
          onCancel={handleLogoutCancel}
          onConfirm={handleLogoutConfirm}
        />
      )}
    </>
  );
}

export default MyPage;