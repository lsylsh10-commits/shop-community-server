import { useState } from "react";

function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleTogglePassword = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="signup-form__field">
      <label htmlFor={id} className="signup-form__label">
        {label}
      </label>

      <div className="signup-form__password">
        <input
          id={id}
          name={name}
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="new-password"
          className="signup-form__input signup-form__input--password"
        />

        <button
          type="button"
          className="signup-form__password-toggle"
          onClick={handleTogglePassword}
          aria-label={isVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          <img
            src={
              isVisible
                ? "https://lsylsh10-commits.github.io/shop-community-server/images/login/eyeson.svg"
                : "https://lsylsh10-commits.github.io/shop-community-server/images/login/eyesoff.svg"
            }
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default PasswordField;