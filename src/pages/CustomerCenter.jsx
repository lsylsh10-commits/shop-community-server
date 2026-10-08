import '../styles/customer-center.css'

const inquiryItems = [
  {
    title: '주문 · 결제',
    description: '주문/결제 오류, 주문 취소, 입금 확인 등의 문의',
  },
  {
    title: '배송 안내',
    description: '배송 현황, 배송 지연, 배송지 변경 등의 문의',
  },
  {
    title: '교환 · 반품',
    description: '교환/반품 접수, 진행 방법, 환불 일정 등의 문의',
  },
  {
    title: '상품 문의',
    description: '상품 정보, 재입고, 품절, 사용 방법 등의 문의',
  },
  {
    title: '기타 문의',
    description: '제휴, 대량 구매, 이벤트, 사이트 이용 관련 문의',
  },
]

const processItems = [
  {
    number: '01',
    symbol: '01',
    title: '문의 접수',
    description: '이메일 또는 1:1 문의를 통해\n문의 내용을 접수해 주세요.',
  },
  {
    number: '02',
    symbol: '02',
    title: '내용 확인',
    description: '담당자가 문의 내용을\n확인합니다.',
  },
  {
    number: '03',
    symbol: '03',
    title: '답변 처리',
    description: '영업일 기준으로\n순차 답변 드립니다.',
  },
  {
    number: '04',
    symbol: '04',
    title: '답변 완료',
    description: '마이페이지 또는 이메일로\n답변을 확인하실 수 있습니다.',
  },
]

function CustomerCenter() {
  return (
    <main className="customer-center">

      {/* HERO */}
      <section className="customer-center__hero">
        <div className="customer-center__inner customer-center__hero-inner">
          <div className="customer-center__hero-text">
            <h1>고객센터</h1>

            <p>
              하찮과 함께하는 더 좋은 일상을 위해,
              <br />
              언제나 최선을 다해 도와드릴게요.
            </p>
          </div>
        </div>
      </section>


      {/* 고객지원 안내 */}
      <section className="customer-support">
        <div className="customer-center__inner">

          <div className="customer-section-heading">
            <h2>고객지원 안내</h2>

            <p>
              하찮은 항상 고객님의 소중한 의견에 귀 기울입니다.
              <br />
              언제든 도움이 필요하시면 아래 안내를 참고해 주세요.
            </p>
          </div>


          <div className="customer-support__content">

            {/* 운영시간 */}
            <div className="customer-support__hours">

              <div className="customer-support__subtitle">
                <h3>운영시간</h3>
              </div>

              <div className="customer-support__hours-list">

                <div className="customer-support__hours-row">
                  <strong>평일</strong>

                  <div>
                    <b>09:00 - 18:00</b>
                    <span>점심시간 12:00 - 13:00</span>
                  </div>
                </div>

                <div className="customer-support__hours-row">
                  <strong>주말 · 공휴일</strong>

                  <div>
                    <b>휴무</b>
                  </div>
                </div>

              </div>

              <p className="customer-support__notice">
                업무시간 외에는 1:1 문의를 이용해 주시면
                영업일 기준으로 순차 답변 드립니다.
              </p>

            </div>


            {/* 문의 채널 */}
            <div className="customer-support__channels">

              <div className="customer-support__subtitle">
                <h3>문의 채널</h3>
              </div>


              <div className="customer-channel">

                <div className="customer-channel__info">
                  <div>
                    <strong>이메일 문의</strong>
                    <span>일반 문의, 제휴 문의 등</span>
                  </div>
                </div>

                <div className="customer-channel__value">
                  <strong>hello@hajjan.kr</strong>
                  <span>24시간 접수 가능</span>
                </div>

              </div>


              <div className="customer-channel">

                <div className="customer-channel__info">
                  <div>
                    <strong>대표 연락처</strong>
                    <span>주문, 결제, 배송 등 긴급 문의</span>
                  </div>
                </div>

                <div className="customer-channel__value">
                  <strong>0000-0000</strong>
                  <span>평일 09:00 - 18:00</span>
                </div>

              </div>


              <div className="customer-channel">

                <div className="customer-channel__info">
                  <div>
                    <strong>1:1 문의하기</strong>
                    <span>주문, 교환/반품, 상품 문의 등</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="customer-channel__button"
                >
                  1:1 문의 바로가기 →
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* 주요 문의 안내 */}
      <section className="customer-inquiry-guide">
        <div className="customer-center__inner">

          <div className="customer-section-heading customer-section-heading--row">
            <h2>주요 문의 안내</h2>

            <p>
              아래 내용을 참고하시면 더 빠르게 도움을 받으실 수 있어요.
            </p>
          </div>


          <div className="customer-inquiry-guide__list">

            {inquiryItems.map((item) => (
              <div
                className="customer-inquiry-guide__item"
                key={item.title}
              >
                <strong>
                  {item.title}
                </strong>

                <p>
                  {item.description}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* 답변 절차 안내 */}
      <section className="customer-process">
        <div className="customer-center__inner">

          <div className="customer-section-heading customer-section-heading--row">
            <h2>답변 절차 안내</h2>

            <p>
              문의하신 내용은 아래 절차에 따라 빠르고 정확하게 답변드립니다.
            </p>
          </div>


          <div className="customer-process__list">

            {processItems.map((item, index) => (
              <div
                className="customer-process__wrap"
                key={item.number}
              >

                <div className="customer-process__item">

                  <span className="customer-process__number">
                    {item.number}
                  </span>

                  <strong>
                    {item.title}
                  </strong>

                  <p>
                    {item.description
                      .split('\n')
                      .map((line, lineIndex) => (
                        <span key={lineIndex}>
                          {line}
                          <br />
                        </span>
                      ))}
                  </p>

                </div>

                {index < processItems.length - 1 && (
                  <span className="customer-process__arrow">
                    →
                  </span>
                )}

              </div>
            ))}

          </div>

        </div>
      </section>

    </main>
  )
}

export default CustomerCenter
