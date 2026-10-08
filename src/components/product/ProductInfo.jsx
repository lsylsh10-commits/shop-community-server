import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
        2 5.42 4.42 3 7.5 3
        c1.74 0 3.41.81 4.5 2.09
        C13.09 3.81 14.76 3 16.5 3
        19.58 3 22 5.42 22 8.5
        c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="currentColor"
      />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="18"
        cy="5"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="6"
        cy="12"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="18"
        cy="19"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M8.2 10.8 15.8 6.3M8.2 13.2l7.6 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.5 12.5 10.2 16 17.8 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProductInfo({ product }) {
  const navigate = useNavigate()

  const [quantity, setQuantity] = useState(1)
  const [selectedOption, setSelectedOption] = useState('')
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)

  if (!product) return null

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handleAddToCart = () => {
    if (
      product.options &&
      product.options.length > 0 &&
      !selectedOption
    ) {
      alert('옵션을 선택해주세요.')
      return
    }

    const savedCart = JSON.parse(
      localStorage.getItem('cartProducts') || '[]'
    )

    const option =
      product.options && product.options.length > 0
        ? selectedOption
        : '단일상품'

    const existingProduct = savedCart.find(
      (item) =>
        item.id === product.id &&
        item.selectedOption === option
    )

    let updatedCart

    if (existingProduct) {
      updatedCart = savedCart.map((item) =>
        item.id === product.id &&
        item.selectedOption === option
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      )
    } else {
      updatedCart = [
        ...savedCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.mainImage,
          characters: product.characters,
          options: [option],
          selectedOption: option,
          quantity,
          liked: false,
        },
      ]
    }

    localStorage.setItem(
      'cartProducts',
      JSON.stringify(updatedCart)
    )

    window.dispatchEvent(new Event('cartUpdated'))

    setIsCartModalOpen(true)
  }

  const handleContinueShopping = () => {
    setIsCartModalOpen(false)
  }

  const handleGoToCart = () => {
    setIsCartModalOpen(false)
    navigate('/cart')
  }

  return (
    <>
      <div className="product-info">
        <div className="product-info-top">
          {product.isNew && (
            <span className="product-new-badge">NEW</span>
          )}

          <div className="product-info-icons">
            <button
              type="button"
              className="product-icon-button"
              aria-label="찜하기"
            >
              <HeartIcon />
            </button>

            <button
              type="button"
              className="product-icon-button share"
              aria-label="공유하기"
            >
              <ShareIcon />
            </button>
          </div>
        </div>

        <div className="product-info-heading">
          <h1>{product.name}</h1>

          <p className="product-info-description">
            {product.description}
          </p>
        </div>

        <div className="product-info-price">
          {product.price.toLocaleString()}원
        </div>

        <div className="product-option-row">
          <span className="product-option-label">옵션</span>

          {product.options && product.options.length > 0 ? (
            <select
              value={selectedOption}
              onChange={(event) =>
                setSelectedOption(event.target.value)
              }
            >
              <option value="" disabled>
                옵션을 선택해주세요
              </option>

              {product.options.map((option, index) => (
                <option
                  key={`${product.id}-${index}`}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <select value="single" disabled>
              <option value="single">단일상품</option>
            </select>
          )}
        </div>

        <div className="product-quantity-row">
          <span className="product-option-label">수량</span>

          <div className="product-quantity">
            <button type="button" onClick={decreaseQuantity}>
              −
            </button>

            <span>{quantity}</span>

            <button type="button" onClick={increaseQuantity}>
              +
            </button>
          </div>
        </div>

        <div className="product-info-actions">
          <button
            type="button"
            className="product-cart-button"
            onClick={handleAddToCart}
          >
            장바구니 담기
          </button>

          <button type="button" className="product-buy-button">
            구매하기
          </button>
        </div>

        <div className="product-delivery-info">
          <p>
            <span>♧</span>
            3만원 이상 구매 시 무료배송
          </p>

          <p>
            <span>◇</span>
            평균 2~3일 내 발송(주말,공휴일 제외)
          </p>

          <p>
            <span>ⓘ</span>
            마음에 드는 상품은 조기 품절될 수 있어요!
          </p>
        </div>
      </div>

      {isCartModalOpen && (
        <div
          className="cart-modal-overlay"
          onClick={handleContinueShopping}
        >
          <div
            className="cart-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-modal-check">
              <CheckIcon />
            </div>

            <h2 id="cart-modal-title">
              상품이 장바구니에 담겼습니다.
            </h2>

            <p>
              장바구니에서 상품을 확인하거나
              <br />
              쇼핑을 계속해보세요.
            </p>

            <div className="cart-modal-actions">
              <button
                type="button"
                className="cart-modal-continue"
                onClick={handleContinueShopping}
              >
                쇼핑 계속하기
              </button>

              <button
                type="button"
                className="cart-modal-go"
                onClick={handleGoToCart}
              >
                장바구니 가기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductInfo