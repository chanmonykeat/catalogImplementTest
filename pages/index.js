import * as React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getCountriesList } from '../libs/posts.js';
import {
  Paper,
  Box,
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  TableSortLabel,
  Table,
} from '@mui/material';

const columns = [
  {
    id: 'flag',
    label: 'Flag',
    minWidth: 100,
  },
  {
    id: 'country_name',
    label: 'Country Name',
    minWidth: 170,
  },
  {
    id: 'code',
    label: 'Country Code',
    minWidth: 170,
  },
  {
    id: 'native_country_name',
    label: 'Native Country Name',
    minWidth: 170,
  },
  {
    id: 'alt_country_name',
    label: 'Alternative Country Name',
    minWidth: 170,
  },
  {
    id: 'country_calling_code',
    label: 'Country Call Code',
    minWidth: 100,
  },
];
export async function getStaticProps() {
  const countries = await getCountriesList();
  return {
    props: {
      countries
    },
  };
}

export default function Home({ countries }) {
  const [page, setPage] = React.useState(0);
  const [countryOrder, setCountryOrder] = React.useState('asc');
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const descendingComparator = (a, b) => {
    if (b.officialName < a.officialName) {
      return -1;
    }
    if (b.officialName > a.officialName) {
      return 1;
    }
    return 0;
  }

  const getComparator = (order) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b)
      : (a, b) => -descendingComparator(a, b);
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log(countries[0]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Countries List</title>
      </Head>

      <main>
        <h1 className={styles.title}>
          Initial Catalog Implementation
        </h1>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              {
                /*
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Country
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
            </TableRow>
            */
                <TableRow stlye={{backgroundColor: 'yellow'}}>
              {
                columns.map((column) => 
                  column.id !== 'code' 
                    ? column.id === 'country_name' 
                      ? (
                        <TableCell
                          key={column.id}
                          style={{ minWidth: column.minWidth }}
                          sortDirection={countryOrder}
                        >
                          <TableSortLabel
                            active={true}
                            key={column.id}
                            direction={countryOrder}
                            onClick={() => setCountryOrder(countryOrder === 'asc' ? 'desc' : 'asc')}
                          >
                            {column.label}
                          </TableSortLabel>
                        </TableCell>
                      )
                      : (
                        <TableCell
                          key={column.id}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      )
                      : (
                        <TableCell
                          key={column.id}
                          align={'center'}
                          style={{ minWidth: column.minWidth }}
                        >
                          <Grid container>
                            <Grid item md={12}>
                              <a>Country Code</a>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item md={6} style={{ textAlign: 'left' }}>
                                  <div>2 Characters</div>
                                </Grid>
                                <Grid item md={6} style={{ textAlign: 'right' }}>
                                  <div>3 Characters</div>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </TableCell>

                      )
                )
              }
            </TableRow>
              }
          </TableHead>
            <TableBody>
              {
                countries
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .sort(getComparator(countryOrder))
                  .map((row) => {
                    return (
                      <TableRow hover  key={Math.random()} role="checkbox" tabIndex={-1} key={row.code}>
                        <TableCell>
                          <img
                            src={row.flags.png}
                            width={24}
                            height={24}
                          />
                        </TableCell>
                        <TableCell>
                          {row.name.official}
                        </TableCell>
                        <TableCell key={'code'}>
                          <Grid container>
                            <Grid item md={6} style={{ textAlign: 'left' }}>
                              <div>{row.cca2}</div>
                            </Grid>
                            <Grid item md={6} style={{ textAlign: 'right' }}>
                              <div>{row.cca3}</div>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          {row.name.common}
                        </TableCell>
                        <TableCell>
                          {row.altSpellings[1] || 'N/A'}
                        </TableCell>
                        <TableCell align={'right'}>
                          {row.idd.root}
                        </TableCell>
                      </TableRow>
                    );
                  })
              }
            </TableBody>
        </Table>
      </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={countries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
