import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ProductGallery from '../components/product/ProductGallery'
import ProductInfo from '../components/product/ProductInfo'
import ProductCommunity from '../components/product/ProductCommunity'
import ProductTabs from '../components/product/ProductTabs'

import '../styles/productDetail.css'

function ProductDetail() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(
          'https://lsylsh10-commits.github.io/shop-community-server/data/shop-data.json'
        )

        if (!response.ok) {
          throw new Error('상품 데이터를 불러오지 못했습니다.')
        }

        const data = await response.json()

        const foundProduct = (data.products || []).find(
          (item) => item.id === Number(id)
        )

        setProduct(foundProduct || null)
      } catch (error) {
        console.error('상품 상세 데이터 로딩 실패:', error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return null
  }

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