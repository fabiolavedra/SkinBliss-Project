import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// internal
import { CloseEye, OpenEye } from '@/svg';
import ErrorMsg from '../common/error-msg';
import { notifyError, notifySuccess } from '@/utils/toast';
import { useRegisterUserMutation } from '@/redux/features/auth/authApi';

// schema
const schema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  surname: Yup.string().required().label('Surname'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
  passwordConfirm: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  phone: Yup.string().required().label('Phone'),
  remember: Yup.bool().oneOf([true], 'You must agree to the terms and conditions to proceed.').label('Terms and Conditions'),
});

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // on submit
  const onSubmit = (data) => {
    registerUser({
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      phone: data.phone,
    }).then((result) => {
      if (result?.error) {
        notifyError('Register Failed');
      } else {
        notifySuccess(result?.data?.message);
        reset();

        navigate('/');
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input {...register('name', { required: `Name is required!` })} id="name" name="name" type="text" placeholder="Name" />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="name">Your Name</label>
          </div>
          <ErrorMsg msg={errors.name?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input {...register('surname', { required: `Surname is required!` })} id="surname" name="surname" type="text" placeholder="Surname" />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="name">Your Surname</label>
          </div>
          <ErrorMsg msg={errors.surname?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input {...register('email', { required: `Email is required!` })} id="email" name="email" type="email" placeholder="shofy@mail.com" />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Your Email</label>
          </div>
          <ErrorMsg msg={errors.email?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input {...register('phone', { required: `Phone is required!` })} id="phone" name="phone" type="number" />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Your Phone</label>
          </div>
          <ErrorMsg msg={errors.phone?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">
              <input {...register('password', { required: `Password is required!` })} id="password" name="password" type={showPass ? 'text' : 'password'} placeholder="Min. 6 character" />
            </div>
            <div className="tp-login-input-eye" id="password-show-toggle">
              <span className="open-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? <CloseEye /> : <OpenEye />}
              </span>
            </div>
            <div className="tp-login-input-title">
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <ErrorMsg msg={errors.password?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">
              <input {...register('passwordConfirm', { required: `Password is required!` })} id="passwordConfirm" name="passwordConfirm" type={showPass ? 'text' : 'password'} placeholder="Min. 6 character" />
            </div>
            <div className="tp-login-input-eye" id="password-show-toggle">
              <span className="open-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? <CloseEye /> : <OpenEye />}
              </span>
            </div>
            <div className="tp-login-input-title">
              <label htmlFor="password">Password Confirm</label>
            </div>
          </div>
          <ErrorMsg msg={errors.passwordConfirm?.message} />
        </div>
      </div>
      <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
        <div className="tp-login-remeber">
          <input
            {...register('remember', {
              required: `Terms and Conditions is required!`,
            })}
            id="remember"
            name="remember"
            type="checkbox"
          />
          <label htmlFor="remember">
            I accept the terms of the Service & <a href="#">Privacy Policy</a>.
          </label>
          <ErrorMsg msg={errors.remember?.message} />
        </div>
      </div>
      <div className="tp-login-bottom">
        <button type="submit" className="tp-login-btn w-100">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
