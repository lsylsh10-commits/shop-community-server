import LoginForm from "../components/login/LoginForm";
import SocialLogin from "../components/login/SocialLogin";
import "../styles/login.css";

function Login() {
  return (
    <main className="login-page">
      <div className="login-page__inner">
        {/* 로그인 제목 */}
        <div className="login-page__header">
          <h1 className="login-page__title">로그인</h1>
          <p className="login-page__subtitle">
            별것 아닌 하루도 충분해요.
          </p>
        </div>

        {/* 이메일 / 비밀번호 / 로그인 / 회원가입 */}
        <LoginForm />

        {/* 아이디 / 비밀번호 찾기 */}
        <div className="login-page__find">
          <button type="button" className="login-page__find-button">
            아이디 찾기
          </button>

          <span
            className="login-page__find-divider"
            aria-hidden="true"
          >
            |
          </span>

          <button type="button" className="login-page__find-button">
            비밀번호 찾기
          </button>
        </div>

        {/* 또는 */}
        <div className="login-page__divider">
          <span className="login-page__divider-line" />
          <span className="login-page__divider-text">또는</span>
          <span className="login-page__divider-line" />
        </div>

        {/* 소셜 로그인 */}
        <SocialLogin />
      </div>
    </main>
  );
}

export default Login;