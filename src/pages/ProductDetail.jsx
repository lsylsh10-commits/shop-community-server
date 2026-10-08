import { useParams } from 'react-router-dom'
import { products } from '../data/ShopData'

import ProductGallery from '../components/product/ProductGallery'
import ProductInfo from '../components/product/ProductInfo'
import ProductCommunity from '../components/product/ProductCommunity'
import ProductTabs from '../components/product/ProductTabs'

import '../styles/productDetail.css'

function ProductDetail() {
  const { id } = useParams()

  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    return (
      <main className="product-detail-page">
        <div className="product-detail-inner">
          <p>상품을 찾을 수 없습니다.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="product-detail-page">
      <div className="product-detail-inner">
        <section className="product-summary">
          <ProductGallery
            mainImage={product.mainImage}
            thumbnails={product.thumbnails}
          />

          <ProductInfo product={product} />
        </section>

        <ProductCommunity
          reviews={product.communityReviews}
          productName={product.name}
        />

        <ProductTabs detailImage={product.detailImage} />
      </div>
    </main>
  )
}

export default ProductDetail