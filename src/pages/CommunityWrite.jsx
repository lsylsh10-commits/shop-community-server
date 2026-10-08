import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import '../styles/community-write.css'
import { products } from '../data/ShopData'

const communityMenus = [
  '전체',
  '친구 자랑',
  '친구의 하루',
  '하찮은 이야기',
  '굿즈 활용팁',
  '직장인 공감',
  '자유 수다',
]

const menuDescriptions = {
  전체: '어떤 이야기든 자유롭게 작성해보세요.',
  '친구 자랑': '하찮은 친구들의 귀엽고 자랑하고 싶은 순간을 소개해주세요.',
  '친구의 하루': '하찮은 친구들과 함께한 오늘의 일상을 기록해주세요.',
  '하찮은 이야기': '하찮은 친구들과 관련된 다양한 이야기를 들려주세요.',
  '굿즈 활용팁': '하찮 굿즈를 사용하는 나만의 방법과 팁을 공유해주세요.',
  '직장인 공감': '회사에서 겪은 소소하고 공감되는 이야기를 나눠주세요.',
  '자유 수다': '주제에 상관없이 편하게 이야기해주세요.',
}

const menuExtraFields = {
  '친구 자랑': {
    label: '자랑 포인트',
    placeholder: '어떤 점이 가장 자랑스러운지 적어주세요.',
  },
  '친구의 하루': {
    label: '오늘의 한줄',
    placeholder: '오늘 하루를 한 줄로 표현해보세요.',
  },
  '하찮은 이야기': {
    label: '이야기 주제',
    placeholder: '어떤 이야기를 나누고 싶은지 적어주세요.',
  },
  '굿즈 활용팁': {
    label: '활용 상황',
    placeholder: '어디에서 어떻게 활용했는지 적어주세요.',
  },
  '직장인 공감': {
    label: '공감 포인트',
    placeholder: '어떤 순간에 가장 공감했는지 적어주세요.',
  },
  '자유 수다': {
    label: '말머리',
    placeholder: '이야기의 주제를 간단히 적어주세요.',
  },
}

function CommunityWrite() {
  const navigate = useNavigate()

  const [selectedMenu, setSelectedMenu] = useState('전체')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [writeMode, setWriteMode] = useState('nickname')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [selectedCharacters, setSelectedCharacters] = useState([])
  const [isCharacterMenuOpen, setIsCharacterMenuOpen] = useState(false)
  const [productSearch, setProductSearch] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [extraText, setExtraText] = useState('')

  const [modal, setModal] = useState({
    open: false,
    type: 'alert',
    message: '',
    postId: null,
  })

  const productSearchRef = useRef(null)
  const characterMenuRef = useRef(null)

  const activeCategory =
    selectedMenu === '전체' ? selectedCategory : selectedMenu

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        productSearchRef.current &&
        !productSearchRef.current.contains(e.target)
      ) {
        setProductSearch('')
      }

      if (
        characterMenuRef.current &&
        !characterMenuRef.current.contains(e.target)
      ) {
        setIsCharacterMenuOpen(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    setImages((prev) => [...prev, ...newImages].slice(0, 10))
  }

  const handleCharacterChange = (character) => {
    setSelectedCharacters((prev) =>
      prev.includes(character)
        ? prev.filter((item) => item !== character)
        : [...prev, character]
    )
  }

  const filteredProducts = products.filter((product) => {
    const keyword = productSearch.toLowerCase()

    const matchesName = product.name
      .toLowerCase()
      .includes(keyword)

    const matchesOptions = product.options?.some((option) =>
      option.toLowerCase().includes(keyword)
    )

    return matchesName || matchesOptions
  })

  const handleProductSelect = (product) => {
    setSelectedProducts((prev) => {
      const alreadySelected = prev.some(
        (item) => item.id === product.id
      )

      if (alreadySelected) {
        return prev.filter((item) => item.id !== product.id)
      }

      return [...prev, product]
    })

    setProductSearch('')
  }

  const handleImageRemove = (index) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview)

      return prev.filter((_, imageIndex) => imageIndex !== index)
    })
  }

  const handleCancel = () => {
    setSelectedMenu('전체')
    setSelectedCategory('')
    setWriteMode('nickname')
    setTitle('')
    setContent('')

    images.forEach((image) => {
      URL.revokeObjectURL(image.preview)
    })

    setImages([])
    setSelectedCharacters([])
    setProductSearch('')
    setSelectedProducts([])
    setExtraText('')
  }

  const openAlertModal = (message) => {
    setModal({
      open: true,
      type: 'alert',
      message,
      postId: null,
    })
  }

  const handleModalConfirm = () => {
    if (modal.type === 'success' && modal.postId) {
      const postId = modal.postId

      setModal({
        open: false,
        type: 'alert',
        message: '',
        postId: null,
      })

      navigate(`/community/${postId}`)
      return
    }

    setModal({
      open: false,
      type: 'alert',
      message: '',
      postId: null,
    })
  }

const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const img = new Image()

      img.onload = () => {
        try {
          const MAX_SIZE = 1200

          let width = img.width
          let height = img.height

          if (width > MAX_SIZE || height > MAX_SIZE) {
            if (width > height) {
              height = Math.round((height * MAX_SIZE) / width)
              width = MAX_SIZE
            } else {
              width = Math.round((width * MAX_SIZE) / height)
              height = MAX_SIZE
            }
          }

          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext('2d')

          if (!ctx) {
            reject(new Error('이미지 처리에 실패했습니다.'))
            return
          }

          ctx.drawImage(img, 0, 0, width, height)

          const compressedDataUrl = canvas.toDataURL(
            'image/jpeg',
            0.72
          )

          resolve(compressedDataUrl)
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => {
        reject(new Error('이미지를 불러올 수 없습니다.'))
      }

      img.src = reader.result
    }

    reader.onerror = () => {
      reject(new Error('이미지 파일을 읽을 수 없습니다.'))
    }

    reader.readAsDataURL(file)
  })
}

const getStorageErrorMessage = (error) => {
  if (
    error?.name === 'QuotaExceededError' ||
    error?.name === 'NS_ERROR_DOM_QUOTA_REACHED'
  ) {
    return '저장 공간이 부족합니다. 이미지 수를 줄여서 다시 등록해주세요.'
  }

  return error?.message || '게시글 등록 중 문제가 발생했습니다.'
}

  const handleSubmit = async () => {
    if (selectedMenu === '전체' && !selectedCategory) {
      openAlertModal('카테고리를 선택해주세요.')
      return
    }

    if (!title.trim()) {
      openAlertModal('제목을 입력해주세요.')
      return
    }

    if (!content.trim()) {
      openAlertModal('내용을 입력해주세요.')
      return
    }

    try {
      const savedImages = await Promise.all(
        images.map((image) => fileToDataUrl(image.file))
      )

      const postId = `user-${Date.now()}`

      const newPost = {
        id: postId,
        category: activeCategory,
        writeMode,
        extraText: extraText.trim(),

        title: title.trim(),
        content: content.trim(),

        author: writeMode === 'anonymous' ? '익명' : '나',
        date: '방금 전',
        createdAt: new Date().toISOString(),

        image: savedImages[0] || '',
        images: savedImages,

        tags: selectedCharacters,
        characters: selectedCharacters,

        productIds: selectedProducts.map((product) => product.id),
        productId: selectedProducts[0]?.id || null,

        products: selectedProducts.map((product) => ({
          id: product.id,
          name: product.name,
        })),

        likes: 0,
        comments: 0,
        isUserPost: true,
      }

      const previousPosts = JSON.parse(
        localStorage.getItem('communityUserPosts') || '[]'
      )

      localStorage.setItem(
        'communityUserPosts',
        JSON.stringify([newPost, ...previousPosts])
      )

      setModal({
        open: true,
        type: 'success',
        message: '게시글이 등록되었습니다.',
        postId,
      })
   } catch (error) {
  console.error('게시글 등록 실패:', error)

  openAlertModal(getStorageErrorMessage(error))
}
  }

  return (
    <main className="community-write">
      <div className="community-write-inner">

        <aside className="community-write-sidebar">
          <h2>커뮤니티</h2>

          <nav className="community-write-menu">
            {communityMenus.map((menu) => (
              <button
                key={menu}
                type="button"
                className={
                  selectedMenu === menu ? 'active' : ''
                }
                onClick={() => {
                  setSelectedMenu(menu)
                  setExtraText('')
                }}
              >
                {menu}
              </button>
            ))}
          </nav>
        </aside>

        <section className="community-write-content">
          <div className="community-write-heading">
            <h1>새 이야기 쓰기</h1>
            <p>별것 아닌 오늘도, 같이 나눠요.</p>
          </div>

          <div className="community-write-form">

            <div className="community-write-mobile-category">
              <div className="community-write-row-label">
                카테고리
              </div>

              <div className="community-write-select-wrap">
                <select
                  value={activeCategory || ''}
                  onChange={(e) => {
                    setSelectedMenu('전체')
                    setSelectedCategory(e.target.value)
                    setExtraText('')
                  }}
                >
                  <option value="">
                    카테고리를 선택해주세요
                  </option>

                  {communityMenus
                    .filter((menu) => menu !== '전체')
                    .map((menu) => (
                      <option key={menu} value={menu}>
                        {menu}
                      </option>
                    ))}
                </select>

                <svg
                  className="community-write-select-arrow"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M7 10l5 5 5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {selectedMenu === '전체' && (
              <div className="community-write-row community-write-desktop-category">
                <div className="community-write-row-label">
                  카테고리
                </div>

                <div className="community-write-row-content">
                  <div className="community-write-select-wrap">
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value)
                        setExtraText('')
                      }}
                    >
                      <option value="">
                        카테고리를 선택해주세요
                      </option>

                      {communityMenus
                        .filter((menu) => menu !== '전체')
                        .map((menu) => (
                          <option
                            key={menu}
                            value={menu}
                          >
                            {menu}
                          </option>
                        ))}
                    </select>

                    <svg
                      className="community-write-select-arrow"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M7 10l5 5 5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {activeCategory &&
              menuExtraFields[activeCategory] && (
                <div className="community-write-row">
                  <div className="community-write-row-label">
                    {
                      menuExtraFields[activeCategory]
                        .label
                    }
                  </div>

                  <div className="community-write-row-content">
                    <div className="community-write-input-wrap">
                      <input
                        type="text"
                        value={extraText}
                        placeholder={
                          menuExtraFields[
                            activeCategory
                          ].placeholder
                        }
                        onChange={(e) =>
                          setExtraText(e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

            <div className="community-write-row">
              <div className="community-write-row-label">
                작성 방식
              </div>

              <div className="community-write-row-content">
                <div className="community-write-radio-group">
                  <label>
                    <input
                      type="radio"
                      name="writeMode"
                      value="nickname"
                      checked={
                        writeMode === 'nickname'
                      }
                      onChange={(e) =>
                        setWriteMode(e.target.value)
                      }
                    />
                    닉네임으로 작성
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="writeMode"
                      value="anonymous"
                      checked={
                        writeMode === 'anonymous'
                      }
                      onChange={(e) =>
                        setWriteMode(e.target.value)
                      }
                    />
                    익명으로 작성
                  </label>

                  <span className="community-write-help">
                    ⓘ 익명 게시글은 다른 사용자에게
                    작성자 정보가 노출되지 않습니다.
                  </span>
                </div>
              </div>
            </div>

            <div className="community-write-row">
              <div className="community-write-row-label">
                제목
              </div>

              <div className="community-write-row-content">
                <div className="community-write-input-wrap">
                  <input
                    id="title"
                    type="text"
                    value={title}
                    maxLength={50}
                    placeholder="제목을 입력해주세요."
                    onChange={(e) =>
                      setTitle(e.target.value)
                    }
                  />
                </div>

                <div className="community-write-count-outside">
                  {title.length}/50
                </div>
              </div>
            </div>

            <div className="community-write-row">
              <div className="community-write-row-label">
                내용
              </div>

              <div className="community-write-row-content">
                <div className="community-write-textarea-wrap">
                  <textarea
                    id="content"
                    value={content}
                    maxLength={2000}
                    placeholder={
                      '오늘 있었던 이야기를 자유롭게 적어보세요.\n서로에게 작은 위로가 될 수 있어요.'
                    }
                    onChange={(e) =>
                      setContent(e.target.value)
                    }
                  />
                </div>

                <div className="community-write-count-outside">
                  {content.length}/2,000
                </div>
              </div>
            </div>

            <div className="community-write-row community-write-image-row">
              <div className="community-write-row-label">
                이미지
              </div>

              <div className="community-write-row-content">
                <div className="community-write-image-info">
                  최대 10장까지 업로드할 수 있습니다.
                </div>

                <div className="community-write-image-list">
                  {[0, 1, 2, 3, 4].map(
                    (slotIndex) => {
                      const image =
                        images[slotIndex]

                      if (image) {
                        return (
                          <div
                            className="community-write-image-preview"
                            key={slotIndex}
                          >
                            <img
                              src={image.preview}
                              alt={`업로드 이미지 ${
                                slotIndex + 1
                              }`}
                            />

                            <button
                              type="button"
                              className="community-write-image-remove"
                              onClick={() =>
                                handleImageRemove(
                                  slotIndex
                                )
                              }
                              aria-label="이미지 삭제"
                            >
                              ×
                            </button>
                          </div>
                        )
                      }

                      return (
                        <label
                          className="community-write-image-add"
                          key={slotIndex}
                        >
                          <span className="community-write-image-plus">
                            +
                          </span>
                          <span>이미지 추가</span>

                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={
                              handleImageChange
                            }
                          />
                        </label>
                      )
                    }
                  )}
                </div>
              </div>
            </div>

            <div className="community-write-row community-write-character-row">
              <div className="community-write-row-label">
                캐릭터 태그
              </div>

              <div className="community-write-row-content">

                <div className="community-write-character-desktop">
                  <p className="community-write-field-help">
                    함께한 하찮은 친구를
                    선택해보세요. (복수 선택 가능)
                  </p>

                  <div className="community-write-character-list">
                    {[
                      '포포',
                      '뭉치',
                      '짝이',
                      '빵이',
                      '반디',
                      '기운이',
                    ].map((character) => (
                      <label
                        key={character}
                        className={
                          selectedCharacters.includes(
                            character
                          )
                            ? 'community-write-character active'
                            : 'community-write-character'
                        }
                      >
                        <input
                          type="checkbox"
                          checked={selectedCharacters.includes(
                            character
                          )}
                          onChange={() =>
                            handleCharacterChange(
                              character
                            )
                          }
                        />

                        {character}
                      </label>
                    ))}
                  </div>
                </div>

                <div
                  className="community-write-character-mobile"
                  ref={characterMenuRef}
                >
                  <button
                    type="button"
                    className="community-write-character-select"
                    onClick={() =>
                      setIsCharacterMenuOpen(
                        (prev) => !prev
                      )
                    }
                  >
                    <span>
                      캐릭터를 선택해주세요
                    </span>

                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M7 10l5 5 5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {isCharacterMenuOpen && (
                    <div className="community-write-character-options">
                      {[
                        '포포',
                        '뭉치',
                        '짝이',
                        '빵이',
                        '반디',
                        '기운이',
                      ].map((character) => (
                        <label key={character}>
                          <input
                            type="checkbox"
                            checked={selectedCharacters.includes(
                              character
                            )}
                            onChange={() =>
                              handleCharacterChange(
                                character
                              )
                            }
                          />
                          {character}
                        </label>
                      ))}
                    </div>
                  )}

                  {selectedCharacters.length >
                    0 && (
                    <div className="community-write-character-chips">
                      {selectedCharacters.map(
                        (character) => (
                          <button
                            key={character}
                            type="button"
                            onClick={() =>
                              handleCharacterChange(
                                character
                              )
                            }
                          >
                            {character} ×
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="community-write-row community-write-product-row">
              <div className="community-write-row-label">
                상품 태그
              </div>

              <div className="community-write-row-content">
                <p className="community-write-field-help">
                  관련 상품을 추가하면, 다른
                  친구들도 쉽게 발견할 수 있어요.
                  (선택사항)
                </p>

                <div
                  className="community-write-product-search-wrap"
                  ref={productSearchRef}
                >
                  <div className="community-write-product-search">
                    <svg
                      className="community-write-search-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="6.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />

                      <path
                        d="M16 16L20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>

                    <input
                      type="text"
                      value={productSearch}
                      placeholder="상품명을 검색해보세요."
                      onChange={(e) =>
                        setProductSearch(
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {productSearch.trim() !== '' && (
                    <div className="community-write-product-results">
                      {filteredProducts.length >
                      0 ? (
                        filteredProducts.map(
                          (product) => (
                            <button
                              key={product.id}
                              type="button"
                              className="community-write-product-result"
                              onClick={() =>
                                handleProductSelect(
                                  product
                                )
                              }
                            >
                              {product.name}
                            </button>
                          )
                        )
                      ) : (
                        <p className="community-write-product-empty">
                          검색 결과가 없습니다.
                        </p>
                      )}
                    </div>
                  )}

                  {selectedProducts.length > 0 && (
                    <div className="community-write-selected-products">
                      {selectedProducts.map(
                        (product) => (
                          <button
                            key={product.id}
                            type="button"
                            onClick={() =>
                              handleProductSelect(
                                product
                              )
                            }
                          >
                            {product.name} ×
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="community-write-actions">
              <button
                type="button"
                className="community-write-cancel"
                onClick={handleCancel}
              >
                취소
              </button>

              <button
                type="button"
                className="community-write-submit"
                onClick={handleSubmit}
              >
                등록하기
              </button>
            </div>
          </div>
        </section>
      </div>

      {modal.open && (
        <div
          className="community-write-modal-overlay"
          onClick={handleModalConfirm}
        >
          <div
            className="community-write-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="community-write-modal-icon">
              {modal.type === 'success'
                ? '✓'
                : '!'}
            </div>

            <h2>
              {modal.type === 'success'
                ? '등록 완료'
                : '확인해주세요'}
            </h2>

            <p>{modal.message}</p>

            <button
              type="button"
              onClick={handleModalConfirm}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default CommunityWrite