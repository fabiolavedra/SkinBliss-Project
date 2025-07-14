import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// internal
import google_icon from '@assets/img/icon/login/google.svg';
import { useSignUpProviderMutation } from '@/redux/features/auth/authApi';
import { notifyError, notifySuccess } from '@/utils/toast';

const GoogleSignUp = () => {
  const [signUpProvider] = useSignUpProviderMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get('redirect');
  // handleGoogleSignIn
  const handleGoogleSignIn = (user) => {
    if (user) {
      signUpProvider(user?.credential).then((res) => {
        if (res?.data) {
          notifySuccess('Login success!');
          navigate(redirect || '/');
        } else {
          console.log('result error -->', res.error);
          notifyError(res.error?.message);
        }
      });
    }
  };
  return (
    <GoogleLogin
      render={(renderProps) => (
        <a className="cursor-pointer" onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <img src={google_icon} alt="google_icon" />
          Sign in with google
        </a>
      )}
      onSuccess={handleGoogleSignIn}
      onFailure={(err) => notifyError(err?.message || 'Something wrong on your auth setup!')}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleSignUp;
