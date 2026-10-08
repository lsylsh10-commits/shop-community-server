import { useState } from 'react'

function StarRating({ rating = 5 }) {
  return (
    <div className="review-stars" aria-label={`${rating}점`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? 'filled' : ''}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function ProductTabs({ detailImage }) {
  const [activeTab, setActiveTab] = useState('detail')

  if (!detailImage) return null

  const qnaList = [
    {
      id: 1,
      status: '답변완료',
      title: '상품 재입고 일정이 궁금해요.',
      author: '하찮은회사원',
      date: '2026.09.28',
    },
    {
      id: 2,
      status: '답변완료',
      title: '캐릭터별로 표지 디자인이 모두 다른가요?',
      author: '포포좋아',
      date: '2026.09.27',
    },
    {
      id: 3,
      status: '답변대기',
      title: '내지 구성은 전 캐릭터 동일한가요?',
      author: '기록하는하루',
      date: '2026.09.26',
    },
    {
      id: 4,
      status: '답변완료',
      title: '선물 포장도 가능한가요?',
      author: '뭉치구름',
      date: '2026.09.25',
    },
  ]

  const reviewList = [
    {
      id: 1,
      author: '하찮은회사원',
      date: '2026.09.28',
      rating: 5,
      option: '포포',
      text: '표지가 너무 귀여워요. 캐릭터마다 만화가 달라서 다른 버전도 모으고 싶어요!',
    },
    {
      id: 2,
      author: '오늘도기록중',
      date: '2026.09.27',
      rating: 5,
      option: '뭉치',
      text: '사이즈도 부담 없고 종이도 쓰기 편해요. 가볍게 하루 기록하기 딱 좋아요.',
    },
    {
      id: 3,
      author: '기운내자',
      date: '2026.09.25',
      rating: 4,
      option: '기운이',
      text: '기운이 표지 보고 골랐는데 실물이 더 귀엽네요. 잘 쓰고 있습니다.',
    },
  ]

  return (
    <section className="product-detail-content">
      <div className="product-detail-tabs">
        <button
          type="button"
          className={activeTab === 'detail' ? 'active' : ''}
          onClick={() => setActiveTab('detail')}
        >
          상품 상세 설명
        </button>

        <button
          type="button"
          className={activeTab === 'qna' ? 'active' : ''}
          onClick={() => setActiveTab('qna')}
        >
          Q&A (12)
        </button>

        <button
          type="button"
          className={activeTab === 'review' ? 'active' : ''}
          onClick={() => setActiveTab('review')}
        >
          리뷰 (34)
        </button>
      </div>

      <div className="product-tab-content">
        {activeTab === 'detail' && (
          <div className="product-detail-image">
            <img
              src={detailImage}
              alt="상품 상세 설명"
            />
          </div>
        )}

        {activeTab === 'qna' && (
          <div className="product-qna-content">
            <div className="product-tab-section-header">
              <div>
                <h2>Q&A</h2>
                <p>상품에 대해 궁금한 점을 남겨주세요.</p>
              </div>

              <button
                type="button"
                className="product-write-button"
              >
                문의하기
              </button>
            </div>

            <div className="product-qna-list">
              <div className="product-qna-list-header">
                <span>답변상태</span>
                <span>문의내용</span>
                <span>작성자</span>
                <span>작성일</span>
              </div>

              {qnaList.map((item) => (
                <button
                  type="button"
                  className="product-qna-item"
                  key={item.id}
                >
                  <span
                    className={`product-qna-status ${
                      item.status === '답변완료'
                        ? 'complete'
                        : 'waiting'
                    }`}
                  >
                    {item.status}
                  </span>

                  <span className="product-qna-title">
                    {item.title}
                  </span>

                  <span className="product-qna-author">
                    {item.author}
                  </span>

                  <span className="product-qna-date">
                    {item.date}
                  </span>
                </button>
              ))}
            </div>

            <div className="product-tab-pagination">
              <button type="button" className="active">
                1
              </button>
              <button type="button">2</button>
              <button type="button">3</button>
            </div>
          </div>
        )}

        {activeTab === 'review' && (
          <div className="product-review-content">
            <div className="product-tab-section-header">
              <div>
                <h2>리뷰</h2>
                <p>상품을 구매한 분들의 리뷰를 확인해보세요.</p>
              </div>

              <button
                type="button"
                className="product-write-button"
              >
                리뷰 작성
              </button>
            </div>

            <div className="product-review-summary">
              <div className="product-review-score">
                <strong>4.9</strong>
                <span>/ 5</span>
              </div>

              <div className="product-review-summary-info">
                <StarRating rating={5} />
                <p>총 34개의 리뷰가 있어요.</p>
              </div>
            </div>

            <div className="product-review-list">
              {reviewList.map((review) => (
                <article
                  className="product-review-item"
                  key={review.id}
                >
                  <div className="product-review-item-top">
                    <div className="product-review-user">
                      <span className="product-review-profile" />

                      <div>
                        <strong>{review.author}</strong>
                        <span>{review.date}</span>
                      </div>
                    </div>

                    <StarRating rating={review.rating} />
                  </div>

                  <div className="product-review-option">
                    옵션 : {review.option}
                  </div>

                  <p className="product-review-text">
                    {review.text}
                  </p>

                  <button
                    type="button"
                    className="product-review-helpful"
                  >
                    ♡ 도움돼요
                  </button>
                </article>
              ))}
            </div>

            <div className="product-tab-pagination">
              <button type="button" className="active">
                1
              </button>
              <button type="button">2</button>
              <button type="button">3</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductTabs