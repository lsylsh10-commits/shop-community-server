import { useState } from "react";
import { socialLoginOptions } from "../../data/login";
import SocialLoginModal from "./SocialLoginModal";

function SocialLogin() {
  const [selectedProvider, setSelectedProvider] = useState(null);

  const handleSocialLogin = (provider) => {
    setSelectedProvider(provider);
  };

  const handleCloseModal = () => {
    setSelectedProvider(null);
  };

  return (
    <>
      <div className="social-login">
        {socialLoginOptions.map((social) => (
          <button
            key={social.id}
            type="button"
            className={`social-login__button social-login__button--${social.id}`}
            onClick={() => handleSocialLogin(social.id)}
          >
            <img
              src={social.icon}
              alt=""
              className="social-login__icon"
            />

            <span>{social.name}</span>
          </button>
        ))}
      </div>

      {selectedProvider && (
        <SocialLoginModal
          provider={selectedProvider}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default SocialLogin;