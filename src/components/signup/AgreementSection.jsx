import { signupAgreements } from "../../data/signup";

function AgreementSection({ agreements, onChange, onView }) {
  return (
    <div className="signup-agreements">
      {signupAgreements.map((agreement) => (
        <div className="signup-agreements__item" key={agreement.id}>
          <label className="signup-agreements__label">
            <input
              type="checkbox"
              name={agreement.id}
              checked={agreements[agreement.id]}
              onChange={onChange}
              className="signup-agreements__checkbox"
            />

            <span>
              {agreement.required ? "(필수)" : "(선택)"} {agreement.label}
            </span>
          </label>

          <button
            type="button"
            className="signup-agreements__view"
            onClick={() => onView(agreement.id)}
          >
            보기
            <span aria-hidden="true">›</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default AgreementSection;