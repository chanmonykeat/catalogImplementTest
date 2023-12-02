import * as React from 'react';
import styles from '../../styles/Home.module.css';
import Footer from './footer';
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Countries List</title>
      </Head>
      <main>
        {children}
      </main>
      <Footer />
      <style jsx>{`
  main {
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
  `}</style>
      <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family:
          -apple-system,
          BlinkMacSystemFont,
          Segoe UI,
          Roboto,
          Oxygen,
          Ubuntu,
          Cantarell,
          Fira Sans,
          Droid Sans,
          Helvetica Neue,
          sans-serif;
      }
      * {
        box-sizing: border-box;
      }
      `}</style>
    </div>
  );
}
