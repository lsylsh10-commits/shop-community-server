import { products } from '../data/ShopData.js'

// ========================================
// 기존 커뮤니티 인기 게시글
// ========================================

export const popularPosts = [
  {
    id: 'community-101',
    title: '퇴근길에 포포랑 같이 왔어요',
    content: '포포 덕분에 월요일도 버틸 수 있었어요.',
    image: '/shop-community/images/community/community01.png',
    author: '하찮은회사원',
    date: '2시간 전',
    createdAt: '2026-09-23T12:00:00',
    likes: 1200,
    comments: 128,
    category: '친구의 하루',
    tags: ['포포', '친구의하루'],
    productId: 7,
  },
  {
    id: 'community-102',
    title: '뭉치 키링 실물 후기',
    content: '가방에 달았더니 너무 귀여워요.',
    image: '/shop-community/images/community/community02.png',
    author: '익명',
    date: '5시간 전',
    createdAt: '2026-09-23T09:00:00',
    likes: 842,
    comments: 62,
    category: '친구 자랑',
    tags: ['뭉치', '키링'],
    productId: 17,
  },
  {
    id: 'community-103',
    title: '야근하는 나, 야근당하는 반디!',
    content: '오늘도 반디 덕분에 잘 버텼어요.',
    image: '/shop-community/images/community/community03.png',
    author: '직공후직장',
    date: '1일 전',
    createdAt: '2026-09-22T12:00:00',
    likes: 730,
    comments: 48,
    category: '직장인 공감',
    tags: ['반디', '직장인공감'],
    productId: 7,
  },
]

// ========================================
// 기존 커뮤니티 최신 게시글
// 중복 게시글 6, 7, 8은 상품 후기 데이터에서 가져옴
// ========================================

export const originalCommunityPosts = [
  {
    id: 'community-1',
    title: '새로 산 스티커로 노트 꾸미기 ✨',
    content:
      '새로 산 스티커로 노트를 꾸며봤어요. 작은 캐릭터 몇 개 붙였을 뿐인데 평범했던 노트가 훨씬 귀여워졌어요. 페이지 넘길 때마다 포포가 보여서 괜히 기분 좋아지는 중이에요 ㅎㅎ',
    image: '/shop-community/images/community/community04.png',
    author: '디자인하는하찮이',
    date: '1시간 전',
    createdAt: '2026-09-23T11:00:00',
    likes: 56,
    comments: 7,
    category: '굿즈 활용법',
    tags: ['포포', '굿즈꾸미기'],
    productId: 19,
  },
  {
    id: 'community-2',
    title: '카페에서도 함께 ☕',
    content:
      '오늘은 빵이랑 같이 카페 왔어요. 커피 옆에 살짝 올려두고 사진 찍었는데 생각보다 너무 잘 어울려서 한참 찍었네요 ㅋㅋ 별거 아닌데 같이 데리고 나온 느낌이라 괜히 더 귀여워요.',
    image: '/shop-community/images/community/community05.png',
    author: '커피와하찮이',
    date: '3시간 전',
    createdAt: '2026-09-23T09:00:00',
    likes: 120,
    comments: 18,
    category: '친구의 하루',
    tags: ['빵이', '굿즈꾸미기'],
    productId: 7,
  },
  {
    id: 'community-3',
    title: '오늘도 하늘이 예쁘다.',
    content:
      '오늘 하늘이 유난히 예뻐서 그냥 지나치기 아쉬웠어요. 잠깐 멈춰서 사진 한 장 남기고 보니까 바쁜 하루 중에도 이런 순간은 챙겨두고 싶다는 생각이 들더라고요.',
    image: '/shop-community/images/community/community06.png',
    author: '익명',
    date: '5시간 전',
    createdAt: '2026-09-23T07:00:00',
    likes: 42,
    comments: 3,
    category: '하찮은 이야기',
    tags: ['짝이', '굿즈꾸미기'],
    productId: 5,
  },
  {
    id: 'community-4',
    title: '일하기 싫은데 ... 기운이 보면서 버텨요.',
    content:
      '오늘 진짜 일하기 싫어서 계속 멍때렸는데 책상 위 기운이 보고 다시 버티는 중이에요 ㅋㅋ 퇴근까지 아직 멀었지만 작은 거 하나 보고 웃는 게 생각보다 도움이 되네요.',
    image: '/shop-community/images/community/community07.png',
    author: '하찮은직장인',
    date: '7시간 전',
    createdAt: '2026-09-23T05:00:00',
    likes: 98,
    comments: 12,
    category: '직장인 공감',
    tags: ['기운이', '굿즈꾸미기'],
    productId: 11,
  },
  {
    id: 'community-5',
    title: '기운이랑 한복 데이트 🩶',
    content:
      '기운이 한복 입은 모습이 너무 귀여워서 같이 데리고 나왔어요. 평소랑 또 다른 느낌이라 사진을 계속 찍게 되네요 ㅋㅋ 오늘 데이트 사진 중에 제일 마음에 드는 한 장이에요.',
    image: '/shop-community/images/community/community08.png',
    author: '최애가기운이인사람',
    date: '1일 전',
    createdAt: '2026-09-22T11:00:00',
    likes: 76,
    comments: 9,
    category: '친구 자랑',
    tags: ['기운이', '굿즈꾸미기'],
    productId: 6,
  },
]

// ========================================
// ShopData의 상품 후기 60개를
// 커뮤니티 게시글 형식으로 변환
// ========================================

const productReviewPosts = products.flatMap((product) =>
  (product.communityReviews || []).map((review, reviewIndex) => ({
    id: review.id,
    title: review.title,
    content: review.content,
    image: review.image,
    author: review.author,
    date: review.time,
    createdAt: `2026-09-${String(
      21 - Math.floor(
        ((product.id - 1) * 3 + reviewIndex) / 8
      )
    ).padStart(2, '0')}T${String(
      23 - (((product.id - 1) * 3 + reviewIndex) % 8)
    ).padStart(2, '0')}:00:00`,
    likes: review.likes,
    comments: review.comments,
    category: '굿즈 활용법',
    tags: product.characters || [],
    productId: product.id,
  }))
)

// ========================================
// 전체 커뮤니티 게시글
//
// 상품 후기 60개
// + 기존 최신 게시글 5개
// + 기존 인기 게시글 3개
// = 총 68개
// ========================================

export const communityPosts = [
  ...originalCommunityPosts,
  ...productReviewPosts,
  ...popularPosts,
]

// ========================================
// 커뮤니티 카테고리
// ========================================

export const communityCategories = [
  '전체',
  '친구 자랑',
  '친구의 하루',
  '하찮은 이야기',
  '굿즈 활용법',
  '직장인 공감',
  '자유 수다',
]