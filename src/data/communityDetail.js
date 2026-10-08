export const communityDetailPost = {
  id: 6,

  author: {
    name: '하찮은회사원',
    profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/community-profile01.png',
  },

  date: '2시간 전',

  title: '포포랑 짝이랑 함께한 산책☕',

  content: [
    '포포랑 짝이 덕분에 귀여운 산책길이 됐어요!',
    '잠시만 둬도 넘 귀여운 하찮이들 오늘도 화이팅이에요.',
    '여러분도 각자의 하루, 잘 보내고 있나요? :)',
  ],

  tags: ['포포', '짝이', '산책', '하찮은일상'],

  images: [
    'https://lsylsh10-commits.github.io/shop-community-server/images/community/community09.png',
    'https://lsylsh10-commits.github.io/shop-community-server/images/community/detail02.png',
    'https://lsylsh10-commits.github.io/shop-community-server/images/community/detail03.png',
    'https://lsylsh10-commits.github.io/shop-community-server/images/community/detail04.png',
  ],

  likes: 128,
  comments: 24,

  productIds: [1, 2]
}

export const detailComments = [
  {
    id: 1,
    author: '뭉치좋아',
    date: '1시간전',
    profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/comment-profile01.png',
    content: '포포 표정이 너무 귀여워요 ㅋㅋ 저도 오늘 들고 나가야겠어요!',
    likes: 3,
    comments: 1,
replies: [
  {
    id: 11,
    author: '하찮은회사원',
    date: '40분전',
    profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/community-profile01.png',
    content: '맞아요! 작은데 존재감이 커요 ㅎㅎ',
    likes: 1,
  },
],
  },
  {
    id: 2,
    author: '기운이야',
    date: '40분전',
    profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/comment-profile03.png',
    content: '저도 오늘 기분 3% 상태예요... 우리 다같이 버텨요 ㅠㅠ',
    likes: 8,
    comments: 0,
    replies: [],
  },
]
export const todayPosts = [
  {
    id: 101,
    title: '오늘도 뭉치랑 절미랑 산책해요',
    image: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/side-community06.png',
    likes: 52,
    comments: 12,
  },
  {
    id: 102,
    title: '빵이랑 함께한 카페',
    image: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/side-community07.png',
    likes: 34,
    comments: 8,
  },
  {
    id: 103,
    title: '애착인형 됐어요 ㅋㅋㅋㅋ',
    image: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/side-community08.png',
    likes: 29,
    comments: 6,
  },
]

export const similarPosts = [
  {
    id: 201,
    title: '3% 남은 얘도 이렇게 버티는데!',
    image: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/side-community09.png',
    likes: 96,
    comments: 18,
  },
  {
    id: 202,
    title: '우리집 책상 위 하찮은 친구',
    image: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/side-community10.png',
    likes: 64,
    comments: 9,
  },
  {
    id: 203,
    title: '출근템 추천해요!',
    image: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/side-community11.png',
    likes: 41,
    comments: 5,
  },
]