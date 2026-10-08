import { useState } from "react";

function PasswordInput({ value, onChange }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="login-form__field">
      <label htmlFor="password" className="login-form__label">
        비밀번호
      </label>

      <div className="login-form__password">
        <input
          id="password"
          name="password"
          type={isPasswordVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="비밀번호를 입력해주세요."
          autoComplete="current-password"
          className="login-form__input login-form__input--password"
        />

        <button
          type="button"
          className="login-form__password-toggle"
          onClick={handleTogglePassword}
          aria-label={
            isPasswordVisible
              ? "비밀번호 숨기기"
              : "비밀번호 보기"
          }
        >
          <img
            src={
              isPasswordVisible
                ? "/shop-community/images/login/eyeson.svg"
                : "/shop-community/images/login/eyesoff.svg"
            }
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;