import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (!formData.password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    console.log("로그인 입력 데이터:", formData);

    // 시연용 로그인 상태 저장
    localStorage.setItem("isLoggedIn", "true");

    // Header에 로그인 상태 변경 알림
    window.dispatchEvent(new Event("loginStatusChanged"));

    // 로그인 후 메인 화면으로 이동
    navigate("/");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__field">
        <label htmlFor="email" className="login-form__label">
          이메일
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일을 입력해주세요."
          autoComplete="email"
          className="login-form__input"
        />
      </div>

      <PasswordInput
        value={formData.password}
        onChange={handleChange}
      />

      <div className="login-form__buttons">
        <button
          type="submit"
          className="login-form__button login-form__button--login"
        >
          로그인
        </button>

        <button
          type="button"
          className="login-form__button login-form__button--signup"
          onClick={handleSignUp}
        >
          회원가입
        </button>
      </div>
    </form>
  );
}

export default LoginForm;