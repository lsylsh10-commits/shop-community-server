import { useState } from "react";

function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "하찮은 회사원",
    username: "@hajjan",
    description:
      "작은 것들이 모여, 조금 더 따뜻한 하루가 되는 것 같아요. 지금, 하찮지만 소중한 하루를 기록 중입니다.",
  });

  const [editProfile, setEditProfile] = useState(profile);

  const handleEdit = () => {
    setEditProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
  };

  return (
    <>
      <section className="profile-section">
        <div className="profile-section__image-wrap">
          <img
            src="https://lsylsh10-commits.github.io/shop-community-server/images/mypage/profile01.png"
            alt="프로필"
            className="profile-section__image"
          />
        </div>

        <div className="profile-section__info">
          <h1>{profile.name}</h1>

          <span className="profile-section__username">
            {profile.username}
          </span>

          <p className="profile-section__description">
            {profile.description}
          </p>

          <div className="profile-section__stats">
            <div>
              <strong>128</strong>
              <span>팔로워</span>
            </div>

            <div>
              <strong>84</strong>
              <span>팔로잉</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="profile-section__edit"
          onClick={handleEdit}
        >
          프로필 수정
        </button>
      </section>

      {isEditing && (
        <div
          className="profile-edit-overlay"
          onMouseDown={handleCancel}
        >
          <div
            className="profile-edit-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="profile-edit-modal__header">
              <h2>프로필 수정</h2>

              <button
                type="button"
                className="profile-edit-modal__close"
                onClick={handleCancel}
                aria-label="프로필 수정 닫기"
              >
                ×
              </button>
            </div>

            <div className="profile-edit-modal__body">
              <label className="profile-edit-modal__field">
                <span>이름</span>

                <input
                  type="text"
                  value={editProfile.name}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      name: e.target.value,
                    })
                  }
                />
              </label>

              <label className="profile-edit-modal__field">
                <span>소개</span>

                <textarea
                  value={editProfile.description}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      description: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="profile-edit-modal__footer">
              <button
                type="button"
                className="profile-edit-modal__cancel"
                onClick={handleCancel}
              >
                취소
              </button>

              <button
                type="button"
                className="profile-edit-modal__save"
                onClick={handleSave}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileSection;