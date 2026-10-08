import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { detailComments } from '../data/communityDetail'
import { communityPosts } from './community.js'
import { products } from '../data/ShopData.js'

import '../styles/community-detail.css'


function CommunityDetail() {

  const { id } = useParams()
  const navigate = useNavigate()

    const userPosts = (() => {
    try {
      return JSON.parse(
        localStorage.getItem('communityUserPosts') || '[]'
      )
    } catch (error) {
      console.error('작성 게시글 불러오기 실패:', error)
      return []
    }
  })()

  const sourcePost =
    userPosts.find(
      (item) => String(item.id) === String(id)
    ) ||
    communityPosts.find(
      (item) => String(item.id) === String(id)
    )

  const getRelatedProductIds = (item) => {
    if (!item) return []

    // 키캡 + 포포 키링이 함께 나온 산책 게시글
    if (item.id === 'product-4-03') {
      return [4, 17]
    }

    return item.productId ? [item.productId] : []
  }

    const createDetailPost = (item) => {
    if (!item) return null

    const isWalkPost = item.id === 'product-4-03'

    const savedImages = Array.isArray(item.images)
      ? item.images.filter(Boolean)
      : item.image
        ? [item.image]
        : []

    return {
      ...item,

      author:
        typeof item.author === 'object'
          ? item.author
          : {
              name: item.author || '나',
              profile:
                'https://lsylsh10-commits.github.io/shop-community-server/images/community/community-profile01.png',
            },

      content: Array.isArray(item.content)
        ? item.content
        : [item.content],

      tags: item.tags || item.characters || [],

      images: item.isUserPost
        ? savedImages
        : isWalkPost
          ? [
              item.image,
              'https://lsylsh10-commits.github.io/shop-community-server/images/community/detail02.png',
              'https://lsylsh10-commits.github.io/shop-community-server/images/community/detail03.png',
              'https://lsylsh10-commits.github.io/shop-community-server/images/community/detail04.png',
            ].filter(Boolean)
          : savedImages,

      productIds: Array.isArray(item.productIds)
        ? item.productIds
        : getRelatedProductIds(item),

      likes: item.likes || 0,
      comments: item.comments || 0,
    }
  }

  const initialPost = createDetailPost(sourcePost)

  const [post, setPost] = useState(initialPost)

const linkedProducts = products.filter((product) => {
  if (post?.productIds?.includes(product.id)) {
    return true
  }

  if (post?.productId === product.id) {
    return true
  }

  return false
})
const otherPosts = communityPosts.filter(
  (item) => String(item.id) !== String(id)
)

const todayPosts = otherPosts.slice(0, 3)

const similarPosts = [...otherPosts]
  .filter(
    (item) =>
      !todayPosts.some(
        (todayPost) => String(todayPost.id) === String(item.id)
      )
  )
  .sort((a, b) => {
    const aTags = a.tags || []
    const bTags = b.tags || []
    const currentTags = post?.tags || []

    const aScore = aTags.filter((tag) =>
      currentTags.includes(tag)
    ).length

    const bScore = bTags.filter((tag) =>
      currentTags.includes(tag)
    ).length

    return bScore - aScore
  })
  .slice(0, 3)

  const [showPostMenu, setShowPostMenu] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [editTitle, setEditTitle] = useState(initialPost?.title || '')

  const [editContent, setEditContent] = useState(
    initialPost?.content.join('\n') || ''
  )

  const [editImages, setEditImages] = useState(
    initialPost?.images || []
  )

  const [editTags, setEditTags] = useState(
    initialPost?.tags.join(', ') || ''
  )

  const [selectedImage, setSelectedImage] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)
  const [swipeDirection, setSwipeDirection] = useState('next')
  const [commentText, setCommentText] = useState('')

const commentSets = [
  [
    {
      id: 101,
      author: '포포좋아',
      date: '20분 전',
      profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/comment-profile01.png',
      content: '사진 너무 귀여워요 ㅋㅋㅋ 저도 하나 데려오고 싶어요!',
      likes: 12,
      comments: 0,
      replies: [],
    },
    {
      id: 102,
      author: '하찮은직장인',
      date: '35분 전',
      profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/comment-profile03.png',
      content: '이런 거 보면 괜히 기분 좋아짐 ㅠㅠ 너무 귀엽네요',
      likes: 7,
      comments: 0,
      replies: [],
    },
  ],

  [
    {
      id: 201,
      author: '뭉치수집가',
      date: '15분 전',
      profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/comment-profile01.png',
      content: '실물도 이렇게 귀여운가요?? 사진 보고 완전 영업당했어요 ㅋㅋ',
      likes: 18,
      comments: 0,
      replies: [],
    },
    {
      id: 202,
      author: '퇴근시켜줘',
      date: '1시간 전',
      profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/comment-profile03.png',
      content: '하찮은 친구들 하나씩 늘어날 때마다 통장은 울고 저는 행복해요...',
      likes: 23,
      comments: 0,
      replies: [],
    },
  ],

  [
    {
      id: 301,
      author: '기운이충전중',
      date: '10분 전',
      profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/comment-profile03.png',
      content: '사진 분위기 너무 좋다 ㅎㅎ 캐릭터랑 진짜 잘 어울려요!',
      likes: 5,
      comments: 0,
      replies: [],
    },
    {
      id: 302,
      author: '오늘도하찮게',
      date: '40분 전',
      profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/comment-profile01.png',
      content: '저도 이거 쓰고 있는데 볼 때마다 귀여워서 만족 중이에요 ㅋㅋㅋ',
      likes: 14,
      comments: 0,
      replies: [],
    },
  ],

  [
    {
      id: 401,
      author: '짝이최애',
      date: '25분 전',
      profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/comment-profile01.png',
      content: '아니 사진 너무 잘 찍으셨는데요??ㅋㅋㅋ 저장하고 싶어요',
      likes: 9,
      comments: 0,
      replies: [],
    },
    {
      id: 402,
      author: '월급은스쳐갈뿐',
      date: '2시간 전',
      profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/comment-profile03.png',
      content: '귀여운 건 못 참지... 장바구니 또 늘어나겠네요 😂',
      likes: 16,
      comments: 0,
      replies: [],
    },
  ],

  [
    {
      id: 501,
      author: '빵이러버',
      date: '30분 전',
      profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/comment-profile01.png',
      content: '이 조합 너무 귀엽잖아요 ㅠㅠ 보고만 있어도 힐링됨',
      likes: 11,
      comments: 0,
      replies: [],
    },
    {
      id: 502,
      author: '퇴근만기다림',
      date: '1시간 전',
      profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/comment-profile03.png',
      content: '회사에서 몰래 보다가 웃었어요 ㅋㅋㅋ 오늘도 버텨봅니다...',
      likes: 21,
      comments: 0,
      replies: [],
    },
  ],
]

const getCommentsForPost = (postId) => {
  // 기존 산책 게시글은 태리씨가 만든 댓글 그대로 사용
  if (postId === 'product-4-03') {
    return detailComments
  }

  const text = String(postId)

  const number = [...text].reduce(
    (total, character) => total + character.charCodeAt(0),
    0
  )

  return commentSets[number % commentSets.length]
}

const [comments, setComments] = useState(() =>
  getCommentsForPost(id)
)

  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [commentSort, setCommentSort] = useState('latest')

  const [likedComments, setLikedComments] = useState([])
  const [replyTargetId, setReplyTargetId] = useState(null)
  const [replyText, setReplyText] = useState('')

  const [commentMenuId, setCommentMenuId] = useState(null)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingCommentText, setEditingCommentText] = useState('')

  useEffect(() => {
    const nextPost = createDetailPost(sourcePost)

    setPost(nextPost)
    setComments(getCommentsForPost(id))
    setSelectedImage(0)
    setLiked(false)
    setSaved(false)
    setIsEditing(false)

    if (nextPost) {
      setEditTitle(nextPost.title)
      setEditContent(nextPost.content.join('\n'))
      setEditImages(nextPost.images)
      setEditTags(nextPost.tags.join(', '))
    }
  }, [id])

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const clickedPostMenu = e.target.closest('.detail-more-wrap')
      const clickedCommentMenu = e.target.closest('.detail-comment-more-wrap')

      if (!clickedPostMenu) {
        setShowPostMenu(false)
      }

      if (!clickedCommentMenu) {
        setCommentMenuId(null)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const handleGalleryTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleGalleryTouchEnd = (e) => {
    if (touchStartX === null) return

    const touchEndX = e.changedTouches[0].clientX
    const distance = touchStartX - touchEndX

    if (Math.abs(distance) < 50) {
      setTouchStartX(null)
      return
    }

    if (distance > 0) {
      setSwipeDirection('next')

      setSelectedImage((prev) =>
        prev === post.images.length - 1 ? 0 : prev + 1
      )
    }

    if (distance < 0) {
      setSwipeDirection('prev')

      setSelectedImage((prev) =>
        prev === 0 ? post.images.length - 1 : prev - 1
      )
    }

    setTouchStartX(null)
  }

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return

    const newComment = {
      id: Date.now(),
      author: '나',
      date: '방금 전',
      profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/community-profile01.png',
      content: commentText,
      likes: 0,
      comments: 0,
      replies: [],
    }

    setComments((prev) => [newComment, ...prev])
    setCommentText('')
  }

  const handleCommentLike = (commentId) => {
    setLikedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    )
  }

  const addReplyToTree = (items, parentId, newReply) => {
    return items.map((item) => {
      if (item.id === parentId) {
        return {
          ...item,
          replies: [...(item.replies || []), newReply],
        }
      }

      if (item.replies?.length) {
        return {
          ...item,
          replies: addReplyToTree(
            item.replies,
            parentId,
            newReply
          ),
        }
      }

      return item
    })
  }

  const updateCommentContentTree = (
    items,
    targetId,
    newContent
  ) => {
    return items.map((item) => {
      if (item.id === targetId) {
        return {
          ...item,
          content: newContent,
        }
      }

      if (item.replies?.length) {
        return {
          ...item,
          replies: updateCommentContentTree(
            item.replies,
            targetId,
            newContent
          ),
        }
      }

      return item
    })
  }

  const handleReplySubmit = (parentId) => {
    if (!replyText.trim()) return

    const newReply = {
      id: Date.now(),
      author: '나',
      date: '방금 전',
      profile: 'https://lsylsh10-commits.github.io/shop-community-server/images/community/community-profile01.png',
      content: replyText,
      likes: 0,
      replies: [],
    }

    setComments((prev) =>
      addReplyToTree(prev, parentId, newReply)
    )

    setReplyText('')
    setReplyTargetId(null)
  }

  const handleCommentEditStart = (comment) => {
    setEditingCommentId(comment.id)
    setEditingCommentText(comment.content)
    setCommentMenuId(null)
  }

  const handleCommentEditSave = () => {
    if (!editingCommentText.trim()) return

    setComments((prev) =>
      updateCommentContentTree(
        prev,
        editingCommentId,
        editingCommentText
      )
    )

    setEditingCommentId(null)
    setEditingCommentText('')
  }

  const handleCommentEditCancel = () => {
    setEditingCommentId(null)
    setEditingCommentText('')
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('게시글 주소가 복사됐어요.')
    } catch (error) {
      console.log('주소 복사 실패:', error)
    }
  }

  const countAllComments = (items) => {
    return items.reduce((total, item) => {
      return total + 1 + countAllComments(item.replies || [])
    }, 0)
  }

  const sortedComments = [...comments].sort((a, b) => {
    if (commentSort === 'popular') {
      return b.likes - a.likes
    }

    return b.id - a.id
  })

  const handleEditStart = () => {
    setEditTitle(post.title)
    setEditContent(post.content.join('\n'))
    setEditImages(post.images)
    setEditTags(post.tags.join(', '))
    setIsEditing(true)
    setShowPostMenu(false)
  }

  const handleImageChange = (index, file) => {
    if (!file) return

    const imageUrl = URL.createObjectURL(file)

    setEditImages((prev) =>
      prev.map((image, i) =>
        i === index ? imageUrl : image
      )
    )
  }

  const handleEditSave = () => {
    if (!editTitle.trim() || !editContent.trim()) return

    setPost((prev) => ({
      ...prev,
      title: editTitle,
      content: editContent
        .split('\n')
        .filter((text) => text.trim()),
      images: editImages,
      tags: editTags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    }))

    setIsEditing(false)
  }

  const handleEditCancel = () => {
    setEditTitle(post.title)
    setEditContent(post.content.join('\n'))
    setIsEditing(false)
  }

  const renderReplies = (replies, depth = 1) => {
    if (!replies?.length) return null

    return (
      <div className="detail-replies-thread">
        {replies.map((reply) => (
          <div
            className={
              reply.replies?.length
                ? 'detail-reply-node has-replies'
                : 'detail-reply-node'
            }
            key={reply.id}
          >
            <div className="detail-comment detail-comment-reply">
              <img
                className="detail-comment-avatar"
                src={reply.profile}
                alt={reply.author}
              />

              <div className="detail-comment-body">
                <div className="detail-comment-meta">
                  <strong>{reply.author}</strong>
                  <span>· {reply.date}</span>
                </div>

                {editingCommentId === reply.id ? (
                  <div className="detail-comment-edit">
                    <textarea
                      value={editingCommentText}
                      onChange={(e) =>
                        setEditingCommentText(e.target.value)
                      }
                    />

                    <div className="detail-comment-edit-buttons">
                      <button
                        type="button"
                        onClick={handleCommentEditCancel}
                      >
                        취소
                      </button>

                      <button
                        type="button"
                        onClick={handleCommentEditSave}
                      >
                        저장
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>{reply.content}</p>
                )}

                <div className="detail-comment-actions">
                  <button
                    type="button"
                    className={
                      likedComments.includes(reply.id)
                        ? 'comment-like active'
                        : 'comment-like'
                    }
                    onClick={() => handleCommentLike(reply.id)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
                        fill={
                          likedComments.includes(reply.id)
                            ? 'currentColor'
                            : 'none'
                        }
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>

                    <span>
                      {reply.likes +
                        (likedComments.includes(reply.id) ? 1 : 0)}
                    </span>
                  </button>

                  <button
                    type="button"
                    className="comment-reply-button"
                    onClick={() =>
                      setReplyTargetId(
                        replyTargetId === reply.id
                          ? null
                          : reply.id
                      )
                    }
                    aria-label="답글"
                  >
                    <svg
                      className="comment-reply-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>

                    <span>{reply.replies?.length || 0}</span>
                  </button>
                </div>

                {replyTargetId === reply.id && (
                  <div className="detail-reply-write">
                    <input
                      type="text"
                      value={replyText}
                      placeholder="답글을 남겨보세요."
                      onChange={(e) =>
                        setReplyText(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleReplySubmit(reply.id)
                        }
                      }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleReplySubmit(reply.id)
                      }
                    >
                      등록
                    </button>
                  </div>
                )}
              </div>

              <div className="detail-comment-more-wrap">
                <button
                  type="button"
                  className="detail-comment-more"
                  onClick={() =>
                    setCommentMenuId(
                      commentMenuId === reply.id ? null : reply.id
                    )
                  }
                >
                  ···
                </button>

                {commentMenuId === reply.id && (
                  <div className="detail-comment-more-menu">
                    <button
                      type="button"
                      onClick={() => handleCommentEditStart(reply)}
                    >
                      수정하기
                    </button>
                  </div>
                )}
              </div>
            </div>

            {renderReplies(reply.replies, depth + 1)}
          </div>
        ))}
      </div>
    )
  }

  if (!post) {
    return (
      <main className="community-detail">
        <div className="community-detail-wrap">
          <p>게시글을 찾을 수 없습니다.</p>
        </div>
      </main>
    )
  }

  return (
        <main className="community-detail">
      <div className="community-detail-wrap">

       

        <div className="community-detail-inner">

          <article className="community-detail-post">

            <div className="detail-post-header">
              <div className="detail-author">
                <img
                  src={post.author.profile}
                  alt={post.author.name}
                />

                <div>
                  <strong>{post.author.name}</strong>
                  <span> · {post.date}</span>
                </div>
              </div>

              <div className="detail-more-wrap">
                <button
                  type="button"
                  className="detail-more"
                  aria-label="게시글 더보기"
                  onClick={() => setShowPostMenu((prev) => !prev)}
                >
                  ···
                </button>

                {showPostMenu && (
                  <div className="detail-more-menu">
                    <button
                      type="button"
                      onClick={handleEditStart}
                    >
                      수정하기
                    </button>
                  </div>
                )}
              </div>
            </div>

            {isEditing ? (
              <div className="detail-edit-field">
                <label className="detail-edit-label">제목</label>

                <input
                  className="detail-edit-title"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
            ) : (
              <h1 className="detail-title">
                {post.title}
              </h1>
            )}

            {isEditing ? (
              <div className="detail-edit-content">
                <label className="detail-edit-label">내용</label>

                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              </div>
            ) : (
              <div className="detail-content">
                {post.content.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            )}

            {isEditing ? (
              <div className="detail-edit-tags">
                <label className="detail-edit-label">태그</label>

                <input
                  type="text"
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                  placeholder="태그를 쉼표로 구분해서 입력하세요."
                />

                <span>예: 포포, 짝이, 산책, 하찮은일상</span>
              </div>
            ) : (
              <div className="detail-tags">
                {post.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            )}

{(isEditing ? editImages : post.images).length > 0 && (
  <div className="detail-gallery">
    <div
      className="detail-main-image"
      onTouchStart={handleGalleryTouchStart}
      onTouchEnd={handleGalleryTouchEnd}
      onTouchCancel={() => setTouchStartX(null)}
    >
      <img
        key={selectedImage}
        className={
          swipeDirection === 'next'
            ? 'gallery-image slide-next'
            : 'gallery-image slide-prev'
        }
        src={
          isEditing
            ? editImages[selectedImage]
            : post.images[selectedImage]
        }
        alt={post.title}
      />

      {(isEditing ? editImages : post.images).length > 1 && (
        <>
          <button
            type="button"
            className="detail-gallery-prev"
            onClick={() =>
              setSelectedImage((prev) =>
                prev === 0
                  ? (isEditing ? editImages : post.images).length - 1
                  : prev - 1
              )
            }
          >
            ‹
          </button>

          <button
            type="button"
            className="detail-gallery-next"
            onClick={() =>
              setSelectedImage((prev) =>
                prev === (isEditing ? editImages : post.images).length - 1
                  ? 0
                  : prev + 1
              )
            }
          >
            ›
          </button>

          <span className="detail-gallery-count">
            {selectedImage + 1} / {(isEditing ? editImages : post.images).length}
          </span>
        </>
      )}
    </div>

    <div className="detail-thumbnail-area">
      {isEditing && (
        <div className="detail-thumbnail-edit-title">
          <strong>사진 변경</strong>
          <span>바꿀 사진을 클릭하세요.</span>
        </div>
      )}

      <div className="detail-thumbnail-list">
        {(isEditing ? editImages : post.images).map((image, index) =>
          isEditing ? (
            <label
              className={
                selectedImage === index
                  ? 'detail-edit-thumbnail active'
                  : 'detail-edit-thumbnail'
              }
              key={`${image}-${index}`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image}
                alt={`${index + 1}번째 사진`}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(
                    index,
                    e.target.files?.[0]
                  )
                }
              />
            </label>
          ) : (
            <button
              type="button"
              className={
                selectedImage === index
                  ? 'detail-view-thumbnail active'
                  : 'detail-view-thumbnail'
              }
              key={`${image}-${index}`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image}
                alt={`${index + 1}번째 사진`}
              />
            </button>
          )
        )}
      </div>
    </div>
  </div>
)}

            {isEditing && (
              <div className="detail-edit-buttons">
                <button
                  type="button"
                  onClick={handleEditCancel}
                >
                  취소
                </button>

                <button
                  type="button"
                  onClick={handleEditSave}
                >
                  저장
                </button>
              </div>
            )}

            <div className="detail-actions">

              <button
                type="button"
                className={liked ? 'active' : ''}
                onClick={() => setLiked((prev) => !prev)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
                    fill={liked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>

                <span>{post.likes + (liked ? 1 : 0)}</span>
              </button>

              <button type="button">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>

                <span>{post.comments}</span>
              </button>

              <button
                type="button"
                className={saved ? 'active' : ''}
                onClick={() => setSaved((prev) => !prev)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6 3h12v18l-6-4-6 4V3Z"
                    fill={saved ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>

                <span>{saved ? '저장됨' : '저장'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 16V3M7 8l5-5 5 5M5 13v7h14v-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span>공유</span>
              </button>
            </div>

            {linkedProducts.length > 0 && (
              <section className="detail-products">
                <h2>이 게시글에 나온 친구</h2>

                <div className="detail-product-list">
                  {linkedProducts.map((product) => (
                    <article
                      className="detail-product-card"
                      key={product.id}
                      onClick={() => {
  navigate(`/shop/${product.id}`)
  window.scrollTo(0, 0)
}}
                    >
                      <img
                        src={product.mainImage}
                        alt={product.name}
                      />

                      <div className="detail-product-info">
                        <strong>{product.name}</strong>
                        <span>
                          {product.price.toLocaleString()}원
                        </span>
                      </div>

                      <button
                        type="button"
                        aria-label="상품 상세보기"
                      >
                        ›
                      </button>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <section className="detail-comments">
              <div className="detail-comments-head">
                <h2>댓글 {countAllComments(comments)}</h2>

                <select
                  value={commentSort}
                  onChange={(e) =>
                    setCommentSort(e.target.value)
                  }
                >
                  <option value="latest">최신순</option>
                  <option value="popular">인기순</option>
                </select>
              </div>

              <div className="detail-comment-write">
                <img
                  className="detail-comment-profile"
                  src="https://lsylsh10-commits.github.io/shop-community-server/images/community/community-profile01.png"
                  alt="내 프로필"
                />

                <input
                  type="text"
                  placeholder="댓글을 남겨보세요."
                  value={commentText}
                  onChange={(e) =>
                    setCommentText(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCommentSubmit()
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={handleCommentSubmit}
                >
                  등록
                </button>
              </div>

              <div className="detail-comment-list">

                {sortedComments.map((item) => (
                  <div
                    className={
                      item.replies?.length
                        ? 'detail-comment-group has-replies'
                        : 'detail-comment-group'
                    }
                    key={item.id}
                  >
                    <div className="detail-comment">
                      <img
                        className="detail-comment-avatar"
                        src={item.profile}
                        alt={item.author}
                      />

                      <div className="detail-comment-body">
                        <div className="detail-comment-meta">
                          <strong>{item.author}</strong>
                          <span>· {item.date}</span>
                        </div>

                        {editingCommentId === item.id ? (
                          <div className="detail-comment-edit">
                            <textarea
                              value={editingCommentText}
                              onChange={(e) =>
                                setEditingCommentText(
                                  e.target.value
                                )
                              }
                            />

                            <div className="detail-comment-edit-buttons">
                              <button
                                type="button"
                                onClick={handleCommentEditCancel}
                              >
                                취소
                              </button>

                              <button
                                type="button"
                                onClick={handleCommentEditSave}
                              >
                                저장
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p>{item.content}</p>
                        )}

                        <div className="detail-comment-actions">

                          <button
                            type="button"
                            className={
                              likedComments.includes(item.id)
                                ? 'comment-like active'
                                : 'comment-like'
                            }
                            onClick={() =>
                              handleCommentLike(item.id)
                            }
                          >
                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
                                fill={
                                  likedComments.includes(item.id)
                                    ? 'currentColor'
                                    : 'none'
                                }
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                            </svg>

                            <span>
                              {item.likes +
                                (likedComments.includes(item.id)
                                  ? 1
                                  : 0)}
                            </span>
                          </button>

                          <button
                            type="button"
                            className="comment-reply-button"
                            onClick={() =>
                              setReplyTargetId(
                                replyTargetId === item.id
                                  ? null
                                  : item.id
                              )
                            }
                            aria-label="답글"
                          >
                            <svg
                              className="comment-reply-icon"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                            </svg>

                            <span>
                              {item.replies?.length || 0}
                            </span>
                          </button>

                        </div>

                        {replyTargetId === item.id && (
                          <div className="detail-reply-write">
                            <input
                              type="text"
                              value={replyText}
                              placeholder="답글을 남겨보세요."
                              onChange={(e) =>
                                setReplyText(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleReplySubmit(item.id)
                                }
                              }}
                            />

                            <button
                              type="button"
                              onClick={() =>
                                handleReplySubmit(item.id)
                              }
                            >
                              등록
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="detail-comment-more-wrap">
                        <button
                          type="button"
                          className="detail-comment-more"
                          onClick={() =>
                            setCommentMenuId(
                              commentMenuId === item.id
                                ? null
                                : item.id
                            )
                          }
                        >
                          ···
                        </button>

                        {commentMenuId === item.id && (
                          <div className="detail-comment-more-menu">
                            <button
                              type="button"
                              onClick={() =>
                                handleCommentEditStart(item)
                              }
                            >
                              수정하기
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {renderReplies(item.replies)}
                  </div>
                ))}

              </div>
            </section>

          </article>

          <aside className="community-detail-sidebar">

            <section className="detail-sidebar-section">
              <div className="detail-sidebar-head">
                <h2>오늘의 하찮은 친구들</h2>
                <button type="button">더보기 ›</button>
              </div>

              <div className="detail-sidebar-list">
               {todayPosts.map((item) => (
  <article
    className="detail-sidebar-card"
    key={item.id}
    onClick={() => {
      navigate(`/community/${item.id}`)
      window.scrollTo(0, 0)
    }}
  >
                    <img
                      src={item.image}
                      alt={item.title}
                    />

                    <div>
                      <h3>{item.title}</h3>

                      <div className="detail-sidebar-stats">

                        <span className="detail-sidebar-stat">
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>

                          {item.likes}
                        </span>

                        <span className="detail-sidebar-stat">
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>

                          {item.comments}
                        </span>

                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="detail-sidebar-section">
              <div className="detail-sidebar-head">
                <h2>비슷한 이야기</h2>
                <button type="button">더보기 ›</button>
              </div>

              <div className="detail-sidebar-list">
                {similarPosts.map((item) => (
  <article
    className="detail-sidebar-card"
    key={item.id}
    onClick={() => {
      navigate(`/community/${item.id}`)
      window.scrollTo(0, 0)
    }}
  >
                    <img
                      src={item.image}
                      alt={item.title}
                    />

                    <div>
                      <h3>{item.title}</h3>

                      <div className="detail-sidebar-stats">

                        <span className="detail-sidebar-stat">
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>

                          {item.likes}
                        </span>

                        <span className="detail-sidebar-stat">
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>

                          {item.comments}
                        </span>

                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

          </aside>

        </div>
      </div>
    </main>
  )
}

export default CommunityDetail