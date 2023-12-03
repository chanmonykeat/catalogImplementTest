import * as React from 'react';
import styles from '../styles/Home.module.css';
import PropTypes from 'prop-types';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';
import Layout from '../components/layouts/layout';
import DetailModal from '../components/countriesList/detail';
import {  styled } from '@mui/material/styles';
import { getCountriesList } from '../libs/posts.js';
import SearchIcon from '@mui/icons-material/Search';
import {
  TextField,
  Button,
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
    minWidth: 170,
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
const OuterElementContext = React.createContext({});

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const [countryOrder, setCountryOrder] = React.useState('asc');
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [page, setPage] = React.useState(0);
  const [openIndex, setOpenIndex] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const itemData = [];
  children.forEach((item) => {
    itemData.push(item);
  });

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
  const descendingComparator = (a, b) => {
    if (b[1].officialName < a[1].officialName) {
      return -1;
    }
    if (b[1].officialName > a[1].officialName) {
      return 1;
    }
    return 0;
  }

  const getComparator = (order) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b)
      : (a, b) => -descendingComparator(a, b);
  }
  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
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
                            style={{ minWidth: column.minWidth, backgroundColor: '#ff1584', border: '1px solid white' }}
                            sortDirection={countryOrder}
                            align='left'
                          >
                            <TableSortLabel
                              active={true}
                              style={{ color: 'white' }}
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
                            className={styles.tableHead}
                          >
                            {column.label}
                          </TableCell>
                        )
                        : (
                          <TableCell
                            key={column.id}
                            align={'center'}
                            style={{ minWidth: column.minWidth }}
                            className={styles.tableHead}
                          >
                            <Grid container>
                              <Grid item md={12} style={{ borderBottom: '1px solid white' }}>
                                <a>Country Code</a>
                              </Grid>
                              <Grid item xs={12}>
                                <Grid container>
                                  <Grid
                                    item md={6}
                                    className={styles.subHeadLeft}
                                  >
                                    <div>2 Characters</div>
                                  </Grid>
                                  <Grid
                                    item md={6}
                                    className={styles.subHeadRight}
                                  >
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
                itemData
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
                            src={row[1].flags.png}
                            width={32}
                            height={24}
                          />
                        </TableCell>
                        <TableCell align='left'>
                          <Button
                            onClick={(evt) => { setOpenIndex(index); setOpen(true);}}
                            id={`modal-${index}`}
                          >
                            <span className={styles.ellipsis}>
                              {row[1].name.official}
                            </span>
                          </Button>
                          <DetailModal
                            open={open}
                            index={index}
                            openIndex={openIndex}
                            handleClose={handleClose}
                            detail={row[1]}
                          />
                        </TableCell>
                        <TableCell key={'code'}>
                          <Grid container>
                            <Grid item md={6} style={{ textAlign: 'left' }}>
                              <div>{row[1].cca2}</div>
                            </Grid>
                            <Grid item md={6} style={{ textAlign: 'right' }}>
                              <div>{row[1].cca3}</div>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          {row[1].name.common}
                        </TableCell>
                        <TableCell>
                          {row[1].altSpellings[1] || 'N/A'}
                        </TableCell>
                        <TableCell align={'right'}>
                          {row[1].idd.root || 'N/A'}
                        </TableCell>
                      </TableRow>
                    )
                  })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={children.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

export default function Home({countries}) {
  return (
    <Layout>
      <Autocomplete
        id="virtualize-demo"
        freeSolo
        open
        sx={{ width: '1240px' }}
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        options={countries.sort((a, b) => a.officialName.toUpperCase().localeCompare(b.officialName.toUpperCase()))}
        getOptionLabel={(option) => option.officialName}
        renderInput={(params) => <TextField {...params} label={<span><SearchIcon/>Search country</span>} />}
        renderOption={(props, option, state) => [props, option, state.index]}
      />
    </Layout>
  );


}
