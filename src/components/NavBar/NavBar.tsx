/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect } from 'react';
import styles from './NavBar.module.css';
import stylesPages from '../../app/page.module.css';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_TOKEN,
} from '@/app/GlobalRedux/Features/Login/loginSlice';
import {
  SET_FIRST_NAME,
  SET_LAST_NAME,
} from '@/app/GlobalRedux/Features/User/userSlice';
import Link from 'next/link';
import { getUserProfile } from '@/services/apiService';

export const NavBar = () => {
  const { firstName } = useSelector((state: any) => state.user);
  const { token } = useSelector((state: any) => state.login);
  const dispatch = useDispatch();

  const router = useRouter();

  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userLastName');
    dispatch(SET_TOKEN(''));
    dispatch(SET_PASSWORD(''));
    dispatch(SET_EMAIL(''));
    dispatch(SET_FIRST_NAME(''));
    dispatch(SET_LAST_NAME(''));

    router.push('/');
  };

  useEffect(() => {
    if (token) {
      const callUserProfile = async () => {
        try {
          const res = await getUserProfile(token);
          if (res?.status === 200) {
            const { firstName, lastName } = res?.data.body;
            dispatch(SET_FIRST_NAME(firstName));
            dispatch(SET_LAST_NAME(lastName));
          }
        } catch (error) {
          console.log(error);
        }
      };
      callUserProfile();
    } else {
      router.push('/');
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token]);

  return (
    <nav className={styles.mainNav}>
      <Link className={styles.mainNavLogo} href="/">
        <img
          className={styles.mainNavLogoImage}
          src="/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className={stylesPages.srOnly}>Argent Bank</h1>
      </Link>
      {token ? (
        <div>
          <Link className={styles.mainNavItem} href={'/profile'}>
            <i className="fa fa-user-circle"></i>
            {firstName}
          </Link>
          <Link className={styles.mainNavItem} href={''} onClick={handleLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      ) : (
        <div>
          <Link className={styles.mainNavItem} href="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};
