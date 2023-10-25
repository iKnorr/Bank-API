/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import stylesLogin from '../login/login.module.css';
import stylesPages from '../page.module.css';
import styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { updateUserName } from '@/services/apiService';
import {
  SET_FIRST_NAME,
  SET_LAST_NAME,
} from '../GlobalRedux/Features/User/userSlice';

const UserProfilePage = () => {
  const { firstName, lastName } = useSelector((state: any) => state.user);
  const { token } = useSelector((state: any) => state.login);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState({
    firstName: '',
    lastName: '',
  });
  const [isError, setIsError] = useState<boolean>(false);

  const handleEditName = () => {
    setIsEditName(true);
  };

  const handleSaveName = () => {
    setIsError(false);
    if (
      newUserName.firstName.trim().length <= 2 ||
      newUserName.lastName.trim().length <= 2
    ) {
      console.log('Name is incorrect');
      setIsError(true);
      return;
    }
    try {
      updateUserName(newUserName, token);
      dispatch(SET_FIRST_NAME(newUserName.firstName));
      dispatch(SET_LAST_NAME(newUserName.lastName));
    } catch (error) {
      console.log(error);
    }
    setIsEditName(false);
  };

  const handleCancelEditName = () => {
    setNewUserName({ ...newUserName, firstName: '', lastName: '' });
    setIsError(false);
    setIsEditName(false);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setNewUserName({ ...newUserName, firstName: e.target.value });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setNewUserName({ ...newUserName, lastName: e.target.value });
  };

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token]);

  return (
    <>
      <main className={`${stylesLogin.main} ${stylesLogin.bgDark}`}>
        <div className={stylesPages.header}>
          <h1>
            Welcome back
            <br />
            {`${firstName} ${lastName}!`}
          </h1>
          {isEditName ? (
            <div className={styles.editNameContainer}>
              <div className={styles.editNameInputWrapper}>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  onChange={handleFirstNameChange}
                  placeholder={firstName}
                />
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  onChange={handleLastNameChange}
                  placeholder={lastName}
                />
              </div>
              {isError ? (
                <div className={styles.errorText}>
                  <p>User Name incorrect or too short !</p>
                </div>
              ) : (
                <div className={styles.errorText}></div>
              )}
              <div className={styles.editNameButtonWrapper}>
                <button onClick={handleSaveName}>Save</button>
                <button onClick={handleCancelEditName}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className={stylesPages.editButton} onClick={handleEditName}>
              Edit Name
            </button>
          )}
        </div>
        <h2 className={stylesPages.srOnly}>Accounts</h2>
        <section className={stylesPages.account}>
          <div className={stylesPages.accountContentWrapper}>
            <h3 className={stylesPages.accountTitle}>
              Argent Bank Checking (x8349)
            </h3>
            <p className={stylesPages.accountAmount}>$2,082.79</p>
            <p className={stylesPages.accountAmountDescription}>
              Available Balance
            </p>
          </div>
          <div
            className={`${stylesPages.accountContentWrapper} ${stylesPages.cta}`}
          >
            <button className={stylesPages.transactionButton}>
              View transactions
            </button>
          </div>
        </section>
        <section className={stylesPages.account}>
          <div className={stylesPages.accountContentWrapper}>
            <h3 className={stylesPages.accountTitle}>
              Argent Bank Savings (x6712)
            </h3>
            <p className={stylesPages.accountAmount}>$10,928.42</p>
            <p className={stylesPages.accountAmountDescription}>
              Available Balance
            </p>
          </div>
          <div
            className={`${stylesPages.accountContentWrapper} ${stylesPages.cta}`}
          >
            <button className={stylesPages.transactionButton}>
              View transactions
            </button>
          </div>
        </section>
        <section className={stylesPages.account}>
          <div className={stylesPages.accountContentWrapper}>
            <h3 className={stylesPages.accountTitle}>
              Argent Bank Credit Card (x8349)
            </h3>
            <p className={stylesPages.accountAmount}>$184.30</p>
            <p className={stylesPages.accountAmountDescription}>
              Current Balance
            </p>
          </div>
          <div
            className={`${stylesPages.accountContentWrapper} ${stylesPages.cta}`}
          >
            <button className={stylesPages.transactionButton}>
              View transactions
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserProfilePage;
