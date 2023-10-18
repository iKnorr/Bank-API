/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect } from 'react';
import styles from '../login/login.module.css';
import stylesPages from '../page.module.css';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const UserProfilePage = () => {
  const { firstName, lastName } = useSelector((state: any) => state.user);
  const { token } = useSelector((state: any) => state.login);
  const router = useRouter();

  return (
    <>
      <main className={`${styles.main} ${styles.bgDark}`}>
        <div className={stylesPages.header}>
          <h1>
            Welcome back
            <br />
            {`${firstName} ${lastName}!`}
          </h1>
          <button className={stylesPages.editButton}>Edit Name</button>
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
