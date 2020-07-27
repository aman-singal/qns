import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles , useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from '../sub-components/AppBar'
import TablePagination from '@material-ui/core/TablePagination'
import TableFooter from '@material-ui/core/TableFooter'
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import axios from 'axios'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useHistory } from "react-router-dom";
import {useCookies} from 'react-cookie'
import { useState , useEffect } from 'react';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);




const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function rawData(response){
  const rawData = [...response.data.data]
      const data = rawData.map(item =>{

        let accessTemp = '';

        if(item.accessRed === true){
          accessTemp = 'true'
        }else{
          accessTemp = 'false'
        }

        return(
          {
            email: item.email,
            accessRed: accessTemp
          }
        )
      })

      return data
}

export default function CustomizedTables() {

  let history = useHistory();
  const [isChanging,setChanging] = useState(false)

  useEffect(() => {

    if(cookies.secureID){
      if(cookies.secureID.privilage === 'Admin'){
        axios({
          method: 'post',
          url: 'https://dry-spire-00712.herokuapp.com/api/allusers',
          headers: {}, 
          data: {
            id: cookies.secureID.id,
          }
        })
        .then(res => {
    
          const data = rawData(res)
          setRows([...data])
        })
      }else{
        history.push('/')
      }
    }else{
      history.push('/login')
    }

    
    
    
    
  }, [isChanging])

  const [cookies, setCookie, removeCookie] = useCookies(['secureID']);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const classes = useStyles();
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [isLoading,setLoading] = useState(false)
  const [rows,setRows] = useState([])

  const handleChange = (email) =>{

    setLoading(true)

    axios({
      method: 'post',
      url: 'https://dry-spire-00712.herokuapp.com/api/update',
      headers: {}, 
      data: {
        id: cookies.secureID.id,
        target: email,
      }
    })
    .then(res=>{
      if(res.data.status === 'success'){
        setChanging(prev =>{
          return !prev
        })
        setLoading(false)
      }
    })
  }

  return (
    <>
    <div>
    <AppBar text="Admin Pannel"/>
    </div>
    <div style={{marginTop: '70px' , marginLeft: '50px' ,marginRight: '50px' }}>
      <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Email Address</StyledTableCell>
              <StyledTableCell align="right">AccessRedButton</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.email}>
                <StyledTableCell component="th" scope="row">
                  {row.email}
                </StyledTableCell>
                <StyledTableCell align="right">
        
                  <FormControlLabel
                    control={
                      <Switch
                        checked={row.accessRed === 'true' ? true : false}
                        onChange={() => {handleChange(row.email)}}
                        name="checkedB"
                        color="primary"
                        disabled={isLoading}
                      />
                    }
                  />

                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
    </>
  );
}