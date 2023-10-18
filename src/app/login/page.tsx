'use client';

import React, { useEffect, useState } from 'react';
import styles from './login.module.css';
import { getUserProfile, loginUser } from '@/services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_TOKEN,
} from '../GlobalRedux/Features/Login/loginSlice';
import { useRouter } from 'next/navigation';
import {
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_USER_ID,
} from '../GlobalRedux/Features/User/userSlice';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { email, password, token } = useSelector((state: any) => state.login);
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const value = e.target.value;

    if (e.target.name === 'email') {
      dispatch(SET_EMAIL(value));
    } else if (e.target.name === 'password') {
      dispatch(SET_PASSWORD(value));
    } else {
      console.log('Something went wrong');
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await loginUser({
        userLoginData: { email: email, password: password },
      });
      const JWTAuthToken = response?.data.body.token;

      if (response?.status === 200 && JWTAuthToken) {
        const res = await getUserProfile(JWTAuthToken);
        if (JWTAuthToken && isRememberMe) {
          localStorage.setItem('token', JWTAuthToken);
          dispatch(SET_TOKEN(localStorage.getItem('token')));
        } else if (JWTAuthToken && !isRememberMe) {
          sessionStorage.setItem('token', JWTAuthToken);
          dispatch(SET_TOKEN(sessionStorage.getItem('token')));
        } else {
          console.log('Something went wrong');
        }

        if (res?.status === 200) {
          const { firstName, lastName, id } = res?.data.body;

          dispatch(SET_USER_ID(id));
          dispatch(SET_FIRST_NAME(firstName));
          dispatch(SET_LAST_NAME(lastName));

          router.push('/profile');
        } else {
          console.log(`${res?.status}: Auhtentication Error`);
        }
      } else {
        console.log(`${response?.status}: ${response?.data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className={`${styles.main} ${styles.bgDark}`}>
        <section className={styles.signInContent}>
          <i className={`fa fa-user-circle ${styles.signInIcon}`}></i>
          <h1>Sign In</h1>
          <form>
            <div className={styles.inputWrapper}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputRemember}>
              <input
                type="checkbox"
                id="remember-me"
                checked={isRememberMe}
                onChange={() => setIsRememberMe(prev => !prev)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className={styles.signInButton} onClick={handleLogin}>
              Sign In
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default LoginPage;
