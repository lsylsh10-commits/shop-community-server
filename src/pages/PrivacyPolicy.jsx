import '../styles/privacy-policy.css'

const policySections = [
  {
    number: '01',
    title: '개인정보의 수집 및 이용 목적',
    content: (
      <>
        <p>
          하찮은 서비스 제공에 필요한 최소한의 개인정보를 수집하며,
          수집한 개인정보는 다음의 목적을 위해 이용합니다.
        </p>

        <ul>
          <li>회원 가입 및 회원 관리</li>
          <li>상품 주문, 결제 및 배송</li>
          <li>교환, 반품 및 환불 처리</li>
          <li>고객 문의 및 상담</li>
          <li>서비스 개선 및 이용 통계 분석</li>
        </ul>
      </>
    ),
  },
  {
    number: '02',
    title: '수집하는 개인정보 항목',
    content: (
      <>
        <p>
          서비스 이용 과정에서 다음과 같은 개인정보를 수집할 수 있습니다.
        </p>

        <div className="privacy-policy__table">
          <div className="privacy-policy__table-row privacy-policy__table-head">
            <span>구분</span>
            <span>수집 항목</span>
          </div>

          <div className="privacy-policy__table-row">
            <span>회원가입</span>
            <span>이름, 이메일, 비밀번호, 연락처</span>
          </div>

          <div className="privacy-policy__table-row">
            <span>상품 주문</span>
            <span>수령인 이름, 연락처, 배송지, 결제정보</span>
          </div>

          <div className="privacy-policy__table-row">
            <span>고객 문의</span>
            <span>이름, 이메일, 연락처 및 문의 내용</span>
          </div>
        </div>
      </>
    ),
  },
  {
    number: '03',
    title: '개인정보의 보유 및 이용 기간',
    content: (
      <>
        <p>
          개인정보는 수집 및 이용 목적이 달성된 후 지체 없이 파기합니다.
          다만, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안
          안전하게 보관합니다.
        </p>

        <ul>
          <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
          <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
          <li>소비자 불만 또는 분쟁처리에 관한 기록: 3년</li>
        </ul>
      </>
    ),
  },
  {
    number: '04',
    title: '개인정보의 제3자 제공',
    content: (
      <p>
        하찮은 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
        다만, 이용자의 동의가 있거나 관련 법령에 따라 필요한 경우에는 예외로
        합니다.
      </p>
    ),
  },
  {
    number: '05',
    title: '개인정보 처리의 위탁',
    content: (
      <p>
        원활한 서비스 제공을 위해 배송, 결제 등 일부 업무를 외부 전문업체에
        위탁할 수 있으며, 위탁 시 개인정보가 안전하게 관리될 수 있도록 필요한
        사항을 규정하고 관리합니다.
      </p>
    ),
  },
  {
    number: '06',
    title: '개인정보의 파기 절차 및 방법',
    content: (
      <>
        <p>
          개인정보의 보유기간이 경과하거나 처리 목적이 달성된 경우 해당 정보를
          지체 없이 파기합니다.
        </p>

        <ul>
          <li>전자적 파일: 복구할 수 없는 방법으로 영구 삭제</li>
          <li>종이 문서: 분쇄 또는 소각을 통해 파기</li>
        </ul>
      </>
    ),
  },
  {
    number: '07',
    title: '이용자의 권리와 행사 방법',
    content: (
      <p>
        이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며,
        개인정보 처리 정지 및 삭제를 요청할 수 있습니다. 관련 요청은 고객센터를
        통해 접수할 수 있습니다.
      </p>
    ),
  },
  {
    number: '08',
    title: '개인정보 보호책임자 및 문의',
    content: (
      <>
        <p>
          개인정보 처리와 관련된 문의는 아래 고객센터를 통해 접수해 주세요.
        </p>

        <div className="privacy-policy__contact">
          <div>
            <span>이메일</span>
            <strong>hello@hajjan.kr</strong>
          </div>

          <div>
            <span>고객센터</span>
            <strong>0000-0000</strong>
          </div>
        </div>
      </>
    ),
  },
]

function PrivacyPolicy() {
  return (
    <main className="privacy-policy">
      <section className="privacy-policy__hero">
        <div className="privacy-policy__inner">
          <p className="privacy-policy__label">
            PRIVACY POLICY
          </p>

          <h1>개인정보처리방침</h1>

          <p className="privacy-policy__intro">
            하찮은 고객님의 개인정보를 소중하게 생각하며,
            <br />
            관련 법령에 따라 안전하게 관리하고 있습니다.
          </p>
        </div>
      </section>

      <section className="privacy-policy__content">
        <div className="privacy-policy__inner">

          <div className="privacy-policy__notice">
            <span>시행일</span>
            <strong>2026년 10월 7일</strong>
          </div>

          <div className="privacy-policy__sections">
            {policySections.map((section) => (
              <section
                className="privacy-policy__section"
                key={section.number}
              >
                <div className="privacy-policy__section-number">
                  {section.number}
                </div>

                <div className="privacy-policy__section-body">
                  <h2>{section.title}</h2>

                  <div className="privacy-policy__section-text">
                    {section.content}
                  </div>
                </div>
              </section>
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}

export default PrivacyPolicy