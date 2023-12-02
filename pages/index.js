import * as React from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/layouts/layout';
import DetailModal from '../components/countriesList/detail';
import { getCountriesList } from '../libs/posts.js';
import {
  Paper,
  Button,
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
    minWidth: 180,
  },
  {
    id: 'native_country_name',
    label: 'Native Country Name',
    minWidth: 150,
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
  const [open, setOpen] = React.useState(false);
  const [openIndex, setOpenIndex] = React.useState(null);
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
  const handleClose = () => {
    setOpen(false);
    setOpenIndex(null);
  };

  return (
    <Layout>
      <h1 className={styles.title}>
        Finalizing Catalog Implementation
      </h1>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
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
                          align='left'
                        >
                          <TableSortLabel
                            active={true}
                            key={column.id}
                            direction={countryOrder}
                            onClick={
                              () => setCountryOrder(countryOrder === 'asc' ? 'desc' : 'asc')
                            }
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
          </TableHead>
          <TableBody>
            {
              countries
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(getComparator(countryOrder))
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      key={Math.random()}
                      tabIndex={-1}
                    >
                      <TableCell>
                        <img
                          src={row.flags.png}
                          width={24}
                          height={24}
                        />
                      </TableCell>
                      <TableCell align='left'>
                        <Button
                          onClick={(evt) => { setOpenIndex(index); setOpen(true);}}
                          id={`modal-${index}`}
                        >
                          {row.name.official}
                        </Button>
                        <DetailModal
                          open={open}
                          index={index}
                          openIndex={openIndex}
                          handleClose={handleClose}
                          detail={row}
                        />
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
                }
                )
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
    </Layout>
  );
}
