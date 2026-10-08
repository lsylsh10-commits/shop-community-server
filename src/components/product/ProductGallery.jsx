import { useState } from 'react'

function ProductGallery({ mainImage, thumbnails = [] }) {
  const allImages = [mainImage, ...thumbnails].filter(Boolean)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (allImages.length === 0) return null

  const currentImage = allImages[currentIndex]

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        <img src={currentImage} alt="상품 이미지" />

        <button
          type="button"
          className="gallery-arrow gallery-arrow-prev"
          onClick={handlePrev}
          aria-label="이전 이미지"
        >
          ‹
        </button>

        <button
          type="button"
          className="gallery-arrow gallery-arrow-next"
          onClick={handleNext}
          aria-label="다음 이미지"
        >
          ›
        </button>
      </div>

      <div className="product-gallery-thumbnails">
        {thumbnails.map((image, index) => {
          const imageIndex = index + 1

          return (
            <button
              type="button"
              key={image}
              className={`product-gallery-thumbnail ${
                currentIndex === imageIndex ? 'active' : ''
              }`}
              onClick={() => setCurrentIndex(imageIndex)}
            >
              <img
                src={image}
                alt={`상품 썸네일 ${index + 1}`}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ProductGallery