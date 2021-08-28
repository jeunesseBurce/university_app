import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import LinkIcon from '@material-ui/icons/Link';
import styled from 'styled-components';


const StyledLink = styled.a`
  color: #46bdf5;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }

`;

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '20'
  },
  container: {
    maxHeight: 600,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
    color: '#FFFFFF'
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#2f3b4b',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableSortLabel = styled(TableSortLabel)`
  span {
    color: #FFFFFF;
  }
  > svg {
   color: #FFFFFF !important;
  }
`;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
      return -1;
  } 

  if (b[orderBy] > a[orderBy]) {
      return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

function AdvancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, columns } = props;

  const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
  };

  return (
      <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
                sortDirection={orderBy === column.id ? order : false}
              >
                  <StyledTableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : 'asc'}
                  onClick={createSortHandler(column.id)}
                  >
                  <span> {column.label} </span>
                  {orderBy === column.id ? (
                      <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </span>
                  ) : null}
                  </StyledTableSortLabel>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
  )
}

AdvancedTableHead.propTypes = {
  classes: PropTypes.any,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onRequestSort: PropTypes.func,
  columns: PropTypes.array,
}

const DataTable = ({ columns, rows, orderColumn }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(orderColumn);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <AdvancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                  columns={columns}
              />
          <TableBody>
          {stableSort(rows, getComparator(order, orderBy))
             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
             .map((row) => {

              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    let value = row[column.id];

                    if (column.id === 'websites') {
                        let weblinks = value;
                        let web_pages = [];
                        weblinks?.map((item) => {
                            let link = item;
                            web_pages.push(<StyledLink rel="noopener noreferrer" href={link} target="_blank"> <LinkIcon /> {link} <br /></StyledLink> );
                            value = web_pages;

                            return value;
                        })
                    }

                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

DataTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  orderColumn: PropTypes.string
}

export default DataTable;