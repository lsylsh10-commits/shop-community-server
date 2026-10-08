import { useEffect } from "react";

function SocialLoginModal({ provider, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!provider) {
    return null;
  }

  const providerNames = {
    naver: "네이버",
    kakao: "카카오",
    google: "구글",
  };

  const providerName = providerNames[provider];

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleContinue = () => {
    /*
      추후 실제 OAuth가 연결되면
      이 위치에서 공식 소셜 로그인 인증을 시작합니다.
    */

    console.log(`${providerName} 로그인 연결`);
  };

  return (
    <div
      className="social-modal"
      role="presentation"
      onMouseDown={handleOverlayClick}
    >
      <div
        className="social-modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="social-modal-title"
      >
        <button
          type="button"
          className="social-modal__close"
          onClick={onClose}
          aria-label="팝업 닫기"
        >
          ×
        </button>

        <div className="social-modal__body">
          <img
            src={`/shop-community/images/login/${provider}.svg`}
            alt=""
            className="social-modal__logo"
          />

          <h2
            id="social-modal-title"
            className="social-modal__title"
          >
            {providerName} 로그인
          </h2>

          <p className="social-modal__description">
            {providerName} 계정으로 간편하게 로그인할 수 있어요.
          </p>

          <button
            type="button"
            className={`social-modal__continue social-modal__continue--${provider}`}
            onClick={handleContinue}
          >
            {providerName}로 계속하기
          </button>

          <button
            type="button"
            className="social-modal__cancel"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default SocialLoginModal;