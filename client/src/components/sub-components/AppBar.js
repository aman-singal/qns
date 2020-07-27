import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {useCookies} from 'react-cookie'
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar({text}) {

  let history = useHistory();
  const classes = useStyles();
  const [cookies, removeCookie] = useCookies(['secureID']);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {text}
          </Typography>
          {cookies.secureID ? 
          <>
          <Button color="inherit" onClick={()=>{history.push('/')}}>Home</Button>
          {cookies.secureID.privilage === 'Admin' ? 
          <Button color="inherit" onClick={()=>{history.push('/admin')}}>Change Permission</Button>
          :
          null
          }
          <Button color="inherit" onClick={()=>{history.push('/logout')}}>Logout</Button>
          </>
          :
          <>
          <Button color="inherit" onClick={()=>{history.push('/login')}}>Login</Button>
          <Button color="inherit" onClick={()=>{history.push('/signup')}}>SignUp</Button>
          </>
          }
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
