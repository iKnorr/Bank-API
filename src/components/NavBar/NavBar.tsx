/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import styles from "./NavBar.module.css";
import { usePathname, useRouter } from "next/navigation";

export const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className={styles.mainNav}>
      <a className={styles.mainNavLogo} href='/'>
        <img
          className={styles.mainNavLogoImage}
          src='/argentBankLogo.png'
          alt='Argent Bank Logo'
        />
        {pathname === "/sign-up" && (
          <h1 className={styles.srOnly}>Argent Bank</h1>
        )}
      </a>
      {pathname === "/user" && (
        <div>
          {/* TODO: change link and name dynammicaly */}
          <a className={styles.mainNavItem} href='./user.html'>
            <i className='fa fa-user-circle'></i>
            Tony
          </a>
          <a className={styles.mainNavItem} href='./index.html'>
            <i className='fa fa-sign-out'></i>
            Sign Out
          </a>
        </div>
      )}
      <div>
        <a className={styles.mainNavItem} href='/login'>
          <i className='fa fa-user-circle'></i>
          Sign In
        </a>
      </div>
    </nav>
  );
};
