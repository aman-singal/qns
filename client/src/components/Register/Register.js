import React , {useState} from 'react'
import {Typography , StylesProvider, withStyles , Button , Paper, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, } from 'formik';
import * as Yup from 'yup'
import FormTextField from '../sub-components/TextFieldHelper'
import SelectHelper from '../sub-components/SelectHelper'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import Alert from '../sub-components/Alert'
import AppBar from '../sub-components/AppBar'
import '../Global.css'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginLeft: '20px',
      marginRight: '20px',
    },
    paper: {
      padding: theme.spacing(2),
    //   textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    education:{
        
    },
    types:{
        marginTop: '20px',
        color: 'black',
    }

  }));


const RegisterStyle = withStyles({

    "MuiTypography-body1":{
        marginTop: '80px',
        fontSize: '70px'
    }


})(()=> null)



    const validationSchema = Yup.object().shape({
        email: Yup.string()
        .email("Enter a valid Email address")
        .required("Email address is required"),

        password: Yup.string()
        .min(6, "Password Should be atleast 6 char long")
        .required("Password is required"),

        passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password is not same'),

        privilage: Yup.string()
        .ensure()
        .required("Privilage is required")

    })


function Register() {

    let history = useHistory();
    const classes = useStyles();
    const [isLoading,setLoading] = useState(false) 
    const [error,setError] = useState('')

    return (
        <StylesProvider>
            <RegisterStyle />
            <div>
            <Formik 
            initialValues={{email: '' , password: "" , passwordConfirmation: '' , privilage: ''}}
            validationSchema={validationSchema}
            onSubmit={(values  , {setSubmitting })=> {
                console.log('submit req send')
                // setLoading(true)
                axios({
                    method: 'post',
                    url: 'https://dry-spire-00712.herokuapp.com/api/signup',
                    headers: {}, 
                    data: {
                      email: values.email,
                      password: values.password,
                      privilage: values.privilage,
                    }
                  })
                  .then((res) =>{
                      
                      if(res.data === 'success'){
                        history.push('/login')
                      }
                      else{
                        setError(res.data)
                      }
                  })
                  .catch(err => {
                      console.log('err in the req' , err)
                  })
                  
                  setLoading(false)
                  setSubmitting(false)
                
            }}
            >
                {({ isSubmitting }) => (
                <Form>
                    <AppBar text="Login"/>
                    <div className={classes.root}>
                        <Grid container spacing={5}>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>
                                {error !== '' ? <Alert severity="error" alertText={error} />: null}
                                <Typography style={{fontSize: '30px'}}>SignUp</Typography>
                                <div style={{marginTop: '10px'}}>
                                    <FormTextField name="email" label="Email" placeholder="Email Address" type="email" />
                                </div>
                                <div style={{marginTop: '10px'}}>
                                    <FormTextField name="password" label="Password" placeholder="Password" type="password" />
                                </div>
                                <div style={{marginTop: '10px'}}>
                                    <FormTextField name="passwordConfirmation" label="Confirm Password" placeholder="Confirm Password" type="password" />
                                </div>
                                <div style={{marginTop: '10px'}}>
                                    <SelectHelper name='privilage' label="Select Role"  options={['Admin' , 'Customer']} />     
                                </div>
                                <div style={{marginTop: '20px'}}>
                                    <Button type="submit" disabled={isSubmitting} variant="contained" onClick={()=>{console.log("1")}} color="primary" style={{width: '300px'}}>
                                    {isLoading?  "Loading..." : "SignUp"}
                                    </Button>
                                </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </Form>
            )}
            </Formik>    
            </div>
        </StylesProvider> 
        
    )
}

export default Register