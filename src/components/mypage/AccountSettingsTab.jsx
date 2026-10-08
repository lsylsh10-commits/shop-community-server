import { useState } from "react";

function AccountSettingsTab() {
  const [account, setAccount] = useState({
    email: "hajjan@example.com",
    nickname: "하찮은 회사원",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    setMessage("계정 정보가 저장되었습니다.");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <section className="mypage-tab-content account-settings">
      <h1>계정 설정</h1>

      <form
        className="account-settings__form"
        onSubmit={handleSave}
      >
        <div className="account-settings__field">
          <label htmlFor="account-email">이메일</label>

          <input
            id="account-email"
            name="email"
            type="email"
            value={account.email}
            onChange={handleChange}
          />
        </div>

        <div className="account-settings__field">
          <label htmlFor="account-nickname">닉네임</label>

          <input
            id="account-nickname"
            name="nickname"
            type="text"
            value={account.nickname}
            onChange={handleChange}
          />
        </div>

        <div className="account-settings__field">
          <label htmlFor="account-password">비밀번호</label>

          <input
            id="account-password"
            type="password"
            placeholder="비밀번호 변경"
          />
        </div>

        <div className="account-settings__actions">
          {message && (
            <span className="account-settings__message">
              {message}
            </span>
          )}

          <button type="submit">
            변경사항 저장
          </button>
        </div>
      </form>
    </section>
  );
}

export default AccountSettingsTab;