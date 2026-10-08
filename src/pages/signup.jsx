import SignupForm from "../components/signup/SignupForm";
import "../styles/signup.css";

function Signup() {
  return (
    <main className="signup-page">
      <div className="signup-page__inner">
        <div className="signup-page__header">
          <h1 className="signup-page__title">회원가입</h1>
          <p className="signup-page__subtitle">
            하찮은 친구가 되어보세요.
          </p>
        </div>

        <SignupForm />
      </div>
    </main>
  );
}

export default Signup;