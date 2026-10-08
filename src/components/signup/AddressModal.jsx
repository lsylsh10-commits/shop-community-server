import { useEffect, useState } from "react";

function AddressModal({ isOpen, onClose, onApply }) {
  const [baseAddress, setBaseAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setBaseAddress("");
      setDetailAddress("");
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleApply = () => {
    if (!baseAddress.trim()) {
      alert("주소를 입력해주세요.");
      return;
    }

    const fullAddress = [baseAddress.trim(), detailAddress.trim()]
      .filter(Boolean)
      .join(" ");

    onApply(fullAddress);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="address-modal"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        className="address-modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="address-modal-title"
      >
        <div className="address-modal__header">
          <h2 id="address-modal-title" className="address-modal__title">
            주소 입력
          </h2>

          <button
            type="button"
            className="address-modal__close"
            onClick={onClose}
            aria-label="주소 입력 팝업 닫기"
          >
            ×
          </button>
        </div>

        <div className="address-modal__body">
          <div className="address-modal__field">
            <label
              htmlFor="baseAddress"
              className="address-modal__label"
            >
              주소
            </label>

            <input
              id="baseAddress"
              type="text"
              value={baseAddress}
              onChange={(event) => setBaseAddress(event.target.value)}
              placeholder="주소를 입력해주세요."
              className="address-modal__input"
              autoFocus
            />
          </div>

          <div className="address-modal__field">
            <label
              htmlFor="detailAddress"
              className="address-modal__label"
            >
              상세 주소
            </label>

            <input
              id="detailAddress"
              type="text"
              value={detailAddress}
              onChange={(event) => setDetailAddress(event.target.value)}
              placeholder="상세 주소를 입력해주세요."
              className="address-modal__input"
            />
          </div>
        </div>

        <div className="address-modal__buttons">
          <button
            type="button"
            className="address-modal__button address-modal__button--cancel"
            onClick={onClose}
          >
            취소
          </button>

          <button
            type="button"
            className="address-modal__button address-modal__button--apply"
            onClick={handleApply}
          >
            주소 적용
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressModal;