import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import "./styles/header.css";

function Header() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  const searchInputRef = useRef(null);

  // 장바구니 상품 종류 개수 확인
  const updateCartCount = () => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("cartProducts") || "[]"
      );

      setCartCount(savedCart.length);
    } catch {
      setCartCount(0);
    }
  };

  // 처음 페이지가 열렸을 때 장바구니 개수 확인
  useEffect(() => {
    updateCartCount();

    window.addEventListener(
      "cartUpdated",
      updateCartCount
    );

    window.addEventListener(
      "storage",
      updateCartCount
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );

      window.removeEventListener(
        "storage",
        updateCartCount
      );
    };
  }, []);

  // 로그인 상태 변경 확인
  useEffect(() => {
    const updateLoginStatus = () => {
      setIsLoggedIn(
        localStorage.getItem("isLoggedIn") === "true"
      );
    };

    window.addEventListener(
      "loginStatusChanged",
      updateLoginStatus
    );

    window.addEventListener(
      "storage",
      updateLoginStatus
    );

    return () => {
      window.removeEventListener(
        "loginStatusChanged",
        updateLoginStatus
      );

      window.removeEventListener(
        "storage",
        updateLoginStatus
      );
    };
  }, []);

  // 검색창이 열리면 입력창에 커서 이동
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  // 모바일 메뉴가 열리면 뒤 페이지 스크롤 잠금
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // 검색창 열기 / 닫기
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  // 검색 실행
  const handleSearch = (e) => {
    e.preventDefault();

    const keyword = searchText.trim();

    if (!keyword) return;

    navigate(
      `/shop/products?search=${encodeURIComponent(keyword)}`
    );

    setSearchText("");
    setSearchOpen(false);
  };

  // 메뉴 클릭 시 모바일 메뉴 닫기
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // 로그인 필요한 페이지 이동
  const handleProtectedNavigation = (
    event,
    destination
  ) => {
    if (!isLoggedIn) {
      event.preventDefault();
      setMenuOpen(false);
      navigate("/login");
      return;
    }

    setMenuOpen(false);
  };

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
    setMenuOpen(false);

    window.dispatchEvent(
      new Event("loginStatusChanged")
    );

    navigate("/login");
  };

  return (
    <>
      <header className="site-header">
        <div className="header-inner">

          {/* 로고 */}
          <Link
            to="/"
            className="header-logo"
            onClick={closeMenu}
          >
            <img
              src="https://lsylsh10-commits.github.io/shop-community-server/images/home/logo.png"
              alt="HAJJAN"
            />
          </Link>

          {/* PC 메뉴 + 모바일 햄버거 메뉴 */}
          <nav
            className={`header-nav ${
              menuOpen ? "open" : ""
            }`}
          >

            {/* HOME */}
            <div className="mobile-menu-section mobile-home-section">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
                onClick={closeMenu}
              >
                HOME
              </NavLink>
            </div>

            {/* MARKET */}
            <div className="mobile-menu-section">
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
                onClick={closeMenu}
              >
                MARKET
              </NavLink>

              <div className="mobile-submenu">
                <Link
                  to="/shop/products"
                  onClick={closeMenu}
                >
                  전체 상품
                </Link>

                <Link
                  to="/shop/best-new"
                  onClick={closeMenu}
                >
                  BEST & NEW
                </Link>

                <Link
                  to="/shop/products?character=all"
                  onClick={closeMenu}
                >
                  캐릭터
                </Link>
              </div>
            </div>

            {/* COMMUNITY */}
            <div className="mobile-menu-section">
              <NavLink
                to="/community"
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
                onClick={closeMenu}
              >
                COMMUNITY
              </NavLink>

              <div className="mobile-submenu">
                <Link
                  to="/community"
                  onClick={closeMenu}
                >
                  커뮤니티 홈
                </Link>

                <Link
                  to="/mypage?tab=posts"
                  onClick={(event) =>
                    handleProtectedNavigation(
                      event,
                      "/mypage?tab=posts"
                    )
                  }
                >
                  내가 쓴 게시글
                </Link>

                <Link
                  to="/community/write"
                  onClick={closeMenu}
                >
                  글쓰기
                </Link>
              </div>
            </div>

            {/* MY */}
            <div className="mobile-menu-section">
              <NavLink
                to={isLoggedIn ? "/mypage" : "/login"}
                className={({ isActive }) =>
                  isLoggedIn && isActive
                    ? "active"
                    : ""
                }
                onClick={closeMenu}
              >
                MY
              </NavLink>

              <div className="mobile-submenu">
                <Link
                  to="/mypage"
                  onClick={(event) =>
                    handleProtectedNavigation(
                      event,
                      "/mypage"
                    )
                  }
                >
                  마이페이지
                </Link>

                <Link
                  to="/mypage?tab=orders"
                  onClick={(event) =>
                    handleProtectedNavigation(
                      event,
                      "/mypage?tab=orders"
                    )
                  }
                >
                  구매 내역
                </Link>

                <Link
                  to="/mypage?tab=wishlist"
                  onClick={(event) =>
                    handleProtectedNavigation(
                      event,
                      "/mypage?tab=wishlist"
                    )
                  }
                >
                  찜한 상품
                </Link>

                <Link
                  to="/mypage?tab=liked"
                  onClick={(event) =>
                    handleProtectedNavigation(
                      event,
                      "/mypage?tab=liked"
                    )
                  }
                >
                  저장한 게시물
                </Link>

                <Link
                  to="/cart"
                  onClick={closeMenu}
                >
                  장바구니
                </Link>
              </div>
            </div>

            {/* 모바일 하단 로그인 / 로그아웃 */}
            <div className="mobile-menu-bottom">
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                >
                  로그인
                </Link>
              )}
            </div>
          </nav>

          {/* 오른쪽 아이콘 */}
          <div className="header-actions">

            {/* 좋아요 */}
            <Link
              to={
                isLoggedIn
                  ? "/mypage?tab=wishlist"
                  : "/login"
              }
              aria-label="관심상품"
            >
              <svg viewBox="0 0 24 24">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </Link>

            {/* 장바구니 */}
            <Link
              to="/cart"
              className="header-cart"
              aria-label={`장바구니 ${cartCount}개`}
            >
              <svg viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>

              {cartCount > 0 && (
                <span className="header-cart-badge">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* 검색 영역 */}
            <div
              className={`header-search ${
                searchOpen ? "open" : ""
              }`}
            >
              <form onSubmit={handleSearch}>
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="검색어를 입력하세요"
                  value={searchText}
                  onChange={(e) =>
                    setSearchText(e.target.value)
                  }
                  aria-label="통합 검색"
                  tabIndex={searchOpen ? 0 : -1}
                />
              </form>

              <button
                type="button"
                className="header-search-button"
                onClick={toggleSearch}
                aria-label={
                  searchOpen
                    ? "검색창 닫기"
                    : "검색창 열기"
                }
                aria-expanded={searchOpen}
              >
                {searchOpen ? (
                  <svg viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24">
                    <circle
                      cx="11"
                      cy="11"
                      r="8"
                    />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                )}
              </button>
            </div>

            {/* 로그인 / 프로필 */}
            {isLoggedIn ? (
              <Link
                to="/mypage"
                className="header-profile"
                aria-label="마이페이지"
              >
                <img
                  src="https://lsylsh10-commits.github.io/shop-community-server/images/mypage/profile01.png"
                  alt="프로필"
                />
              </Link>
            ) : (
              <Link
                to="/login"
                aria-label="로그인"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M10 17l5-5-5-5" />
                  <path d="M15 12H3" />
                  <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
                </svg>
              </Link>
            )}

            {/* 모바일 메뉴 버튼 */}
            <button
              type="button"
              className="header-menu-button"
              onClick={() =>
                setMenuOpen((prev) => !prev)
              }
              aria-label={
                menuOpen
                  ? "메뉴 닫기"
                  : "메뉴 열기"
              }
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className="mobile-page-dim"
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Header;