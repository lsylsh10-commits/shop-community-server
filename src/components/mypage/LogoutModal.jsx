function LogoutModal({ onCancel, onConfirm }) {
  return (
    <div
      className="logout-modal-overlay"
      onMouseDown={onCancel}
    >
      <div
        className="logout-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="logout-modal__content">
          <h2 id="logout-modal-title">로그아웃</h2>

          <p>
            정말 로그아웃하시겠어요?
          </p>
        </div>

        <div className="logout-modal__actions">
          <button
            type="button"
            className="logout-modal__cancel"
            onClick={onCancel}
          >
            취소
          </button>

          <button
            type="button"
            className="logout-modal__confirm"
            onClick={onConfirm}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;