import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlerts({alertText,severity}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert variant="filled" severity={severity}>
        {alertText}
      </Alert>
      
    </div>
  );
}
