import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getCountriesList } from '../libs/posts.js';
import { Paper, Box, Grid } from '@mui/material';

export async function getStaticProps() {
  const countries = await getCountriesList();
  return {
    props: {
      countries
    },
  };
}

export default function Home({ countries }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Countries List</title>
      </Head>

      <main>
        <h1 className={styles.title}>
          Initial Catalog Implementation
        </h1>
      </main>

      <footer>
        <p>
          Powered by Chanmony KEAT
        </p>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer p {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
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
